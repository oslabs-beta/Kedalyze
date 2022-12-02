import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../../../styles/registerStyles.css';
import eye from '../../../styles/pine-eye.jpg';
import { useForm } from '../interfaces/customHooks';
import { SlowBuffer } from 'buffer';

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { onChange, handleSubmit, values } = useForm(signUpUserCallback);

  // a submit function that will execute upon form submission
  function signUpUserCallback() {
    // console.log(values);

    useEffect(() => {
      const createUser = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      };
      fetch('/register', createUser)
        .then((response) => response.json())
        .then((values) => {
          setEmail('');
          setUsername('');
          setPassword('');
          console.log(values);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }, []);
  }

  // go home
  const navigate = useNavigate();
  const goHome = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  // toggle password visibility
  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='register'>
      <form onSubmit={handleSubmit} className='signup-form'>
        <label>
          Email:
          <input type='text' name='email' onChange={onChange} />
        </label>
        <label>
          Username:
          <input type='text' name='username' onChange={onChange} />
        </label>
        <div className='pine'>
          <label>
            Password:
            <input
              type={passwordShown ? 'text' : 'password'}
              onChange={onChange}
            />
          </label>
        </div>
        <button onClick={togglePassword} className='pine-button'>
          <img src={eye} className='pine-eye' />
        </button>
        <div className='signup-home-buttons'>
          <button
            onClick={signUpUserCallback}
            type='submit'
            className='signup-page-btn'
          >
            Sign Up
          </button>
          <button type='submit' onClick={goHome} className='go-back-again-btn'>
            Home
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
