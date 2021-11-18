import { prisma } from "@server/prisma";
import { <%= h.changeCase.pascalCase(name) %> } from "@prisma/client";

export const create<%= name %> = async (input: <%= h.changeCase.pascalCase(name) %>) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.create({
    data: input,
  });
};

export const get<%= h.changeCase.pascalCase(name) %> = async (input: <%= h.changeCase.pascalCase(name) %>) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.findUnique({
    where: input,
  });
};

export const get<%= h.changeCase.pascalCase(name) %>List = async () => {
  return prisma.<%= h.changeCase.camelCase(name) %>.findMany();
};

interface Update<%= h.changeCase.pascalCase(name) %>Input {
  <%= h.changeCase.camelCase(name) %>Id: string;
  <%= h.changeCase.camelCase(name) %>Input: <%= h.changeCase.pascalCase(name) %>;
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
