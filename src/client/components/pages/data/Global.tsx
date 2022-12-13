import React from 'react';

const Global = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=5s&var-datasource=Prometheus&var-resolution=1s&from=1670904802607&to=1670908402607'
          width='1375'
          height='1910'
        ></iframe>
      </div>
    </div>
  );
};

export default Global;
