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
  const [podCount, setPodCount] = useState<number>(undefined);

  const svgRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3000/api/cluster')
      .then((res) => res.json())
      .then((cluster) => {
        setCluster(cluster);

        const namespace = cluster.Namespace.filter(
          (name: string, index: number, self: string) =>
            self.indexOf(name) === index
        ).map((name: string, index: number) => <li key={index}>{name}</li>);
        setNamespace(namespace);

        const podName = cluster.PodName.map((name: string, index: number) => (
          <li key={index}>{name}</li>
        ));
        setPodName(podName);

        const podCount = parseInt(cluster.PodCount.match(/\d+/g)[0], 10);
        setPodCount((prevState) => podCount);

        setLoading(false);
      })
      .catch((err) => {
        console.log(`An error occurred fetching cluster information: ${err}`);
      });
  }, []);

  const data = cluster;
  // console.log('this is data', data);

  useEffect(() => {
    if (!cluster || loading || error) {
      return;
    }

    const svg = d3
      .select(svgRef.current)
      .attr('width', '1000')
      .attr('height', '500')
      .style('border', '1px solid white')
      .style('background', 'gray');

    // this is just a test
    // svg
    //   .selectAll('circle')
    //   .data<string>(cluster.Namespace)
    //   .enter()
    //   .append('circle')
    //   .attr('cx', (d, i) => i * 50)
    //   .attr('cy', (d, i) => i * 50)
    //   .attr('r', (d, i) => d.length)
    //   .style('fill', 'blue');

    const _chart = (
      d3: any,
      data: any,
      width: number,
      height: number,
      drag: any,
      invalidation: any
    ) => {
      const root = d3.hierarchy(data);
      const links = root.links();
      const nodes = root.descendants();
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            .id((d: { id: number }) => d.id)
            .distance(0)
            .strength(1)
        )
        .force('charge', d3.forceManyBody().strength(-50))
        .force('x', d3.forceX())
        .force('y', d3.forceY());

      const svg = d3
        .create('svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height]);

      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line');

      const node = svg
        .append('g')
        .attr('fill', '#fff')
        .attr('stroke', '#000')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('fill', (d: { children: boolean | null }) =>
          d.children ? null : '#000'
        )
        .attr('stroke', (d: { children: boolean | null }) =>
          d.children ? null : '#fff'
        )
        .attr('r', 3.5)
        .call(drag(simulation));

      node.append('title').text((d: { data: { name: string } }) => d.data.name);

      simulation.on('tick', () => {
        link
          .attr('x1', (d: { source: { x: number } }) => d.source.x)
          .attr('y1', (d: { source: { y: number } }) => d.source.y)
          .attr('x2', (d: { target: { x: number } }) => d.target.x)
          .attr('y2', (d: { target: { y: number } }) => d.target.y);

        node
          .attr('cx', (d: { x: number }) => d.x)
          .attr('cy', (d: { y: number }) => d.y);
      });

      invalidation.then(() => simulation.stop());

      return svg.node();
    };

    function _drag(d3: any) {
      return (simulation: any) => {
        function dragstarted(event: any, d: any) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event: any, d: any) {
          d.fx = event.x;
          d.fy = event.y;
        }

        function dragended(event: any, d: any) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended);
      };
    }

    function _d3(require: Function) {
      return require('d3@6');
    }
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
        <span>Capacity-{cluster.PodCapacity}</span>
        <br />
        <span>{cluster.PodCount}</span>
        <br />
        <span>
          Terminated Pods:
          {Math.floor(cluster.PodName.length) / podCount}
        </span>
      </div>
    </div>
  );
};

export default ClusterInfo;
