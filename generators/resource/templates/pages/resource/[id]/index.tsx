import { useRouter } from "next/router"
import Link from "next/link";

import { SEO } from "@components";
import { use<%= h.changeCase.pascalCase(name) %>Show } from "@lib/<%= h.changeCase.camelCase(name) %>/data/<%= h.changeCase.camelCase(name) %>Hooks"

const ShowPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return null
  }

  return (
    <>
      <SEO title="Show" />
      <h1>Show</h1>
      <Show id={id} />
    </>
  );
};

const Show = ({ id }: { id: string }) => {
  const res = use<%= h.changeCase.pascalCase(name) %>Show(parseInt(id as string));
  const { data } = res;
  const <%= h.changeCase.camelCase(name) %> = data?.<%= h.changeCase.camelCase(name) %>;

  return (
    <>
      <dl>
        <% Object.keys(attributes).forEach((attributeKey) => { %><dt><%= attributeKey %></dt><dd>{<%= h.changeCase.camelCase(name) %>?.<%= attributeKey %>}</dd><% }) %>
      </dl>
      <ul>
        <li><Link href={`/<%= h.pluralizedCamelCase(name) %>/${id}/edit`}>Edit</Link></li>
        <li><Link href="/<%= h.pluralizedCamelCase(name) %>">List</Link></li>
      </ul>
    </>
  );
};

export default ShowPage;
