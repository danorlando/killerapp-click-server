import express from 'express';
import { createChat } from '../controllers/chatgpt.controller';

const chatRouter = express.Router();

chatRouter.post('/chat', createChat);

export default chatRouter;
