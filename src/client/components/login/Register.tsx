import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../../../styles/registerStyles.css';

function GoBack() {
  const navigate = useNavigate();

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <button type='submit' onClick={onSubmit} className='goback-btn'>
      Go Back
    </button>
  );
}

const Register = () => {
  return (
    <div className='register'>
      <h1>Register</h1>
      <Routes>
        <Route path='/' element={<GoBack />} />
      </Routes>
    </div>
  );
};

export default Register;
