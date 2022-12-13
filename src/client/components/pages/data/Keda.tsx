import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Keda = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='keda metric data in here'
          width='1375'
          height='1910'
        ></iframe>
      </div>
    </div>
  );
};

export default Keda;
