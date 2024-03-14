import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { userLogIn } from "../../api/ApiUser.js";
import { useNavigate } from 'react-router-dom';

import Buttons from '../../components/buttons/Buttons.jsx';
import './login.css';

function Login (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector(state => state.user)

  useEffect(() => {
    if (status === true) {
      navigate(`/Profile/`)
    }
  })



  return(
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
             {status === "error" && (
        <div className="errorMessage" id="errorText">
          {error}
        </div>
      )} 
          </div>
          <div className='input-remember'>
            <label htmlFor='remember-me'>Remember me</label>
            <input id='remember-me' type='checkbox'/>
          </div>     
        </form>
        <Buttons 
        className='sign-in-button' 
        type='onClick' 
        buttonName='Sign In'
        onClick={(e) => {
          e.preventDefault();
          dispatch(userLogIn({ email: email, password: password }));
        }}
        />
      </section>
    </main>
  )
}
export default Login;

