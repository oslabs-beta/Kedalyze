import React from 'react';

const Nodes = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=5s&var-job=node-exporter&var-datasource=Prometheus&var-resolution=1s&var-node=minikube&var-instance=192.168.49.2%3A9100&from=1670904845231&to=1670908445231'
          width='1375'
          height='4070'
        ></iframe>
      </div>
    </div>
  );
};

export default Nodes;
