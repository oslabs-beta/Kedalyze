import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Pods = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/k8s_views_pods/kubernetes-views-pods?orgId=1&refresh=5s&var-datasource=Prometheus&var-namespace=default&var-pod=alertmanager-prometheus-kube-prometheus-alertmanager-0&var-resolution=1s&from=1670904866128&to=1670908466128'
          width='1375'
          height='1500'
        ></iframe>
      </div>
    </div>
  );
};

export default Pods;
