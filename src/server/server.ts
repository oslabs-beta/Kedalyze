import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Router,
} from 'express';
import { RequestHandler } from 'express-serve-static-core';
import path from 'path';
import client from 'prom-client';
import * as dotenv from 'dotenv';
// use this one to connect to 9022 metrics (keda)
// import { startMetricsServer } from './metrics';

dotenv.config();

const cors = require('cors');
const cookieParser = require('cookie-parser');


// routes
const K8Router = require('./routes/K8-Routes');

// controllers
const userController = require('./middleware/userController');
const cookieController = require('./middleware/cookieController');
const sessionController = require('./middleware/sessionController');

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cors());
app.use(cookieParser());

app.use('/api', K8Router);

client.collectDefaultMetrics();

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

register.setDefaultLabels({
  app: 'kedalyze-api',
});

// all metrics
app.get('/metrics', async (req: Request, res: Response) => {
  res.setHeader('Content-type', register.contentType);
  res.end(await register.metrics());
});

////////////////////

app.get('/', cookieController.addCookie, (req: Request, res: Response) => {
  console.log('Backend and Frontend are connected 🎉🎉🎉');
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(express.static(path.join(__dirname, '../client')));

// signup
app.get(
  '/register',
  userController.getAllUsers,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.users);
  }
);

// route handler POST request to /register
app.post(
  '/register',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req: Request, res: Response) => {
    return res.status(200)
  }
);

// login
app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req: Request, res: Response) => {
    console.log('✅ successful login, redirecting');
    return res.status(200);
  }
);

// Authorized routes
app.get(
  '/dashboard',
  sessionController.isLoggedIn,
  (req: Request, res: Response) => {
    return res.status(200);
  }
);

app.get(
  '/dashboard/users',
  sessionController.isLoggedIn,
  userController.getAllUsers,
  (req: Request, res: Response) => {
    res.send({ users: res.locals.users });
  }
);

app.use('*', (req: Request, res: Response) => {
  return res.status(404);
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const defaultError = {
      log: 'express error handler triggered',
      status: 500,
      message: { err: `${err}: An error occurred` },
    };
    const errorObj = Object.assign({}, defaultError, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}...`);
  // startMetricsServer();
});

module.exports = app;
