import { prisma } from "@server/prisma";
import { Prisma } from "@prisma/client";

const defaultSelect = {
  id: true,
};

type Create<%= name %>Input = {
  id?: string;
  <%= attributes %>
};

export const create<%= name %> = async (input: Create<%= name %>Input) => {
  return prisma.<%= name.toLowerCase() %>.create({
    data: input,
    select: defaultSelect,
  });
};

type Get<%= name %>Input = {
  id?: string;
  <%= attributes %>
};

export const get<%= name %> = async (input: Get<%= name %>Input) => {
  return prisma.<%= name.toLowerCase() %>.findUnique({
    where: input,
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
  return prisma.<%= name.toLowerCase() %>.update({
    where: { id: <%= name.toLowerCase() %>Id },
    data: <%= name.toLowerCase() %>Input,
  });
};

interface Delete<%= name %>Input {
  <%= name.toLowerCase() %>Id: string;
}

export const delete<%= name %> = async ({
  <%= name.toLowerCase() %>Id,
}: Delete<%= name %>Input) => {
  return prisma.<%= name.toLowerCase() %>.delete({
    where: { id: <%= name.toLowerCase() %>Id },
  });
};
