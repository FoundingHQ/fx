import { prisma } from "@server/prisma";
import { Create<%= h.changeCase.pascalCase(name) %>Input, Update<%= h.changeCase.pascalCase(name) %>Input } from "@lib/<%= h.changeCase.camelCase(name) %>/data/<%= h.changeCase.camelCase(name) %>Hooks"
import { <%= h.changeCase.pascalCase(name) %> } from "@prisma/client";

export const create<%= name %> = async (input: Create<%= h.changeCase.pascalCase(name) %>Input) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.create({
    data: input,
  });
};

export const get<%= h.changeCase.pascalCase(name) %> = async (input: Partial<<%= h.changeCase.pascalCase(name) %>>) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.findUnique({
    where: input,
  });
};

export const get<%= h.changeCase.pascalCase(name) %>List = async () => {
  return prisma.<%= h.changeCase.camelCase(name) %>.findMany();
};

export const update<%= h.changeCase.pascalCase(name) %> = async (input: Update<%= h.changeCase.pascalCase(name) %>Input) => {
  const {id, ...<%= h.changeCase.camelCase(name) %>Input} = input;

  return prisma.<%= h.changeCase.camelCase(name) %>.update({
    where: { id },
    data: <%= h.changeCase.camelCase(name) %>Input,
  });
};

export const delete<%= h.changeCase.pascalCase(name) %> = async (input: Pick<<%= h.changeCase.pascalCase(name) %>, "id">) => {
  return prisma.<%= h.changeCase.camelCase(name) %>.delete({
    where: { id: input.id },
  });
};
