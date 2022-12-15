import React from 'react';

const Nodes = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3010/d/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=5s'
          width='1375'
          height='4100'
        ></iframe>
      </div>
    </div>
  );
};

export default Nodes;
