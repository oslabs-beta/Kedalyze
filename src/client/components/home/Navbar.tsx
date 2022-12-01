import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Structure from '../pages/Structures';
import Metrics from '../pages/Metrics';
import Custom from '../pages/Custom';
import Alerts from '../pages/Alerts';

import APIServer from '../pages/data/APIServer';
import CoreDNS from '../pages/data/CoreDNS';
import Global from '../pages/data/Global';
import Namespaces from '../pages/data/Namespaces';
import Nodes from '../pages/data/Nodes';
import Pods from '../pages/data/Pods';

function GoBack() {
  const navigate = useNavigate();

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <button type='submit' onClick={onSubmit} className='goback-btn'>
      Home
    </button>
  );
}

const Navbar = () => {
  return (
    <>
      <div>
        <div className='gears' id='two-gears'>
          <div className='gears-container'>
            <div className='gear-rotate'></div>
            <div className='gear-rotate-left'></div>
          </div>
        </div>
        <h1 className='title'>KEDAlyze</h1>

        <GoBack />
      </div>
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
            {/* this is the navbar routes */}
            <Route path='/structures' element={<Structure />} />
            <Route path='/metrics' element={<Metrics />} />

            {/* this is the nested metrics routes */}
            <Route path='/metrics/global' element={<Global />} />
            <Route path='/metrics/apiServer' element={<APIServer />} />
            <Route path='/metrics/coreDNS' element={<CoreDNS />} />
            <Route path='/metrics/namespaces' element={<Namespaces />} />
            <Route path='/metrics/nodes' element={<Nodes />} />
            <Route path='/metrics/pods' element={<Pods />} />

            {/* this is the navbar routes */}
            <Route path='/customs' element={<Custom />} />
            <Route path='/alerts' element={<Alerts />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navbar;
