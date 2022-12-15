import React from 'react';

const Keda = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/1-v6PK54z/keda-metrics?orgId=1&refresh=5s'
          width='1375'
          height='1910'
        ></iframe>
      </div>
    </div>
  );
};

export default Keda;
