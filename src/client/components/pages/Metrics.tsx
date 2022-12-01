import React, { useState, useEffect } from 'react';
import '../../../styles/dashStyles.css';
// import PodByNamespace from '../charts/PodByNamespace';
// import PrometheusChart from '../charts/PrometheusChart';

import { Link } from 'react-router-dom';

const Metrics = () => {
  return (
    <>
      <div id='metrics'>
        <ul>
          <li>
            <Link to='/dashboard/metrics/global' className='metrics-global'>
              Global
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard/metrics/apiServer'
              className='metrics-apiserver'
            >
              API Server
            </Link>
          </li>
          <li>
            <Link to='/dashboard/metrics/coreDNS' className='metrics-coredns'>
              Core DNS
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard/metrics/namespaces'
              className='metrics-namespaces'
            >
              Namespaces
            </Link>
          </li>
          <li>
            <Link to='/dashboard/metrics/nodes' className='metrics-nodes'>
              Nodes
            </Link>
          </li>
          <li>
            <Link to='/dashboard/metrics/pods' className='metrics-pods'>
              Pods
            </Link>
          </li>
        </ul>
        {/* <PrometheusChart /> */}
      </div>
    </>
  );
};

export default Metrics;
