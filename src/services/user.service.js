import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data) {
  const { email, name } = data;

  const user = await prisma.user.create({
    data: { email, name },
  });

  return user;
}

export async function getUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
}

export async function updateUserById(id, data) {
  const user = await prisma.user.update({
    where: { id },
    data,
  });

  return user;
}

export async function deleteUserById(id) {
  const user = await prisma.user.delete({
    where: { id },
  });

  return user;
}

export async function queryUsers(filter, options) {
  const { sortBy, limit, page } = options;

  const users = await prisma.user.findMany({
    where: filter,
    skip: limit * (page - 1),
    take: limit,
    orderBy: sortBy,
  });

  return users;
}

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  queryUsers,
};
