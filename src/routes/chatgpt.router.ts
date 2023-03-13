import express from 'express';
import { createChat, getOpenAIModels } from '../controllers/chatgpt.controller';

const chatRouter = express.Router();

chatRouter.post('/chat', createChat);

chatRouter.get('/models', getOpenAIModels);

export default chatRouter;
