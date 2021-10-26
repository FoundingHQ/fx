import { prisma } from "@server/prisma";
import { createPasswordHash } from "@lib/auth/server/authService";
import { Prisma, User } from "@prisma/client";

const defaultSelect = {
  id: true,
  email: true,
  emailVerified: true,
  name: true,
  image: true,
  role: true,
  updatedAt: false,
  createdAt: false,
  passwordHash: false,
};

type CreateUserInput = {
  email?: string;
  name?: string;
  image?: string;
  password?: string;
  account?: {
    provider: string;
    providerAccountId: string;
    accessToken: string;
    refreshToken: string;
  };
};

export const createUser = async ({
  email,
  name,
  image,
  password,
  account,
}: CreateUserInput) => {
  const data: Prisma.UserCreateInput = { email, name, image };

  if (password) {
    data.passwordHash = await createPasswordHash(password);
  }

  if (account) {
    data.accounts = {
      create: [
        {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
        },
      ],
    };
  }

  return prisma.user.create({
    data,
    select: defaultSelect,
  });
};

type GetUserInput = {
  id?: string;
  email?: string;
};

export const getUser = async ({ email, id }: GetUserInput) => {
  const where = email ? { email } : { id };

  return prisma.user.findUnique({
    where,
    select: defaultSelect,
  });
};

export const getUserPasswordHash = async ({ email, id }: GetUserInput) => {
  const where = email ? { email } : { id };
  const user = await prisma.user.findUnique({ where });

  if (user) {
    return {
      user: { ...user, passwordHash: null },
      passwordHash: user.passwordHash,
    };
  }

  return { user: null, passwordHash: null };
};

export const serializeUser = (
  user: User,
  callback: (err: any, userId?: string) => void
) => {
  callback(null, user.id);
};

export const deserializeUser = async (
  userId: User["id"],
  callback: (err: any, user?: Partial<User>) => void
) => {
  try {
    const user = await getUser({ id: userId });
    callback(null, user || undefined);
  } catch (err) {
    callback(err);
  }
};

export const getUsers = async () => {
  return prisma.user.findMany({ select: defaultSelect });
};
