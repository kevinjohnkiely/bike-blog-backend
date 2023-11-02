import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import PostModel from './models/post';

const app = express();

app.get('/', async (req, res, next) => {
  try {
    // throw Error('bazinga!!');
    const posts = await PostModel.find().exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(Error('Endpoint does not exist!'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occurred!';
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
