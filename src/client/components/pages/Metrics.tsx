import React, { useState, useEffect } from 'react';
import PodByNamespace from '../charts/PodByNamespace';

const Metrics = () => {
  return (
    <div id='metrics'>
      <h1>This is Metrics page</h1>
      <PodByNamespace />
    </div>
  );
};

export default Metrics;
