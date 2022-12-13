import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nodes = () => {
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
          <Link to='/dashboard/metrics/Keda' className='metrics-keda'>
            KEDA
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
        <li>
          <Link to='/dashboard/metrics/coreDNS' className='metrics-coredns'>
            Core DNS
          </Link>
        </li>
      </ul>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=5s&var-job=node-exporter&var-datasource=Prometheus&var-resolution=1s&var-node=minikube&var-instance=192.168.49.2%3A9100&from=1670904845231&to=1670908445231'
          width='1200'
          height='4070'
        ></iframe>
      </div>
    </div>
  );
};

export default Nodes;
