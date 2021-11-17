import { SEO } from "@components";
import { use<%= h.changeCase.pascalCase(name) %>List } from "@lib/<%= h.changeCase.camelCase(name) %>/data/<%= h.changeCase.camelCase(name) %>Hooks.ts";

export const ListPage = () => {
  const list = use<%= h.changeCase.pascalCase(name) %>ListPage();
  console.log("list", list);

  return (
    <>
      <SEO title="List" />
      <h1>List</h1>
    </>
  );
};

export default ListPage;
