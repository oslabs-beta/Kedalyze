import React from 'react';

const APIServer = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/k8s_system_apisrv/kubernetes-system-api-server?orgId=1&refresh=5s&var-datasource=Prometheus&var-resolution=1s&from=1670904739576&to=1670908339576'
          width='1375'
          height='1910'
        ></iframe>
      </div>
    </div>
  );
};

export default APIServer;
