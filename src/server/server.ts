import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Router,
} from 'express';
import { RequestHandler } from 'express-serve-static-core';
import dotenv from 'dotenv';
import path from 'path';
import client from 'prom-client';

const cookieParser = require('cookie-parser');
const clusterRouter = require('./routes/api');
const userController = require('./middleware/userController');
const cookieController = require('./middleware/cookieController');
const sessionController = require('./middleware/sessionController');

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cookieParser());

app.use('/api', clusterRouter);

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
  // cookieController.setCookie,
  (req: Request, res: Response) => {
    console.log('backend and frontend are talking');
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../client/index.html'));
  }
);

// signup
// app.get('/signup', (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../client/signup.html'));
// });

// // route handler POST request to /signup
// app.post(
//   '/signup',
//   userController.createUser,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req: Request, res: Response) => {
//     // what should happen here on successful sign up?
//     // if post is successful redirect to /secret
//     res.status(200).redirect('/secret');
//   }
// );

// // login
// app.post(
//   '/login',
//   userController.verifyUser,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req: Request, res: Response) => {
//     console.log('successful login, redirecting');
//     res.redirect('/secret');
//   }
// );

// // Authorized routes
// app.get(
//   '/secret',
//   sessionController.isLoggedIn,
//   (req: Request, res: Response) => {
//     res.sendFile(path.resolve(__dirname, '../client/secret.html'));
//   }
// );

// app.get(
//   '/secret/users',
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
