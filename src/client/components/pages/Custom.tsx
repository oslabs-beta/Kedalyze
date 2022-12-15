import React from 'react';
import '../../styles/customStyles.css';

const Custom = () => {
  return (
    <div id='customs'>
      <iframe
        className='prom-custom'
        width='1200'
        height='1150px'
        src={'http://localhost:9090/graph'}
      />
    </div>
  );
};

export default Custom;
