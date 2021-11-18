import { SEO } from "@components";
import { use<%= h.changeCase.pascalCase(name) %>List } from "@lib/<%= h.changeCase.camelCase(name) %>/data/<%= h.changeCase.camelCase(name) %>Hooks";

export const ListPage = () => {
  const listResponse = use<%= h.changeCase.pascalCase(name) %>List();
  const list = listResponse?.data?.<%= h.pluralizedCamelCase(name) %> || [];

  return (
    <>
      <SEO title="List" />
      <h1>List</h1>
      <ul>
        {list.map((item: any) => (
          <li>{item.id}</li>
        ))}
      </ul>
    </>
  );
};

export default ListPage;
