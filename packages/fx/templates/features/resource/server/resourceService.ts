import { prisma } from "@server/prisma";
import { Prisma } from "@prisma/client";

const defaultSelect = {
  id: true,
};

type Create<%= name %>Input = {
  id?: string;
  name?: string;
};

export const create<%= name %> = async ({ name }: Create<%= name %>Input) => {
  const data: Prisma.<%= name %>CreateInput = { name };
  return prisma.<%= name.toLowerCase() %>.create({
    data,
    select: defaultSelect,
  });
};

type Get<%= name %>Input = {
  id?: string;
  email?: string;
};

export const get<%= name %> = async ({ id }: Get<%= name %>Input) => {
  const where = { id };

  return prisma.<%= name.toLowerCase() %>.findUnique({
    where,
    select: defaultSelect,
  });
};

export const get<%= name %>List = async () => {
  return prisma.<%= name.toLowerCase() %>.findMany({ select: defaultSelect });
};

interface Update<%= name %>Input {
  <%= name.toLowerCase() %>Id: string;
  <%= name.toLowerCase() %>Input: Create<%= name %>Input;
}

export const update<%= name %> = async ({
  <%= name.toLowerCase() %>Id,
  <%= name.toLowerCase() %>Input,
}: Update<%= name %>Input) => {
  const <%= name.toLowerCase() %>  = await prisma.<%= name.toLowerCase() %>.findUnique({
    where: {
      id: <%= name.toLowerCase() %>Id,
    },
  });

  const { name } = <%= name.toLowerCase() %>Input;
  return prisma.<%= name.toLowerCase() %>.update({
    where: { id: <%= name.toLowerCase() %>Id },
    data: { name },
  });
};

interface Delete<%= name %>Input {
  <%= name.toLowerCase() %>Id: string;
}

export const delete<%= name %> = async ({
  <%= name.toLowerCase() %>Id,
}: Delete<%= name %>Input) => {
  const <%= name.toLowerCase() %> = await prisma.<%= name.toLowerCase() %>.findUnique({
    where: {
      id: <%= name.toLowerCase() %>Id,
    },
  });

  return prisma.<%= name.toLowerCase() %>.delete({
    where: { id: <%= name.toLowerCase() %>Id },
  });
};
