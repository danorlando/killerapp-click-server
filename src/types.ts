import type { Request, Response, NextFunction } from 'express';

export type TRequestResponseNextFunction = {
  request: Request;
  response: Response;
  next?: NextFunction;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
};
