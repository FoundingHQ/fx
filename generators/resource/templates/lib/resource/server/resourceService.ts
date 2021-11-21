import { prisma } from "@server/prisma";
import { Create<%= h.changeCase.pascalCase(props.name) %>Input, Update<%= h.changeCase.pascalCase(props.name) %>Input } from "@lib/<%= h.changeCase.camelCase(props.name) %>/data/<%= h.changeCase.camelCase(props.name) %>Hooks"
import { <%= h.changeCase.pascalCase(props.name) %> } from "@prisma/client";

export const create<%= h.changeCase.pascalCase(props.name) %> = async (input: Create<%= h.changeCase.pascalCase(props.name) %>Input) => {
  return prisma.<%= h.changeCase.camelCase(props.name) %>.create({
    data: input,
  });
};

export const get<%= h.changeCase.pascalCase(props.name) %> = async (input: Partial<<%= h.changeCase.pascalCase(props.name) %>>) => {
  return prisma.<%= h.changeCase.camelCase(props.name) %>.findUnique({
    where: input,
  });
};

export const get<%= h.changeCase.pascalCase(props.name) %>List = async () => {
  return prisma.<%= h.changeCase.camelCase(props.name) %>.findMany();
};

export const update<%= h.changeCase.pascalCase(props.name) %> = async (input: Update<%= h.changeCase.pascalCase(props.name) %>Input) => {
  const {id, ...<%= h.changeCase.camelCase(props.name) %>Input} = input;

  return prisma.<%= h.changeCase.camelCase(props.name) %>.update({
    where: { id },
    data: <%= h.changeCase.camelCase(props.name) %>Input,
  });
};

export const delete<%= h.changeCase.pascalCase(props.name) %> = async (input: Pick<<%= h.changeCase.pascalCase(props.name) %>, "id">) => {
  return prisma.<%= h.changeCase.camelCase(props.name) %>.delete({
    where: { id: input.id },
  });
};
