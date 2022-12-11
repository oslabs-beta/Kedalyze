import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/loginStyles.css';
import eye from '../../styles/pine-eye.jpg';

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  let handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      if (res.status !== 200) {
        setUsername('');
        setPassword('');
        setMessage('Wrong username/password, Please try again');
        navigate('/login');
        return;
      } else {
        setMessage('Successful login!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(`❌ Error in fetching login POST requesting: ${err}`);
    }
  };

  const goLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/dashboard');
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
      <form onSubmit={handleSubmit} className='login-form'>
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
        <div className='login-home-buttons'>
          <button onClick={togglePassword} className='pine-button'>
            <img src={eye} className='pine-eye' />
          </button>
          <button onClick={goLogin} type='submit' className='login-page-btn'>
            Login
          </button>
          <button type='submit' onClick={goHome} className='go-back-again-btn'>
            Home
          </button>
          <div className='message'>{message ? <p>{message}</p> : null}</div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
