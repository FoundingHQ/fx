export const resourceRoutes = {
  index: "/api/<%= h.inflection.pluralize(name) %>",
  create: "/api/<%= h.inflection.pluralize(name) %>",
  show: "/api/<%= h.inflection.pluralize(name) %>/:id",
  update: "/api/<%= h.inflection.pluralize(name) %>",
  destroy: "/api/<%= h.inflection.pluralize(name) %>",
};
