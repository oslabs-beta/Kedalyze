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
        src='http://localhost:3001/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=5s&from=1669774608237&to=1669778208237'
        width='1200'
        height='1910'
      ></iframe>
      <h1>API Server</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_system_apisrv/kubernetes-system-api-server?orgId=1&refresh=5s&from=1669774540572&to=1669778140572'
        width='1200'
        height='1910'
      ></iframe>
      <h1>CoreDNS</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_system_coredns/kubernetes-system-coredns?orgId=1&refresh=5s&from=1669774592866&to=1669778192866'
        width='1200'
        height='2100'
      ></iframe>
      <h1>Namespaces</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_ns/kubernetes-views-namespaces?orgId=1&refresh=5s&from=1669774628152&to=1669778228152'
        width='1200'
        height='1550'
        // 1550
      ></iframe>
      <h1>Nodes</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=5s&from=1669774689053&to=1669778289053'
        width='1200'
        height='4070'
      ></iframe>
      <h1>Pods</h1>
      <iframe
        className='metric-nodes'
        src='http://localhost:3001/d/k8s_views_pods/kubernetes-views-pods?orgId=1&refresh=5s&from=1669774705781&to=1669778305781'
        width='1200'
        height='1500'
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
