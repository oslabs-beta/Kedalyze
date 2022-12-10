import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClusterInfo from './d3/ClusterInfo.jsx';
import D3Visual from './d3/D3Visuals.jsx';

const Structures = () => {
  return (
    <div id='structures'>
      <D3Visual />
      <ClusterInfo />
    </div>
  );
};

export default Structures;
