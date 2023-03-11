/* eslint-disable import/no-extraneous-dependencies */
import httpStatus from 'http-status';
import pick from '../utils/pick';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import * as userService from '../services/user.service';
import type { TRequestResponseNextFunction } from '../types';

const createUser = catchAsync(
  async ({ request, response }: TRequestResponseNextFunction) => {
    const user = await userService.createUser(request.body);
    response.status(httpStatus.CREATED).send(user);
  }
);

const queryUsers = catchAsync(
  async ({ request, response }: TRequestResponseNextFunction) => {
    const filter = pick(request.query, ['name', 'role']);
    const options = pick(request.query, ['sortBy', 'limit', 'page']);
    const responseult = await userService.queryUsers(filter, options);
    response.send(responseult);
  }
);

const getUsers = catchAsync(
  async ({ response }: TRequestResponseNextFunction) => {
    const responseResult = await userService.getUsers();
    response.send(responseResult);
  }
);

const getUserById = catchAsync(
  async ({ request, response }: TRequestResponseNextFunction) => {
    const user = await userService.getUserById(request.params.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    response.send(user);
  }
);

const updateUserById = catchAsync(
  async ({ request, response }: TRequestResponseNextFunction) => {
    const user = await userService.updateUserById(
      request.params.userId,
      request.body
    );
    response.send(user);
  }
);

const deleteUserById = catchAsync(
  async ({ request, response }: TRequestResponseNextFunction) => {
    await userService.deleteUserById(request.params.userId);
    response.status(httpStatus.NO_CONTENT).send();
  }
);

export {
  createUser,
  queryUsers,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
