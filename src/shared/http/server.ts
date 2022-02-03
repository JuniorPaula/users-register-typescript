import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

/** express intance */
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

/** middleware to intercept all errors */
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

/** start on server */
const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
