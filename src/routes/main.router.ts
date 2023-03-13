import { Router } from 'express';
import userRouter from './user.router';

const mainRouter = Router();

mainRouter.use(userRouter);

export default mainRouter;
