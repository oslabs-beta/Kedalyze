import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Namespaces = () => {
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
      <h1>Namespaces</h1>
      <iframe
        className='metric-data'
        src='http://localhost:3001/d/k8s_views_ns/kubernetes-views-namespaces?orgId=1&refresh=5s&from=1669774628152&to=1669778228152'
        width='1200'
        height='1550'
        // 1550
      ></iframe>
    </div>
  );
};

export default Namespaces;