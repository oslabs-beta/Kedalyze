import React, { useState, useEffect } from 'react';

const Namespaces = () => {
  return (
    <div>
      <h1>Namespaces</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_ns/kubernetes-views-namespaces?orgId=1&refresh=10s&from=1669691815942&to=1669695415942'
        width='1200'
        height='1500'
      ></iframe>
    </div>
  );
};

export default Namespaces;
