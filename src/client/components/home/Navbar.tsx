import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Structure from '../pages/Structures';
import Metrics from '../pages/Metrics';
import Custom from '../pages/Custom';
import Alerts from '../pages/Alerts';

import Global from '../../../../data/Global';
import APIServer from '../../../../data/APIServer';
import Keda from '../../../../data/Keda';
import Namespaces from '../../../../data/Namespaces';
import Nodes from '../../../../data/Nodes';
import Pods from '../../../../data/Pods';
import CoreDNS from '../../../../data/CoreDNS';

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
            <Route path='/structures' element={<Structure />} />

            <Route path='/metrics' element={<Metrics />} />
            <Route path='/metrics/global' element={<Global />} />
            <Route path='/metrics/apiServer' element={<APIServer />} />
            <Route path='/metrics/keda' element={<Keda />} />
            <Route path='/metrics/namespaces' element={<Namespaces />} />
            <Route path='/metrics/nodes' element={<Nodes />} />
            <Route path='/metrics/pods' element={<Pods />} />
            <Route path='/metrics/coreDNS' element={<CoreDNS />} />

            <Route path='/customs' element={<Custom />} />
            <Route path='/alerts' element={<Alerts />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navbar;
