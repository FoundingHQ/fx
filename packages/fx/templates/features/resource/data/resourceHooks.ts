import { useMutation, useQuery } from "react-query";
import { <%= h.changeCase.pascalCase(name) %> } from "@prisma/client";

import { fetcher } from "@util/query";
import { client<%= h.changeCase.pascalCase(name) %>Routes } from "@lib/<%= h.changeCase.camelCase(name) %>/server/<%= h.changeCase.camelCase(name) %>Config";

export const use<%= h.changeCase.pascalCase(name) %>List = () => {
  return useQuery("<%= h.changeCase.camelCase(name) %>List", () =>
    fetcher.get(client<%= h.changeCase.pascalCase(name) %>Routes.index)
  );
};

export const use<%= h.changeCase.pascalCase(name) %>Show = (onSuccess: any) => {
  return useMutation(
    (data: {id: string}) =>
      fetcher.get(client<%= h.changeCase.pascalCase(name) %>Routes.show.replace(":id", data.id)),
    { onSuccess },
  );
};

export const use<%= h.changeCase.pascalCase(name) %>Create = (onSuccess: any) => {
  return useMutation(
    (data: <%= h.changeCase.pascalCase(name) %>) => fetcher.post(client<%= h.changeCase.pascalCase(name) %>Routes.create, data),
    { onSuccess },
  );
};

export const use<%= h.changeCase.pascalCase(name) %>Update = (onSuccess: any) => {
  return useMutation(
    (data: <%= h.changeCase.pascalCase(name) %>) =>
      fetcher.post(client<%= h.changeCase.pascalCase(name) %>Routes.update.replace(":id", `${data.id}`), data),
    { onSuccess },
  );
};

export const use<%= h.changeCase.pascalCase(name) %>Destroy = (onSuccess: any) => {
  return useMutation(
    (data: {id: string}) =>
      fetcher.post(client<%= h.changeCase.pascalCase(name) %>Routes.destroy.replace(":id", data.id)),
    { onSuccess },
  );
};
