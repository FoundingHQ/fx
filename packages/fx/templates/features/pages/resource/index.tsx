import { SEO } from "@components";
import { use<%= h.changeCase.pascalCase(name) %>List } from "@lib/<%= h.changeCase.camelCase(name) %>/data/<%= h.changeCase.camelCase(name) %>Hooks";

export const ListPage = () => {
  const listResponse = use<%= h.changeCase.pascalCase(name) %>List();
  const list = listResponse?.data?.<%= h.pluralizedCamelCase(name) %> || [];

  return (
    <>
      <SEO title="List" />
      <h1>List</h1>
      {list.map((item: any) => (
        <ul>
        <% Object.keys(attributes).forEach((attributeKey) => { %><li>{item.<%= attributeKey %>}</li><% }) %>
        </ul>
      ))}
    </>
  );
};

export default ListPage;
