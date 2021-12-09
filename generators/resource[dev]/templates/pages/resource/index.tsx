import Link from "next/link";

import { use<%= h.changeCase.pascalCase(props.name) %>List } from "@lib/<%= h.changeCase.camelCase(props.name) %>/data/<%= h.changeCase.camelCase(props.name) %>Hooks";

export const ListPage = () => {
  const listResponse = use<%= h.changeCase.pascalCase(props.name) %>List();
  const list = listResponse?.data?.<%= h.pluralizedCamelCase(props.name) %> || [];

  return (
    <>
      <h1>List</h1>
      {list.map((item: any) => (
        <li>
          <Link href={`/<%= h.pluralizedCamelCase(props.name) %>/${item.id}`}>
            <dl>
              <% Object.keys(props.attributes).forEach((attributeKey) => { %><dt><%= attributeKey %></dt><dd>{item.<%= attributeKey %>}</dd><% }) %>
            </dl>
          </Link>
        </li>
      ))}
    </>
  );
};

export default ListPage;
