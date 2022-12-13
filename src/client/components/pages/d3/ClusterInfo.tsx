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

        const terminatedPods = Math.floor(Number(podLength) % Number(podCount));

        dispatch({ type: 'SET_TERMINATED_PODS', terminatedPods });

        setLoading(false);
      })
      .catch((err) => {
        console.log(
          `❌ An error occurred fetching cluster information: ${err}`
        );
      });
  }, []);
  interface Child {
    name: string;
    children?: Child[];
  }

  // somehow nest PodName into the Namespace into the cluster

  // obj > arr > obj > arr > obj

  const generateData = (
    cluster: any,
    namespace: string[],
    podName: string[][]
  ) => {
    const data: Child = {
      name: 'minikube',
      children: [],
    };

    Object.values(namespace).forEach((namespace, i) => {
      const namespaceData: Child = {
        name: namespace,
        children: [],
      };

      // issue: the podNames are not separated by namespaces

      // pushing namespaceData into the DATA children
      data.children.push(namespaceData);

      Object.values(podName[i]).forEach((podName) => {
        // pushing podName data into the NAMESPACE children
        namespaceData.children.push({ name: podName });
      });
    });

    return data;
  };

  const data = generateData(cluster, namespace, [podName]);

  if (loading) {
    return (
      <div id='loading'>
        <span className='loading-text'>Loading ...</span>
        <div className='wheel-and-hamster'>
          <div className='wheel'></div>
          <div className='hamster'>
            <div className='hamster__body'>
              <div className='hamster__head'>
                <div className='hamster__ear'></div>
                <div className='hamster__eye'></div>
                <div className='hamster__nose'></div>
              </div>
              <div className='hamster__limb hamster__limb--fr'></div>
              <div className='hamster__limb hamster__limb--fl'></div>
              <div className='hamster__limb hamster__limb--br'></div>
              <div className='hamster__limb hamster__limb--bl'></div>
              <div className='hamster__tail'></div>
            </div>
          </div>
          <div className='spoke'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='col'>
      <div className='col-1'>
        <div className='col-1-a'>
          <span className='namespace-list'>
            Namespace:
            <select className='namespace-dropdown'>
              {Object.values(namespace).map((name: string, index: number) => {
                let options = [];
                for (let i = 0; i < name.length; i++) {
                  options.push(<option key={name[i]}>{name[i]}</option>);
                }
                return options;
              })}
            </select>
          </span>
          <br />
          <span className='podName-list'>
            Pod Name:
            <select className='podName-dropdown'>
              {Object.values(podName).map((name: string, index: number) => {
                let options = [];
                for (let i = 0; i < name.length; i++) {
                  options.push(<option key={name[i]}>{name[i]}</option>);
                }
                return options;
              })}
            </select>
          </span>
        </div>
        {/*  */}
        <div className='col-1-b'>
          <p className='key-section'>Key:</p>
          <p>
            Center <span className='pink'>pink</span> circle = Clusters
          </p>
          <p>
            Other <span className='pink'>pink</span> circles = Namespaces
          </p>
          <p>
            External <span className='green'>green</span> circles = Pods
          </p>
        </div>
      </div>
      <div className='col-2'>
        <D3Visuals data={data} />
        <div className='span-inline'>
          <span className='capacity-section'>
            Capacity:
            {Object.values(podCapacity).map((name: string) => {
              return (
                <h6 className='pod-capacity-span' key={name}>
                  {name}
                </h6>
              );
            })}
          </span>
          <span className='podCount-section'>
            Pod Count:
            {Object.values(podCount).map((count: number) => {
              return (
                <h6 className='pod-count-span' key={count}>
                  {count}
                </h6>
              );
            })}
          </span>
          <span className='terminatedPods-section'>
            Terminated Pods:
            {Object.values(terminatedPods).map((name: string) => {
              return (
                <h6 className='terminated-pods-span' key={name}>
                  {name}
                </h6>
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClusterInfo;
