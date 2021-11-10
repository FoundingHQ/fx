import { prisma } from "@server/prisma";

const defaultSelect = {
  id: true,
};

type Create<%= h.changeCase.pascalCase(name) %>Input = {
  id?: string;
  <% attributes.split(" ").forEach((attr) => { %><%= attr %>;<% }); %>
};

export const create<%= name %> = async (input: Create<%= h.changeCase.pascalCase(name) %>Input) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.create({
    data: input,
    select: defaultSelect,
  });
};

type Get<%= h.changeCase.pascalCase(name) %>Input = {
  id?: string;
  <% attributes.split(" ").forEach((attr) => { %><%= attr %>;<% }); %>
};

export const get<%= h.changeCase.pascalCase(name) %> = async (input: Get<%= h.changeCase.pascalCase(name) %>Input) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.findUnique({
    where: input,
    select: defaultSelect,
  });
};

export const get<%= h.changeCase.pascalCase(name) %>List = async () => {
  return prisma.<%= h.changeCase.camelCase(name) %>.findMany({ select: defaultSelect });
};

interface Update<%= h.changeCase.pascalCase(name) %>Input {
  <%= h.changeCase.camelCase(name) %>Id: string;
  <%= h.changeCase.camelCase(name) %>Input: Create<%= h.changeCase.pascalCase(name) %>Input;
}

export const update<%= h.changeCase.pascalCase(name) %> = async ({
  <%= h.changeCase.camelCase(name) %>Id,
  <%= h.changeCase.camelCase(name) %>Input,
}: Update<%= h.changeCase.pascalCase(name) %>Input) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.update({
    where: { id: <%= h.changeCase.camelCase(name) %>Id },
    data: <%= h.changeCase.camelCase(name) %>Input,
  });
};

interface Delete<%= h.changeCase.pascalCase(name) %>Input {
  <%= h.changeCase.camelCase(name) %>Id: string;
}

export const delete<%= h.changeCase.pascalCase(name) %> = async ({
  <%= h.changeCase.camelCase(name) %>Id,
}: Delete<%= h.changeCase.pascalCase(name) %>Input) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.delete({
    where: { id: <%= h.changeCase.camelCase(name) %>Id },
  });
};
