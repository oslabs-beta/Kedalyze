import React from 'react';

const Keda = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/krKM6I54k/keda-dashboard?orgId=1&refresh=5s'
          width='1375'
          height='1910'
        ></iframe>
      </div>
    </div>
  );
};

export default Keda;
