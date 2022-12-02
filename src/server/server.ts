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

dotenv.config();

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
app.use(cookieParser());

app.use('/api', K8Router);

client.collectDefaultMetrics();

// collecting default metrics from Prometheus
// https://prometheus.io/docs/instrumenting/writing_clientlibs/#standard-and-runtime-collectors
// const collectDefaultMetrics = client.collectDefaultMetrics;
// const Registry = client.Registry;
// const register = new Registry();
// collectDefaultMetrics({ register });

// change to TS

app.get(
  '/',
  // cookieController.addCookie,
  (req: Request, res: Response) => {
    console.log('backend and frontend are talking');
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../client/index.html'));
  }
);

// signup
app.get('/register', (req: Request, res: Response) => {
  return res.status(200).json(res.locals.users);
});

// route handler POST request to /register
app.post(
  '/register',
  userController.createUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.id);
  }
);

// login
app.post(
  '/login',
  userController.verifyUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req: Request, res: Response) => {
    console.log('successful login, redirecting');
    // res.redirect('/dashboard');
  }
);

// Authorized routes
// app.get(
//   '/dashboard',
//   sessionController.isLoggedIn,
//   (req: Request, res: Response) => {
//     return res.status(200);
//   }
// );

// app.get(
//   '/dashboard/users',
//   sessionController.isLoggedIn,
//   userController.getAllUsers,
//   (req: Request, res: Response) => {
//     res.send({ users: res.locals.users });
//   }
// );

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
});

module.exports = app;
