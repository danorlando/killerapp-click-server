/* eslint-disable import/no-extraneous-dependencies */
import httpStatus from 'http-status';
import type { Request, Response } from 'express';
import pick from '../utils/pick';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import * as userService from '../services/user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

const queryUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const responseult = await userService.queryUsers(filter, options);
  res.send(responseult);
});

const getUsers = catchAsync(async (_req: Request, res: Response) => {
  const allUsers = await userService.getUsers();
  res.status(200).json({ users: allUsers });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(200).json(user);
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserById(
    // @ts-ignore
    req.params.userId,
    req.body
  );
  res.status(200).json(user);
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT);
});

export {
  createUser,
  queryUsers,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
