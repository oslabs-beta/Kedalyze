import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { drag } from 'd3-drag';
import '../../../styles/d3Styles.css';

const D3Visuals = (props) => {
  // need to figure out a way to do it without hard-coding the data
  // passing down props, it is still deeply nested
  // const { data } = props;

  const data = {
    name: 'minikube',
    children: [
      {
        name: 'default',
        children: [
          {
            name: 'alertmanager-prometheus-kube-prometheus-alertmanager-0',
          },
          {
            name: ' hello-minikube-7ddcbc9b8b-p58vn',
          },
          {
            name: 'mongodb-deployment-9695cdd7c-h46gm ',
          },
          {
            name: 'mongodb-exporter-prometheus-mongodb-exporter-697654b54d-txjh2',
          },
          {
            name: 'prometheus-grafana-5d9f5d6499-8hh9r',
          },
          {
            name: 'prometheus-kube-prometheus-operator-689dd6679c-stgt8',
          },
          {
            name: 'prometheus-kube-state-metrics-6cfd96f4c8-72n84',
          },
          {
            name: ' prometheus-prometheus-kube-prometheus-prometheus-0  ',
          },
          {
            name: ' prometheus-prometheus-node-exporter-44jrr  ',
          },
        ],
      },
      {
        name: 'keda-demo',
        children: [
          {
            name: 'go-prom-app-7bc85dbd8b-x5b9t',
          },
          {
            name: 'prometheus-deployment-c845c544d-qzvb2',
          },
        ],
      },
      {
        name: 'keda',
        children: [
          {
            name: 'keda-metrics-apiserver-74d8b444f4-d4frw',
          },
          {
            name: 'keda-operator-7749c69898-wcc66',
          },
          {
            name: 'keda-operator-metrics-apiserver-95ccb594f-xr4lr ',
          },
        ],
      },
      {
        name: 'kube-system',
        children: [
          {
            name: 'coredns-565d847f94-qhd4g',
          },
          {
            name: 'etcd-minikube',
          },
          {
            name: 'kube-apiserver-minikube',
          },
          {
            name: 'kube-controller-manager-minikube',
          },
          {
            name: 'kube-proxy-8tg9b',
          },
          {
            name: 'kube-scheduler-minikube',
          },
          {
            name: 'metrics-server-769cd898cd-czgjv',
          },
          {
            name: 'storage-provisioner',
          },
        ],
      },
    ],
  };

  const svgRef = useRef();

  console.log(data);

  const invalidation = new Promise(() => {});

  useEffect(() => {
    const node = chart(d3, data, 100, 100, drag, invalidation);
  }, [svgRef]);

  function chart(d3, data, width, height, drag, invalidation) {
    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1)
      )
      .force('charge', d3.forceManyBody().strength(-50))
      .force('x', d3.forceX().x(d3.randomUniform(0, width)))
      .force('y', d3.forceY().y(d3.randomUniform(0, height)));

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '300');

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
      .attr('fill', (d) => (d.children ? null : '#000'))
      .attr('stroke', (d) => (d.children ? null : '#fff'))
      .attr('r', 6)
      .call(drag(simulation));

    node.append('title').text((d) => d.data.name);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });

    invalidation.then(() => simulation.stop());

    return svg.node();
  }

  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    function dragsubject(event) {
      return simulation.find(
        event.sourceEvent.offsetX,
        event.sourceEvent.offsetY
      );
    }

    return d3
      .drag()
      .subject(dragsubject)
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  return (
    <div>
      <h1>D3 Visualizer</h1>
      <svg ref={svgRef} className='d3-visual' />
    </div>
  );
};

export default D3Visuals;
