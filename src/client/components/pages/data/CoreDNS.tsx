import React, { useState, useEffect } from 'react';

const CoreDNS = () => {
  return (
    <div>
      <h1>CoreDNS</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_system_coredns/kubernetes-system-coredns?orgId=1&refresh=10s&from=1669691844712&to=1669695444712'
        width='1200'
        height='2500'
      ></iframe>
    </div>
  );
};

export default CoreDNS;
