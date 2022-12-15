import React from 'react';

const APIServer = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3010/d/k8s_system_apisrv/kubernetes-system-api-server?orgId=1&refresh=5s'
          width='1375'
          height='2000'
        ></iframe>
      </div>
    </div>
  );
};

export default APIServer;
