import React, { useState, useEffect } from 'react';
import PodByNamespace from '../charts/PodByNamespace';
import PrometheusChart from '../charts/PrometheusChart';

const Metrics = () => {
  return (
    <div id='metrics'>
      <h1>This is Metrics page</h1>
      <PrometheusChart />
    </div>
  );
};

export default Metrics;
