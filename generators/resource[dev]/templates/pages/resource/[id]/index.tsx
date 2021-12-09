import { useRouter } from "next/router"
import Link from "next/link";

import { use<%= h.changeCase.pascalCase(props.name) %>Show } from "@lib/<%= h.changeCase.camelCase(props.name) %>/data/<%= h.changeCase.camelCase(props.name) %>Hooks"

const ShowPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return null
  }

  return (
    <>
      <h1>Show</h1>
      <Show id={id} />
    </>
  );
};

const Show = ({ id }: { id: string }) => {
  const res = use<%= h.changeCase.pascalCase(props.name) %>Show(parseInt(id as string));
  const { data } = res;
  const <%= h.changeCase.camelCase(props.name) %> = data?.<%= h.changeCase.camelCase(props.name) %>;

  return (
    <>
      <dl>
        <% Object.keys(props.attributes).forEach((attributeKey) => { %><dt><%= attributeKey %></dt><dd>{<%= h.changeCase.camelCase(props.name) %>?.<%= attributeKey %>}</dd><% }) %>
      </dl>
      <ul>
        <li><Link href={`/<%= h.pluralizedCamelCase(props.name) %>/${id}/edit`}>Edit</Link></li>
        <li><Link href="/<%= h.pluralizedCamelCase(props.name) %>">List</Link></li>
      </ul>
    </>
  );
};

export default ShowPage;
