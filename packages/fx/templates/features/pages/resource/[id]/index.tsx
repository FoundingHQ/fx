import { useRouter } from "next/router"
import { SEO } from "@components";

import { use<%= h.changeCase.pascalCase(name) %>Show } from "@lib/<%= h.changeCase.camelCase(name) %>/data/<%= h.changeCase.camelCase(name) %>Hooks"

export const ShowPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return null
  }

  return (
    <>
      <SEO title="Show" />
      <h1>Show</h1>
      <Show<%= h.changeCase.pascalCase(name) %> userId={id} />
    </>
  );
};

type Show<%= h.changeCase.pascalCase(name) %>Props = {
  <%= h.changeCase.camelCase(name) %>Id: any;
}

const Show<%= h.changeCase.pascalCase(name) %> = ({ <%= h.changeCase.camelCase(name) %>Id }: Show<%= h.changeCase.pascalCase(name) %>Props) => {
  const res = use<%= h.changeCase.pascalCase(name) %>Show(parseInt(<%= h.changeCase.camelCase(name) %>Id as string));

  return (
    <pre>{JSON.stringify(res, null, 2)}</pre>
  );
};

export default ShowPage;
