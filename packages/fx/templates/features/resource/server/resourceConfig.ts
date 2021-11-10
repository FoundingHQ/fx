export const resourceRoutes = {
  index: "/api/<%= h.changeCase.camelCase(h.inflection.pluralize(name)) %>",
  create: "/api/<%= h.changeCase.camelCase(h.inflection.pluralize(name)) %>",
  show: "/api/<%= h.changeCase.camelCase(h.inflection.pluralize(name)) %>/:id",
  update: "/api/<%= h.changeCase.camelCase(h.inflection.pluralize(name)) %>/:id",
  destroy: "/api/<%=h.changeCase.camelCase(h.inflection.pluralize(name)) %>",
};
