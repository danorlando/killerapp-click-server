/* eslint-disable import/no-extraneous-dependencies */
import type { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { createChatService } from '../services/chatgpt.service';

const createChat = catchAsync(async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const message = await createChatService(prompt);

  if (!message) {
    res.status(500).json('Unable to contact ChatGPT server');
  }
  res.status(200).json({ response: message });
});

export { createChat };
