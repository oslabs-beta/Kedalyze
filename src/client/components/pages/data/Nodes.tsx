import React, { useState, useEffect } from 'react';

const Nodes = () => {
  return (
    <div>
      <h1>Nodes</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=10s&from=1669691804088&to=1669695404088'
        width='1200'
        height='4100'
      ></iframe>
    </div>
  );
};

export default Nodes;
