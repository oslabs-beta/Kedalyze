import React, { useState, useEffect } from 'react';

const APIServer = () => {
  return (
    <div>
      <h1>API Server</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_system_apisrv/kubernetes-system-api-server?orgId=1&refresh=10s&from=1669691864085&to=1669695464085'
        width='1200'
        height='1950'
      ></iframe>
    </div>
  );
};

export default APIServer;
