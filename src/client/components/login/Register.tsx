import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../../../styles/registerStyles.css';
import eye from '../../../styles/pine-eye.jpg';
import axios from 'axios';
import { UserList } from '../interfaces/interface';

function GoBack() {
  // register
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState<UserList>();
  const [username, setUsername] = useState<UserList>();
  const [password, setPassword] = useState<UserList>();

  // gives me a TS error
  // useEffect(() => {
  //   axios
  //     .get<UserList>('/register')
  //     .then((response) => {
  //       setEmail(response.data);
  //       setUsername(response.data);
  //       setPassword(response.data);
  //       console.log('you have signed up!');
  //     }, [])
  //     .catch(() => {
  //       console.log('sign up failed');
  //     });
  // });

  async function getUsers() {
    try {
      const { data, status } = await axios.get<UserList>('/register', {
        headers: {
          Accept: 'application/json',
        },
      });

      console.log(JSON.stringify(data));
      console.log('response status is: ', status);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  // go home navigation
  // click on sign up - store the user in the database
  const navigate = useNavigate();
  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className='register-page'>
      <div className='form-align'>
        <form className='signup-form'>
          <label>
            Email:
            <input type='text' name='email' />
          </label>
          <label>
            Username:
            <input type='text' name='username' />
          </label>
          <div className='pine'>
            <label>
              Password:
              <input type={passwordShown ? 'text' : 'password'} />
            </label>
          </div>
          <button onClick={togglePassword} className='pine-button'>
            <img src={eye} className='pine-eye' />
          </button>
        </form>
      </div>
      <div className='signup-home-buttons'>
        <button type='submit' onClick={onSubmit} className='signup-page-btn'>
          Sign Up
        </button>
        <button type='submit' onClick={onSubmit} className='go-back-again-btn'>
          Home
        </button>
      </div>
    </div>
  );
}

const Register = () => {
  return (
    <div className='register'>
      <Routes>
        <Route path='/' element={<GoBack />} />
      </Routes>
    </div>
  );
};

export default Register;
