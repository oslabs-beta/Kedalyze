import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import client from 'prom-client';

const app: Express = express();

export function startMetricsServer() {
  client.collectDefaultMetrics();

  const collectDefaultMetrics = client.collectDefaultMetrics;
  const Registry = client.Registry;
  const register = new Registry();
  collectDefaultMetrics({ register });

  register.setDefaultLabels({
    app: 'kedalyze-keda-api',
  });

  app.get('/metrics', async (req: Request, res: Response) => {
    res.setHeader('Content-type', register.contentType);
    res.end(await register.metrics());
  });

  app.listen(9022, () => {
    console.log('Metrics server started at http://localhost:9022');
  });
}
