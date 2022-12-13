import React from 'react';

const Keda = () => {
  return (
    <div id='metrics'>
      <div className='frame-cut'>
        <iframe
          className='metric-data'
          src='http://localhost:3001/d/krKM6I54k/keda-dashboard?orgId=1&refresh=5s&from=1670962954459&to=1670963254459'
          width='1375'
          height='1910'
        ></iframe>
      </div>
    </div>
  );
};

export default Keda;
