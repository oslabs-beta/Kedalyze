import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ResponseObj } from '../interfaces/crud';
const child_process = require('child_process');

import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi1 = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi2 = kc.makeApiClient(k8s.AppsV1Api);

interface clusterController {
  getPodList: ResponseObj;
  getClusterInfo: ResponseObj;
}

// get cluster info
// use this to get total number of pods in a namespace to visualize the autoscaling

const clusterController: clusterController = {
  getClusterInfo: (req: Request, res: Response, next: NextFunction) => {
    function system(cmd: string, callback: Function) {
      child_process.exec(
        cmd,
        function (error: ErrorRequestHandler, stdout: string) {
          callback(stdout);
        }
      );
    }
    system('kubectl describe nodes', function (nodes: string) {
      let arr = nodes.split('\n');
      let start;
      let end;
      const newArr: any = [];
      const obj: any = {
        Namespace: [],
        PodName: [],
        PodCapacity: '',
        PodCount: '',
        CPURequests: [],
        CPULimits: [],
        MemoryRequests: [],
        MemoryLimits: [],
        Duration: [],
      };

      // console.log(arr);
      // console.log(obj);

      for (let i = 0; i < arr.length; i++) {
        // console.log(`this is arr el: ${arr[i]} at key:${[i]}`);
        obj.PodCapacity = arr[42];
        obj.PodCount = arr[65];

        // let podCapacity = arr[42];
        // let nonTerminatedPods = arr[65]

        if (arr[i].includes('Namespace')) start = i;
        if (arr[i].includes('Allocated resources')) end = i;
      }
      for (let i = start; i < end; i++) {
        newArr.push(arr[i]);
      }
      for (let i = 0; i < newArr.length; i++) {
        newArr[i] = newArr[i].split(/[ ,]+/);
      }
      for (let i = 2; i < newArr.length; i++) {
        obj.Namespace.push(newArr[i][1]);
        obj.PodName.push(newArr[i][2]);
        obj.CPURequests.push(newArr[i][3].concat(newArr[i][4]));
        obj.CPULimits.push(newArr[i][5].concat(newArr[i][6]));
        obj.MemoryRequests.push(newArr[i][7].concat(newArr[i][8]));
        obj.MemoryLimits.push(newArr[i][9].concat(newArr[i][10]));
        obj.Duration.push(newArr[i][11]);
      }
      res.locals.clusterInfo = obj;
      // console.log('kedaController: ', res.locals.clusterInfo);
      return next();
    });
  },

  getPodList: (req: Request, res: Response, next: NextFunction) => {
    k8sApi1
      .listNamespacedPod('keda-demo')
      .then((data) => {
        let itemArray: any = data.body.items;
        for (let item of itemArray) {
          let conditions = item.status.conditions;

          for (let key in conditions) {
            let V1PodCondition = conditions[key];

            const obj: any = {
              podName: item.metadata.name,
              namespace: item.metadata.namespace,
              created: item.metadata.creationTimestamp,
              podIp: item.status.podIP,
              status: V1PodCondition.status,
              type: V1PodCondition.type,
            };
            res.locals.podList = obj;
            // res.locals.podList = data.body;
            // console.log('status:', obj.status);
            // console.log('type:', obj.type);
            // console.log('podName:', obj.podName);
            // console.log('namespace:', obj.namespace);
            // console.log('created:', obj.created);
            // console.log('podIp:', obj.podIp);
          }
        }
        return next();
      })
      .catch((err) => {
        res.status(500).send(`error found in get request to /podList: ${err}`);
      });
  },
};

module.exports = clusterController;