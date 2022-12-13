import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { drag } from 'd3-drag';
import '../../../styles/d3Styles.css';

const D3Visuals = (props) => {
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
            name: 'hello-minikube-7ddcbc9b8b-6rp88',
          },
          {
            name: 'prometheus-grafana-54c6c7fc7b-8jfq7',
          },
          {
            name: 'prometheus-kube-prometheus-operator-54b9d7fdc-m4csq',
          },
          {
            name: 'prometheus-kube-state-metrics-6cfd96f4c8-blvs7',
          },
          {
            name: 'prometheus-prometheus-kube-prometheus-prometheus-0',
          },
          {
            name: 'prometheus-prometheus-node-exporter-4cr2l',
          },
        ],
      },
      {
        name: 'keda',
        children: [
          {
            name: 'keda-operator-5b8c55cdb-qpcbk',
          },
          {
            name: 'keda-operator-metrics-apiserver-66496446f7-stgfn',
          },
        ],
      },
      {
        name: 'keda-demo',
        children: [
          {
            name: 'go-prom-app-6498f56b55-t4rz7 ',
          },
          {
            name: 'grafana-d567ffc6d-wlm67',
          },
          {
            name: 'prometheus-deployment-575fd985d8-bvg9j',
          },
        ],
      },
      {
        name: 'kube-system',
        children: [
          {
            name: 'coredns-565d847f94-tg54h',
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
            name: 'kube-proxy-rfkmt',
          },
          {
            name: 'kube-scheduler-minikube',
          },
          {
            name: 'metrics-server-769cd898cd-m9qjw',
          },
          {
            name: 'storage-provisioner',
          },
        ],
      },
    ],
  };

  const svgRef = useRef();

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
      .force(
        'collide',
        d3.forceCollide(function (d) {
          return d.id === 'j' ? 25 : 12;
        })
      )
      .force('x', d3.forceX().x(d3.randomUniform(0, width)))
      .force('y', d3.forceY().y(d3.randomUniform(0, height)));

    const svg = d3
      .select(svgRef.current)
      .attr('width', '570')
      .attr('height', '500')
      .style('border-radius', '15px')
      .style('border', '0.5px solid white');

    const tooltip = d3
      .select('.d3-visuals-cluster')
      .append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('padding', '0.5rem 1.5rem')
      .style('border-radius', '25px')
      .style('background', '#f9c4d2')
      .style('opacity', '80%')
      .style('color', '#382b22');

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line');

    const node = svg
      .append('g')
      .attr('fill', '#fcbcb5')
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('fill', (d) => (d.children ? null : '#daff7d'))
      .attr('stroke', (d) => (d.children ? null : '#fff'))
      .attr('r', 6)
      .on('mouseover', (e, d) => {
        let data = d.data.name;
        tooltip.style('visibility', 'visible').text(`${d.data.name}:`);
      })
      .on('mousemove', (e, d) => {
        tooltip
          .style('top', e.pageY - 50 + 'px')
          .style('left', e.pageX - 50 + 'px');
      })
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
      <div className='d3-visuals-cluster'>
        <svg ref={svgRef} className='d3-visual' />
      </div>
    </div>
  );
};

export default D3Visuals;
