import React, { useState, useEffect } from 'react';
import PodByNamespace from '../charts/PodByNamespace';
import PrometheusChart from '../charts/PrometheusChart';

const Metrics = () => {
  return (
    <div id='metrics'>
      <h1>This is Metrics page</h1>
      <iframe
        src='http://localhost:3001/d/3TobXCd4k/kedalyze?orgId=1&from=1669482867779&to=1669504467779&viewPanel=2'
        width='1000'
        height='600'
      ></iframe>
      <PrometheusChart />
    </div>
  );
};

export default Metrics;
