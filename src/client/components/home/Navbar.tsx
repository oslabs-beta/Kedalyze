import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Structure from '../pages/Structures';
import Metrics from '../pages/Metrics';
import Custom from '../pages/Custom';
import Alerts from '../pages/Alerts';

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

const Navbar = () => {
  return (
    <>
      <h1 className='title'>KEDAlyze</h1>
      <GoBack />
      <div className='nav-dashboard'>
        <div className='column1'>
          <nav className='nav-bar'>
            <ul>
              <li>
                <Link to='/dashboard/structures' className='structure'>
                  Structure
                </Link>
              </li>
              <li>
                <Link to='/dashboard/metrics' className='metric'>
                  Metrics
                </Link>
              </li>
              <li>
                <Link to='/dashboard/customs' className='custom'>
                  Custom
                </Link>
              </li>
              <li>
                <Link to='/dashboard/alerts' className='alert'>
                  Alerts
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='column2'>
          <Routes>
            <Route path='/structures' element={<Structure />} />
            <Route path='/metrics' element={<Metrics />} />
            <Route path='/customs' element={<Custom />} />
            <Route path='/alerts' element={<Alerts />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navbar;
