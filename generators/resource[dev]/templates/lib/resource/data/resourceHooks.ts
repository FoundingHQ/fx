import { useMutation, useQuery } from "react-query";
import { <%= h.changeCase.pascalCase(props.name) %> } from "@prisma/client";

import { fetcher } from "@util/query";
import { client<%= h.changeCase.pascalCase(props.name) %>Routes } from "@lib/<%= h.changeCase.camelCase(props.name) %>/api/<%= h.changeCase.camelCase(props.name) %>Config";

export type Create<%= h.changeCase.pascalCase(props.name) %>Input = Omit<<%= h.changeCase.pascalCase(props.name) %>, "id" | "createdAt" | "updatedAt">
export type Update<%= h.changeCase.pascalCase(props.name) %>Input = Omit<<%= h.changeCase.pascalCase(props.name) %>, "createdAt" | "updatedAt">

export const use<%= h.changeCase.pascalCase(props.name) %>List = () => {
  return useQuery("<%= h.changeCase.camelCase(props.name) %>List", () =>
    fetcher.get(client<%= h.changeCase.pascalCase(props.name) %>Routes.index)
  );
};

export const use<%= h.changeCase.pascalCase(props.name) %>Show = (<%= h.changeCase.camelCase(props.name) %>Id: any) => {
  return useQuery("<%= h.changeCase.camelCase(props.name) %>Show", () =>
    fetcher.get(client<%= h.changeCase.pascalCase(props.name) %>Routes.show.replace("[id]", `${<%= h.changeCase.camelCase(props.name) %>Id}`)),
  );
};

export const use<%= h.changeCase.pascalCase(props.name) %>Create = (onSuccess: any) => {
  return useMutation(
    (data: Create<%= h.changeCase.pascalCase(props.name) %>Input) => fetcher.post(client<%= h.changeCase.pascalCase(props.name) %>Routes.create, data),
    { onSuccess },
  );
};

export const use<%= h.changeCase.pascalCase(props.name) %>Update = (onSuccess: any) => {
  return useMutation(
    (data: Update<%= h.changeCase.pascalCase(props.name) %>Input) =>
      fetcher.patch(client<%= h.changeCase.pascalCase(props.name) %>Routes.update.replace("[id]", `${data.id}`), data),
    { onSuccess },
  );
};

export const use<%= h.changeCase.pascalCase(props.name) %>Destroy = (onSuccess: any) => {
  return useMutation(
    (data: {id: string}) =>
      fetcher.delete(client<%= h.changeCase.pascalCase(props.name) %>Routes.destroy.replace("[id]", data.id)),
    { onSuccess },
  );
};
