import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Router,
  response,
} from 'express';
const clusterController = require('../middleware/clusterController');
const router: Router = express.Router();

// k8 route to get cluster info
router.get(
  '/cluster',
  clusterController.getClusterInfo,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clusterInfo);
  }
);

// k8 routes for keda-demo
router.get(
  '/podList',
  clusterController.getPodList,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.podList);
  }
);

module.exports = router;
