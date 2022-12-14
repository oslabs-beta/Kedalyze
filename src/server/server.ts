import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { RequestHandler } from 'express-serve-static-core';
import path from 'path';
import client from 'prom-client';
import * as dotenv from 'dotenv';

dotenv.config();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const K8Router = require('./routes/K8-Routes');

const userController = require('./middleware/userController');
const cookieController = require('./middleware/cookieController');
const sessionController = require('./middleware/sessionController');
const JWTController = require('./middleware/JWTController');

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
    exposedHeaders: ['Set-Cookie', 'Date', 'ETag'],
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', K8Router);

client.collectDefaultMetrics();

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

register.setDefaultLabels({
  app: 'kedalyze-api',
});

app.get('/metrics', async (req: Request, res: Response) => {
  res.setHeader('Content-type', register.contentType);
  res.end(await register.metrics());
});

app.get('/', (req: Request, res: Response) => {
  console.log('Backend and Frontend are connected 🎉🎉🎉');
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.get(
  '/register',
  userController.getAllUsers,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.users);
  }
);

app.post(
  '/register',
  userController.createUser,
  cookieController.addCookie,
  sessionController.startSession,
  cookieController.sessionCookie,
  JWTController.createTokens,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
  }
);

app.post(
  '/login',
  userController.verifyUser,
  cookieController.addCookie,
  sessionController.isLoggedIn,
  cookieController.sessionCookie,
  JWTController.validateTokens,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
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
    console.error(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}...`);
});

module.exports = app;
