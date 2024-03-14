import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/argentBankLogo.webp'
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logOut } from "../../feature/user.slice"

function Header() {

  const dispatch = useDispatch()
  const { userName, token } = useSelector(state => state.user.user)
  const navigate = useNavigate()

  const handleSignOut = (e) => {
    e.preventDefault()
    dispatch(logOut());
    navigate('/')
  };

  return (
    <header>
      <nav className='main-nav'>
        <NavLink to='/' className='main-nav-logo'>
          <h1 className='sr-only'>Argent Bank</h1>
          <img src={logo} alt='logo of Argent Bank' className='main-nav-logo-image' />
        </NavLink>
        {!token && (
          <div>
            <NavLink to='/login' className='main-nav-item'>
              <i className='fa-solid fa-circle-user' />
              <p>Sign In</p>
            </NavLink>
          </div>
        )}
        {token && (
          <div>
            <NavLink to='/profile/' className='main-nav-item'>
              <i className="fa fa-user-circle"></i>
              <span className="userNameCircle">{userName}</span>
            </NavLink>
            <NavLink className="main-nav-item"
              onClick={handleSignOut} >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  )
}
export default Header;