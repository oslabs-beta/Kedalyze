import React, { useState, useEffect } from 'react';

const Global = () => {
  return (
    <div>
      <h1>Global</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=10s&from=1669692177637&to=1669695777637'
        width='1200'
        height='1890'
      ></iframe>
    </div>
  );
};

export default Global;
