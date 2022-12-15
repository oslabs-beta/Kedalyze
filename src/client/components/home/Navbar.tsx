import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Structure from '../pages/Structures';
import Metrics from '../pages/Metrics';
import Custom from '../pages/Custom';

import Global from '../pages/data/Global';
import APIServer from '../pages/data/APIServer';
import Keda from '../pages/data/Keda';
import Namespaces from '../pages/data/Namespaces';
import Nodes from '../pages/data/Nodes';
import Pods from '../pages/data/Pods';
import CoreDNS from '../pages/data/CoreDNS';

function GoBack() {
  const navigate = useNavigate();

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <button type='submit' onClick={onSubmit} className='goback-btn'>
      Log Out
    </button>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <li>
              <Link to='/dashboard/structures' className='structure'>
                Structure
              </Link>
            </li>
            <div className='dropdown'>
              <button className='nav-bar' onClick={() => setIsOpen(!isOpen)}>
                <Link to='/dashboard/metrics' className='metric'>
                  Metrics
                </Link>
              </button>
              {isOpen && (
                <ul
                  className='metrics-dropdown'
                  onClick={() => setIsOpen(false)}
                >
                  <li id='list'>
                    <Link
                      to='/dashboard/metrics/global'
                      className='metrics-global'
                    >
                      Global
                    </Link>
                  </li>
                  <li id='list'>
                    <Link
                      to='/dashboard/metrics/apiServer'
                      className='metrics-apiserver'
                    >
                      API Server
                    </Link>
                  </li>
                  <li id='list'>
                    <Link to='/dashboard/metrics/Keda' className='metrics-keda'>
                      KEDA
                    </Link>
                  </li>
                  <li id='list'>
                    <Link
                      to='/dashboard/metrics/namespaces'
                      className='metrics-namespaces'
                    >
                      Namespaces
                    </Link>
                  </li>
                  <li id='list'>
                    <Link
                      to='/dashboard/metrics/nodes'
                      className='metrics-nodes'
                    >
                      Nodes
                    </Link>
                  </li>
                  <li id='list'>
                    <Link to='/dashboard/metrics/pods' className='metrics-pods'>
                      Pods
                    </Link>
                  </li>
                  <li id='list'>
                    <Link
                      to='/dashboard/metrics/coreDNS'
                      className='metrics-coredns'
                    >
                      Core DNS
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <li>
              <Link to='/dashboard/customs' className='custom'>
                Custom
              </Link>
            </li>
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
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navbar;
