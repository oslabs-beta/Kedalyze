import * as React from 'react';
import {
  Metric,
  PrometheusDriver,
  QueryResult,
  PrometheusConnectionOptions,
} from 'prometheus-query';

const PrometheusChart = () => {
  const prom = new PrometheusDriver({
    endpoint: 'https://prometheus.demo.do.prometheus.io',
    baseURL: '/api/v1', // default value
  });

  // last `up` value
  const query = 'up{instance="demo.do.prometheus.io:9090",job="node"}';
  prom
    .instantQuery(query)
    .then((res) => {
      const series = res.result;
      series.forEach((serie) => {
        console.log('Serie:', serie.metric.toString());
        console.log('Time:', serie.value.time);
        console.log('Value:', serie.value.value);
      });
    })
    .catch(console.error);

  return (
    <div>
      <h3>this is it</h3>
    </div>
  );
};

export default PrometheusChart;
