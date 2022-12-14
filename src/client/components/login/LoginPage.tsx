import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/loginStyles.css';
import eye from '../../styles/pine-eye.jpg';

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const goLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setUsername('');
        setPassword('');
        alert('Login successful');
        navigate('/dashboard');
      } else {
        setMessage('Login credentials are invalid');
      }
    } catch (err) {
      console.log(`❌ Error in fetching register POST request: ${err}`);
    }
  };

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
      <form onSubmit={goLogin} className='login-form'>
        <div className='con'>
          <h2 className='login-in-text'>Log In</h2>
          <label>
            <input
              placeholder='Username'
              type='text'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <div className='pine'>
            <label>
              <input
                placeholder='Password'
                type={passwordShown ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className='login-home-buttons'>
            <button onClick={togglePassword} className='pine-button'>
              <img src={eye} className='pine-eye' />
            </button>
            <button onClick={goLogin} type='submit' className='login-page-btn'>
              Login
            </button>
            <button
              type='submit'
              onClick={goHome}
              className='go-back-again-btn'
            >
              Home
            </button>
            <div className='message'>{message ? <p>{message}</p> : null}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
