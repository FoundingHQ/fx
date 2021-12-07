export const <%= h.changeCase.camelCase(props.name) %>Routes = {
  index: "/api/<%= h.pluralizedCamelCase(props.name) %>",
  create: "/api/<%= h.pluralizedCamelCase(props.name) %>",
  show: "/api/<%= h.pluralizedCamelCase(props.name) %>/[id]",
  update: "/api/<%= h.pluralizedCamelCase(props.name) %>/[id]",
  destroy: "/api/<%= h.pluralizedCamelCase(props.name) %>/[id]",
};

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

type <%= h.changeCase.pascalCase(props.name) %>Routes = typeof <%= h.changeCase.camelCase(props.name) %>Routes;

export const client<%= h.changeCase.pascalCase(props.name) %>Routes = Object.keys(<%= h.changeCase.camelCase(props.name) %>Routes).reduce((map, key) => {
  map[key as keyof <%= h.changeCase.pascalCase(props.name) %>Routes] = <%= h.changeCase.camelCase(props.name) %>Routes[key as keyof <%= h.changeCase.pascalCase(props.name) %>Routes].replace(
    "/api",
    ""
  );
  return map;
}, {} as <%= h.changeCase.pascalCase(props.name) %>Routes);
