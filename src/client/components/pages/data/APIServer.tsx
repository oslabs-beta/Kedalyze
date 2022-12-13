import React from 'react';

const APIServer = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3010/d/k8s_system_apisrv/kubernetes-system-api-server?orgId=1&refresh=5s&from=1670957630646&to=1670961230646'
          width='1375'
          height='2000'
        ></iframe>
      </div>
    </div>
  );
};

export default APIServer;
