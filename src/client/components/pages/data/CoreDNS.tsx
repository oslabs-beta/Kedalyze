import React from 'react';

const CoreDNS = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3010/d/k8s_system_coredns/kubernetes-system-coredns?orgId=1&refresh=5s&from=1670957688801&to=1670961288801'
          width='1375'
          height='2500'
        ></iframe>
      </div>
    </div>
  );
};

export default CoreDNS;
