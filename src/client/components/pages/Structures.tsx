import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClusterInfo from './d3/ClusterInfo.jsx';

const Structures = () => {
  return (
    <div id='structures'>
      <ClusterInfo />
    </div>
  );
};

export default Structures;
