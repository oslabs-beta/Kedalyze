import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import normalizeType from 'normalize-type';
import '../../../styles/clusterStyles.css';

interface ClusterState {
  cluster: any;
  namespace: string[];
  podName: string[];
  podCapacity: number;
  podCount: number;
  terminatedPods: number;
}

const ClusterInfo = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cluster = useSelector((state: ClusterState) => state.cluster);
  const namespace = useSelector((state: ClusterState) => state.namespace);
  const podName = useSelector((state: ClusterState) => state.podName);
  const podCapacity = useSelector((state: ClusterState) => state.podCapacity);
  const podCount = useSelector((state: ClusterState) => state.podCount);
  const terminatedPods = useSelector(
    (state: ClusterState) => state.terminatedPods
  );

  useEffect(() => {
    fetch('http://localhost:3000/api/cluster')
      .then((res) => res.json())
      .then((cluster) => {
        dispatch({ type: 'SET_CLUSTER', cluster });

        // Store the names of the namespaces in the Redux store
        const namespace = cluster.Namespace.filter(
          (name: string, index: number, self: string) =>
            self.indexOf(name) === index
        );
        console.log('this is namespace', namespace);
        dispatch({ type: 'SET_NAMESPACE', namespace });

        // Store the names of the pods in the Redux store
        const podName = cluster.PodName.map(
          (name: string, index: number) => name
        );
        console.log('this is podName', podName);
        dispatch({ type: 'SET_POD_NAME', podName });

        // Store the capacity of the pods in the Redux store
        const podCapacity = cluster.PodCapacity;
        // console.log('this is podCapacity', podCapacity);
        dispatch({ type: 'SET_POD_CAPACITY', podCapacity });

        // Store the count of the pods in the Redux store
        const podLength = cluster.PodName.length;
        const podCount = parseInt(cluster.PodCount.match(/\d+/g)[0], 10);
        console.log('this is podLength', podLength);
        console.log('this is podCount', podCount);
        dispatch;

        const terminatedPods = Math.floor(Number(podLength) / Number(podCount));
        console.log('this is terminatedPods', terminatedPods);
        dispatch({ type: 'SET_TERMINATED_PODS', terminatedPods });

        setLoading(false);
      })
      .catch((err) => {
        console.log(
          `❌ An error occurred fetching cluster information: ${err}`
        );
      });
  }, []);
  if (loading) {
    return <div className='loading'>Loading your pods...</div>;
  }

  return (
    <div>
      <div className='cluster-info'>
        {/* <span> Namespace: {namespace}</span> */}
        <br />
        {/* <span>Pod Name: {podName}</span>
        <br /> */}
        {/* <span>Capacity-{podCapacity}</span>
        <br />
        <span>Pod Count: {podCount}</span>
        <br />
        <span>Terminated Pods: {terminatedPods}</span> */}
      </div>
    </div>
  );
};

export default ClusterInfo;
