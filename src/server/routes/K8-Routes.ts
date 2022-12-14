import express, {
  Request,
  Response,
  Router,
} from 'express';
const clusterController = require('../middleware/clusterController');
const router: Router = express.Router();

router.get(
  '/cluster',
  clusterController.getClusterInfo,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clusterInfo);
  }
);

router.get(
  '/podList',
  clusterController.getPodList,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.podList);
  }
);

module.exports = router;
