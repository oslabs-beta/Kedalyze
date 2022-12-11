import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/registerStyles.css';
import eye from '../../styles/pine-eye.jpg';

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const goLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  let handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setEmail('');
        setUsername('');
        setPassword('');
        setMessage('User created successfully!');
      } else {
        setMessage('This username / email is already in use');
      }
    } catch (err) {
      console.log(`❌ Error in fetching register POST request: ${err}`);
    }
  };

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
          <input
            type='text'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type='text'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <div className='pine'>
          <label>
            Password:
            <input
              type={passwordShown ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button onClick={togglePassword} className='pine-button'>
          <img src={eye} className='pine-eye' />
        </button>
        <div className='signup-home-buttons'>
          <button type='submit' onClick={goLogin} className='signup-page-btn'>
            Sign Up
          </button>
          <button type='submit' onClick={goHome} className='go-back-again-btn'>
            Home
          </button>
          <div className='message'>{message ? <p>{message}</p> : null}</div>
        </div>
      </form>
    </div>
  );
}

export default Register;
