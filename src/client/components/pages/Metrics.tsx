import React, { useState, useEffect } from 'react';
// import PodByNamespace from '../charts/PodByNamespace';
// import PrometheusChart from '../charts/PrometheusChart';

// thought about making all the stats in a different page so less loading time
// import { Link, Routes, Route } from 'react-router-dom';
// import APIServer from './data/APIServer';
// import CoreDNS from './data/CoreDNS';
// import Global from './data/Global';
// import Namespaces from './data/Namespaces';
// import Nodes from './data/Nodes';
// import Pods from './data/Pods';

const Metrics = () => {
  return (
    <div id='metrics'>
      <h1>Global</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=10s&from=1669692177637&to=1669695777637'
        width='1200'
        height='1890'
      ></iframe>
      <h1>API Server</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_system_apisrv/kubernetes-system-api-server?orgId=1&refresh=10s&from=1669691864085&to=1669695464085'
        width='1200'
        height='1950'
      ></iframe>
      <h1>CoreDNS</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_system_coredns/kubernetes-system-coredns?orgId=1&refresh=10s&from=1669691844712&to=1669695444712'
        width='1200'
        height='2500'
      ></iframe>
      <h1>Namespaces</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_ns/kubernetes-views-namespaces?orgId=1&refresh=10s&from=1669691815942&to=1669695415942'
        width='1200'
        height='1600'
      ></iframe>
      <h1>Nodes</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=10s&from=1669691804088&to=1669695404088'
        width='1200'
        height='4100'
      ></iframe>
      <h1>Pods</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_pods/kubernetes-views-pods?orgId=1&refresh=10s&from=1669691775341&to=1669695375341'
        width='1200'
        height='1170'
      ></iframe>
      {/* <PrometheusChart /> */}
    </div>
  );
};

export default Metrics;

// const Metrics = () => {
//   return (
//     <>
//       <div id='metrics'>
//         <nav>
//           <ul>
//             <li>
//               <Link to='/dashboard/metrics/global'>Global</Link>
//             </li>
//             <li>
//               <Link to='/dashboard/metrics/apiServer'>API Server</Link>
//             </li>
//             <li>
//               <Link to='/dashboard/metrics/coreDNS'>Core DNS</Link>
//             </li>
//             <li>
//               <Link to='/dashboard/metrics/namespaces'>Namespaces</Link>
//             </li>
//             <li>
//               <Link to='/dashboard/metrics/nodes'>Nodes</Link>
//             </li>
//             <li>
//               <Link to='/dashboard/metrics/pods'>Pods</Link>
//             </li>
//           </ul>
//         </nav>
//         <div>
//           <Routes>
//             <Route path='/global' element={<Global />} />
//             <Route path='/apiServer' element={<APIServer />} />
//             <Route path='/coreDNS' element={<CoreDNS />} />
//             <Route path='/namespaces' element={<Namespaces />} />
//             <Route path='/nodes' element={<Nodes />} />
//             <Route path='/pods' element={<Pods />} />
//           </Routes>
//         </div>
//         <PrometheusChart />
//       </div>
//     </>
//   );
// };
