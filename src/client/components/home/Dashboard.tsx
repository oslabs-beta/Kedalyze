import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import PodByNamespace from '../charts/PodByNamespace';

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

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <Navbar />
      <Routes>
        <Route path='/' element={<GoBack />} />
      </Routes>
      <PodByNamespace />
    </div>
  );
};

export default Dashboard;
