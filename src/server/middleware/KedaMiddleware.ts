import express, {
  NextFunction,
  ErrorRequestHandler,
  Request,
  Response,
} from 'express';

import * as k8s from '@kubernetes/client-node';

// Kubernetes API
// List all pods
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const KedaMiddleController: Object = {};
(KedaMiddleController as any).getScaledObject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cluster = kc.getCurrentCluster();
  if (!cluster) {
    res.status(501).json({
      error: 'cluster not found',
    });
    return;
  }
  const opts = {
    url: `${cluster.server}/apis/keda.k8s.io/v1alpha1/scaledobjects`,
  };
  kc.applyToRequest(opts);
  const jsonStr = await kc.applyToRequest(opts);
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonStr);
};

(KedaMiddleController as any).getScaledObjectName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.params.name;
  const namespace = req.params.namespace;
  const cluster = kc.getCurrentCluster();
  if (!cluster) {
    res.status(501).json({
      error: 'cluster not found',
    });
    return;
  }
  const opts = {
    url: `${cluster.server}/apis/keda.k8s.io/v1alpha1/namespaces/${namespace}/scaledobjects/${name}`,
  };
  const jsonStr = await kc.applyToRequest(opts);
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonStr);
};

(KedaMiddleController as any).getHpa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cluster = kc.getCurrentCluster();
  if (!cluster) {
    res.status(501).json({
      error: 'cluster not found',
    });
    return;
  }
  const opts = {
    url: `${cluster.server}/apis/autoscaling/v1/horizontalpodautoscalers/`,
  };
  const jsonStr = await kc.applyToRequest(opts);
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonStr);
};

(KedaMiddleController as any).getKeda = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cluster = kc.getCurrentCluster();

  if (!cluster) {
    res.status(501).json({
      error: 'cluster not found',
    });
    return;
  }
  const opts = {
    url: `${cluster.server}/apis/apps/v1/namespaces/keda/deployments/keda-operator`,
  };

  const jsonStr = await kc.applyToRequest(opts);
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonStr);
};

(KedaMiddleController as any).getKedaPod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cluster = kc.getCurrentCluster();
  if (!cluster) {
    res.status(501).json({
      error: 'cluster not found',
    });
    return;
  }
  const opts = {
    url: `${cluster.server}/api/v1/namespaces/keda/pods?labelSelector=app%3Dkeda-operator`,
  };
  const pod = await kc.applyToRequest(opts);
  res.setHeader('Content-Type', 'application/json');
  res.send(pod);
};

(KedaMiddleController as any).getMetricName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const namespace = req.params.namespace;
  const metricsname = req.params.metricsname;
  const cluster = kc.getCurrentCluster();
  if (!cluster) {
    res.status(501).json({
      error: 'cluster not found',
    });
    return;
  }
  const opts = {
    url: `${cluster.server}/apis/external.metrics.k8s.io/v1beta1/namespaces/${namespace}/${metricsname}`,
  };
  const metrics = await kc.applyToRequest(opts);
  res.setHeader('Content-Type', 'application/json');

  res.send(metrics);
};

module.exports = KedaMiddleController;
