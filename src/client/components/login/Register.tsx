import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/registerStyles.css';
import eye from '../../styles/pine-eye.jpg';

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signUp = async (event: { preventDefault: () => void }) => {
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

        const alertDiv = document.createElement('div');
        alertDiv.innerHTML = 'User created successfully!';
        alertDiv.classList.add('alert-success');
        document.body.appendChild(alertDiv);

        setTimeout(() => {
          alertDiv.remove();
        }, 2500);

        navigate('/dashboard');
      } else {
        setMessage('This username / email is already in use');
      }
    } catch (err) {
      console.error(`❌ Error in fetching register POST request: ${err}`);
    }
  };

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
    <div className='register'>
      <form onSubmit={signUp} className='signup-form'>
        <div className='con'>
          <h2 className='login-in-text'>Sign Up</h2>
          <label>
            <input
              placeholder='Email'
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
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
          <button onClick={togglePassword} className='pine-button'>
            <img src={eye} className='pine-eye' />
          </button>
          <div className='signup-home-buttons'>
            <button type='submit' onClick={signUp} className='signup-page-btn'>
              Sign Up
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
}

export default Register;
