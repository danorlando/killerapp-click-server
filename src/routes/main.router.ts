import { Router } from 'express';
import userRouter from './user.router';
import chatRouter from './chatgpt.router';

const mainRouter = Router();

mainRouter.use(userRouter);
mainRouter.use(chatRouter);

export default mainRouter;
