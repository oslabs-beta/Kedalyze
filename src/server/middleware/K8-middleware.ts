import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import * as k8s from '@kubernetes/client-node';

// Kubernetes API
// List all pods
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi1 = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi2 = kc.makeApiClient(k8s.AppsV1Api);

// Kubernetes API middlewares
const middleware: Object = {};

// get pod lists
// k8sApi1.listNamespacedPod('default').then((res) => {
//   console.log('this is listNamespacedPod:', res.body);
// });

(middleware as any).getPodList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  k8sApi1
    .listNamespacedPod('default')
    .then((data) => {
      res.locals.podList = data.body;
      // console.log('this is res.locals.podList', res.locals.podList);
      return next();
    })
    .catch((err) => {
      res.status(500).send(`error found in get request to /podList: ${err}`);
    });
};

// get deployments
// k8sApi2.listNamespacedDeployment('default').then((res) => {
//   console.log('this is listNamespacedDeployment:', res.body);
// });

(middleware as any).getDeploymentList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  k8sApi2
    .listNamespacedDeployment('default')
    .then((data) => {
      res.locals.deploymentList = data.body;
      //   console.log(
      //     'this is res.locals.deploymentList'
      //     res.locals.deploymentList
      //   );
      return next();
    })
    .catch((err) => {
      res
        .status(500)
        .send(`error found in get request to /deploymentList', err: ${err}`);
    });
};

module.exports = middleware;
