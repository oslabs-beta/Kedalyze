import React from 'react';

const Global = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3010/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=5s&from=1670957704455&to=1670961304455'
          width='1375'
          height='1910'
        ></iframe>
      </div>
    </div>
  );
};

export default Global;
