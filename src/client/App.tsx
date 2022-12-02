import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/login/Register';
import Dashboard from './components/home/Dashboard';
import '../styles/styles.css';
import Start from './components/home/Start';
import LoginPage from './components/login/LoginPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login/*' element={<LoginPage />} />
        <Route path='/register/*' element={<Register />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
