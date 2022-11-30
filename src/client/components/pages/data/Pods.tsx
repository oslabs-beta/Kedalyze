import React, { useState, useEffect } from 'react';

const Pods = () => {
  return (
    <div>
      <h1>Pods</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_pods/kubernetes-views-pods?orgId=1&refresh=10s&from=1669691775341&to=1669695375341'
        width='1200'
        height='1170'
      ></iframe>
    </div>
  );
};

export default Pods;
