import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/clusterStyles.css';

const ClusterInfo = () => {
  const [cluster, setCluster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [namespace, setNamespace] = useState();
  const [podName, setPodName] = useState();
  const [podCapacity, setPodCapacity] = useState();
  const [podCount, setPodCount] = useState();
  const [terminatedPods, setTerminatedPods] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/api/cluster')
      .then((res) => res.json())
      .then((cluster) => {
        setCluster(cluster);

        const namespace = cluster.Namespace.filter(
          (name, index, self) => self.indexOf(name) === index
        ).map((name, index) => <li key={index}>{name}</li>);
        setNamespace(namespace);

        const podName = cluster.PodName.map((name, index) => (
          <li key={index}>{name}</li>
        ));
        setPodName(podName);

        const podCapacity = cluster.PodCapacity;
        setPodCapacity(podCapacity);

        const podLength = cluster.PodName.length;

        const podCount = parseInt(cluster.PodCount.match(/\d+/g)[0], 10);
        setPodCount(podCount);

        const terminatedPods = Math.floor(Number(podLength) / Number(podCount));
        setTerminatedPods(terminatedPods);

        setLoading(false);
      })
      .catch((err) => {
        console.log(`An error occurred fetching cluster information: ${err}`);
      });
  }, []);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div>
      <div className='cluster-info'>
        <span> Namespace: {namespace}</span>
        <br />
        <span>Pod Name: {podName}</span>
        <br />
        <span>Capacity-{podCapacity}</span>
        <br />
        <span>Pod Count: {podCount}</span>
        <br />
        <span>Terminated Pods: {terminatedPods}</span>
      </div>
    </div>
  );
};

export default ClusterInfo;
