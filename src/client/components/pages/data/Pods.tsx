import React from 'react';

const Pods = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3010/d/k8s_views_pods/kubernetes-views-pods?orgId=1&refresh=5s'
          width='1375'
          height='1550'
        ></iframe>
      </div>
    </div>
  );
};

export default Pods;
