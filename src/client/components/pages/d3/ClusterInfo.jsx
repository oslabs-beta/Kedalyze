import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { hierarchy } from 'd3-hierarchy';
import { forceLink, forceManyBody } from 'd3-force';
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

  const svgRef = useRef(null);

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
        setPodCount((prevState) => podCount);

        const terminatedPods = Math.floor(Number(podLength) / Number(podCount));
        setTerminatedPods(terminatedPods);

        setLoading(false);
      })
      .catch((err) => {
        console.log(`An error occurred fetching cluster information: ${err}`);
      });
  }, []);

  useEffect(() => {
    if (!cluster || loading || error) {
      return;
    }

    // this getting data from current cluster pods
    const data = cluster.PodName.map((name, index) => ({
      id: name,
      index,
    }));
    // console.log(data);

    // Create a hierarchy object from the data
    const root = d3.hierarchy(data);

    // Use the .links() method to create link data
    const links = root.links();

    const nodes = root.descendants();

    // Create a simulation
    const simulation = d3
      .forceSimulation(nodes)
      // Add a force to the simulation
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1)
      )
      // Add another force to the simulation
      .force('charge', d3.forceManyBody().strength(-50))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    // simulation.on('tick', () => {
    //   link
    //     .attr('x1', (d) => d.source.x)
    //     .attr('y1', (d) => d.source.y)
    //     .attr('x2', (d) => d.target.x)
    //     .attr('y2', (d) => d.target.y);

    //   node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    // });

    const drag = d3
      .drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        simulation.alphaTarget(0.3).restart();
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        simulation.alphaTarget(0);
      });

    // create the svg el
    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '600');
    // .style('border', '1px solid white');
    // .style('background', 'gray');

    const g = svg.append('g');

    // create the links
    const link = g
      .selectAll('line')
      .data(links)
      .enter()
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .join('line');
    // .attr('x1', (d) => d.source.x)
    // .attr('y1', (d) => d.source.y)
    // .attr('x2', (d) => d.target.x)
    // .attr('y2', (d) => d.target.y);

    // create the nodes
    const node = g
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')

      .attr('fill', '#fff')
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .join('circle')
      .attr('fill', (d) => (d.children ? null : '#000'))
      .attr('stroke', (d) => (d.children ? null : '#fff'))
      .attr('r', 3.5)

      .attr('cx', (d, i) => i * 20)
      .attr('cy', (d, i) => i * 20)
      // .attr('r', (d, i) => d.length)
      // .style('fill', 'pink')
      // .on('mouseover', (event, d) => {
      //   d3.select(event.currentTarget).attr('fill', '#f00');
      // })
      .call(drag);

    //call the tick method on each tick event
    // simulation.on('tick', () => {
    //   link
    //     .attr('x1', (d) => d.source.x)
    //     .attr('y1', (d) => d.source.y)
    //     .attr('x2', (d) => d.target.x)
    //     .attr('y2', (d) => d.target.y);

    //   node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    // });
  }, [cluster, loading, error]);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div>
      <h1>D3 Visualizer</h1>

      <svg ref={svgRef} />

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
