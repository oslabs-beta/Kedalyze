import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Router,
  response,
} from 'express';
const middleware = require('../middleware/middleware');
const KedaMiddleController = require('../middleware/KedaMiddleware')
const router: Router = express.Router();

// need to make this in TS
router.get('/podList', middleware.getPodList, (req: Request, res: Response) => {
  res.status(201).send(res.locals.podList);
});

router.get(
  '/deploymentList',
  middleware.getDeploymentList,
  (req: Request, res: Response) => {
    res.status(201).send(res.locals.deploymentList);
  }
);

router.get('/scaledobjects', KedaMiddleController.getScaledObject , (req: Request, res: Response)=> {}),
router.get('/namespace/:namespace/scaledobjects/:name', KedaMiddleController.getScaledObjectName, (req: Request, res: Response) => {}),
router.get('/hpa', KedaMiddleController.getHpa, (req: Request, res: Response) => {}),
router.get('/keda', KedaMiddleController.getKeda ,(req: Request, res: Response) => {}),
router.get('/keda/pod', KedaMiddleController.getKedaPod, (req: Request, res: Response) => {}),
router.get('/namespace/:namespace/metrics/:metricsname', KedaMiddleController.getMetricName, (req: Request, res: Response) => {}),

module.exports = router;
