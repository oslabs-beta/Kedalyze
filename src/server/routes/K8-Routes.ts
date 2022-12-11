import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Router,
  response,
} from 'express';
const clusterController = require('../middleware/clusterController');
const KedaMiddleController = require('../middleware/KedaMiddleware');
const router: Router = express.Router();

// k8 route to get cluster info
router.get(
  '/cluster',
  clusterController.getClusterInfo,
  (req: Request, res: Response) => {
    // console.log(
    //   'Getting clusters from clusterController.getClusterInfo',
    //   res.locals.clusterInfo
    // );
    return res.status(200).json(res.locals.clusterInfo);
  }
);

// k8 routes for keda-demo
router.get(
  '/podList',
  clusterController.getPodList,
  (req: Request, res: Response) => {
    // console.log(
    //   'Getting podList from clusterController.getPodList',
    //   res.locals.podList
    // );
    return res.status(200).json(res.locals.podList);
  }
);

// keda

// router.get(
//   '/scaledobjects',
//   KedaMiddleController.getScaledObject,
//   (req: Request, res: Response) => {}
// ),
//   router.get(
//     '/namespace/:namespace/scaledobjects/:name',
//     KedaMiddleController.getScaledObjectName,
//     (req: Request, res: Response) => {}
//   ),
//   router.get(
//     '/hpa',
//     KedaMiddleController.getHpa,
//     (req: Request, res: Response) => {}
//   ),
//   router.get(
//     '/keda',
//     KedaMiddleController.getKeda,
//     (req: Request, res: Response) => {}
//   ),
//   router.get(
//     '/keda/pod',
//     KedaMiddleController.getKedaPod,
//     (req: Request, res: Response) => {}
//   ),
//   router.get(
//     '/namespace/:namespace/metrics/:metricsname',
//     KedaMiddleController.getMetricName,
//     (req: Request, res: Response) => {}
//   ),

module.exports = router;
