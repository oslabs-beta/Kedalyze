//metrics.ts
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
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();

  app.get('/metrics', async (req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    console.log('Metrics server started at http://localhost:9100');
  });
}
