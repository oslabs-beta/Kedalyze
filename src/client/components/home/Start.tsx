import React, { useState, useEffect } from 'react';
import '../../../styles/styles.css';
import background from '../../../styles/logo1.jpg';
import SignUp from '../login/SignUp';
import Login from '../login/Login';

const Start = () => {
  return (
    <div className='start'>
      <div
        className='background-image'
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className='login-signup'>
        <Login />
        <SignUp />
      </div>
    </div>
  );
};

export default Start;
