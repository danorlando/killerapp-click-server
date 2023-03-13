/* eslint-disable import/no-extraneous-dependencies */
import type { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import {
  createChatService,
  getOpenAIModelsService,
} from '../services/chatgpt.service';

const createChat = catchAsync(async (req: Request, res: Response) => {
  const { prompt, model } = req.body;
  const message = await createChatService(prompt, model);

  if (!message) {
    res.status(500).json('Unable to contact ChatGPT server');
  }
  res.status(200).json({ response: message });
});

const getOpenAIModels = catchAsync(async (_req: Request, res: Response) => {
  const models = await getOpenAIModelsService();
  res.status(200).json({ models });
});

export { createChat, getOpenAIModels };
