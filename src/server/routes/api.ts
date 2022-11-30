import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Router,
  response,
} from 'express';
const middleware = require('../middleware/middleware');
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

module.exports = router;
