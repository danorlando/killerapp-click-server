import type { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser({ data }: { data: User }): Promise<User> {
  const { email, firstName, lastName } = data;

  const user = await prisma.user.create({
    data: { email, firstName, lastName },
  });

  return user;
}

export async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();

  return users;
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
}

export async function updateUserById(id: string, data: User): Promise<User> {
  const user = await prisma.user.update({
    where: { id },
    data,
  });

  return user;
}

export async function deleteUserById(id: string): Promise<User> {
  const user = await prisma.user.delete({
    where: { id },
  });

  return user;
}

export async function queryUsers(
  filter: any,
  options: any
): Promise<User[] | null> {
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
