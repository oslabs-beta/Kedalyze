import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import Dashboard from './components/home/Dashboard';
import Register from './components/login/Register';
import '../styles/styles.css';

const App = () => {
  return (
    <div>
      <div className='login-signup'>
        <Login />
        <SignUp />
      </div>
      <Routes>
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/register/*' element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
