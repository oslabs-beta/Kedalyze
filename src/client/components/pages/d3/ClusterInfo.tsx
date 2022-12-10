import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import D3Visuals from './D3Visuals';
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

        const namespace = cluster.Namespace.filter(
          (name: string, index: number, self: string) =>
            self.indexOf(name) === index
        );

        dispatch({ type: 'SET_NAMESPACE', namespace });

        const podName = cluster.PodName.map(
          (name: string, index: number) => name
        );
        dispatch({ type: 'SET_POD_NAME', podName });

        const podCapacity = cluster.PodCapacity;
        dispatch({ type: 'SET_POD_CAPACITY', podCapacity });

        const podLength = cluster.PodName.length;

        const podCount = parseInt(cluster.PodCount.match(/\d+/g)[0], 10);
        dispatch({ type: 'SET_POD_COUNT', podCount });

        const terminatedPods = Math.floor(Number(podLength) / Number(podCount));
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
      <div className='d3-cluster-visual'>
        <D3Visuals
          cluster={cluster}
          namespace={namespace}
          podName={podName}
          podCapacity={podCapacity}
          podCount={podCount}
          terminatedPods={terminatedPods}
        />
      </div>
      <div className='cluster-info'>
        <span>
          Namespace:
          {Object.values(namespace).map((name: string, index) => {
            return <span key={name}>{name}</span>;
          })}
        </span>
        <br />
        <span>
          Pod Name:
          <span>
            {Object.values(podName).map((name: string) => {
              return <span key={name}>{name}</span>;
            })}
          </span>
        </span>
        <br />
        <span>
          Capacity-
          {Object.values(podCapacity).map((name: string) => {
            return <span key={name}>{name}</span>;
          })}
        </span>
        <br />
        <span>
          Pod Count:
          {Object.values(podCount).map((count: number) => {
            return <span key={count}>{count}</span>;
          })}
        </span>
        <br />
        <span>
          Terminated Pods:
          {Object.values(terminatedPods).map((name: string) => {
            return <span key={name}>{name}</span>;
          })}
        </span>
      </div>
    </div>
  );
};

export default ClusterInfo;
