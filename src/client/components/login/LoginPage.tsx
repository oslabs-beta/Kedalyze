import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useForm } from '../interfaces/customHooks';
import '../../../styles/loginStyles.css';
import eye from '../../../styles/pine-eye.jpg';

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { onChange, handleSubmit, values } = useForm(loginUserCallback);

  // a submit function that will execute upon form submission
  function loginUserCallback() {
    // console.log(values);

    useEffect(() => {
      const createUser = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };
      fetch('/register', createUser)
        .then((response) => response.json())
        .then((values) => {
          setUsername('');
          setPassword('');
          console.log(values);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }, []);
  }

  const navigate = useNavigate();

  const goHome = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit} className='login-form'>
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
        <div className='login-home-buttons'>
          <button onClick={togglePassword} className='pine-button'>
            <img src={eye} className='pine-eye' />
          </button>
          <button
            onClick={loginUserCallback}
            type='submit'
            className='login-page-btn'
          >
            Login
          </button>
          <button type='submit' onClick={goHome} className='go-back-again-btn'>
            Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
