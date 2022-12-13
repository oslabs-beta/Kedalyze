import React from 'react';

const CoreDNS = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/k8s_system_coredns/kubernetes-system-coredns?orgId=1&refresh=5s&var-datasource=Prometheus&var-instance=All&var-protocol=udp&var-resolution=1s&from=1670904775274&to=1670908375274'
          width='1375'
          height='2500'
        ></iframe>
      </div>
    </div>
  );
};

export default CoreDNS;
