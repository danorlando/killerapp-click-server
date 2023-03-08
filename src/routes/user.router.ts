import express from 'express';
import {
  // checkRequiredPermissions,
  validateAccessToken,
} from '../middlewares/auth0.middleware';
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller';
// import AdminUserRoles from '../roles/user.roles';

const userRouter = express.Router();

userRouter.post('/users', validateAccessToken, createUser);

userRouter.get('/users', validateAccessToken, getUsers);

userRouter.put('/users/:userId', validateAccessToken, updateUserById);

userRouter.get('/users/:userId', validateAccessToken, getUserById);

userRouter.delete(
  '/users/:userId',
  validateAccessToken,
  // checkRequiredPermissions([AdminUserRoles.Delete]),
  deleteUserById
);

export default userRouter;
