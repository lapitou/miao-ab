import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { logIn } from "../../api/ApiUser.js";
import { useNavigate } from 'react-router-dom';

import Buttons from '../../components/buttons/Buttons.jsx';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector(state => state.user)

  useEffect(() => {
    if (status === true) {
      navigate(`/Profile/`)
    } 
  })
  const handleLogin = () => {
    setTimeout(() => {
      setErrorMessage(true);
    }, 500);
  };
  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon' />
        <h1 className='sign-in-title'>Sign In</h1>
        <form>
          <div className='input-wrapper'>
            <label htmlFor='email'>Username</label>
            <input
              id='email'
              type='email'
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
            />
             {errorMessage && <div>Identifiants invalides, Veuillez réessayer.</div>}
          </div>
          <div className='input-remember'>
            <label htmlFor='remember-me'>Remember me</label>
            <input id='remember-me' type='checkbox' />
          </div>
        </form>
        <Buttons
          className='sign-in-button'
          type='onClick'
          buttonName='Sign In'
          onClick={(e) => {
            e.preventDefault();
            dispatch(logIn({ email: email, password: password }));
            handleLogin();
          }}
        />
      </section>
    </main>
  )
}
export default Login;

