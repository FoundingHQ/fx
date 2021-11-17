export const <%= h.changeCase.camelCase(name) %>Routes = {
  index: "/api/<%= h.pluralizedCamelCase(name) %>",
  create: "/api/<%= h.pluralizedCamelCase(name) %>",
  show: "/api/<%= h.pluralizedCamelCase(name) %>/:id",
  update: "/api/<%= h.pluralizedCamelCase(name) %>/:id",
  destroy: "/api/<%= h.pluralizedCamelCase(name) %>",
};

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

type <%= h.changeCase.pascalCase(name) %>Routes = typeof <%= h.changeCase.camelCase(name) %>Routes;

export const client<%= h.changeCase.pascalCase(name) %>Routes = Object.keys(<%= h.changeCase.camelCase(name) %>Routes).reduce((map, key) => {
  map[key as keyof <%= h.changeCase.pascalCase(name) %>Routes] = <%= h.changeCase.camelCase(name) %>Routes[key as keyof <%= h.changeCase.pascalCase(name) %>Routes].replace(
    "/api",
    ""
  );
  return map;
}, {} as <%= h.changeCase.pascalCase(name) %>Routes);
