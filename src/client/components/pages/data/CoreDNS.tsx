import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CoreDNS = () => {
  return (
    <div id='metrics'>
      <ul>
        <li>
          <Link to='/dashboard/metrics/global' className='metrics-global'>
            Global
          </Link>
        </li>
        <li>
          <Link to='/dashboard/metrics/apiServer' className='metrics-apiserver'>
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
      <h1>CoreDNS</h1>
      <iframe
        className='metric-data'
        src='http://localhost:3001/d/k8s_system_coredns/kubernetes-system-coredns?orgId=1&refresh=5s&from=1669774592866&to=1669778192866'
        width='1200'
        height='2100'
      ></iframe>
    </div>
  );
};

export default CoreDNS;
