import React from 'react';

const Nodes = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3010/d/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=5s&from=1670957731819&to=1670961331819'
          width='1375'
          height='4070'
        ></iframe>
      </div>
    </div>
  );
};

export default Nodes;
