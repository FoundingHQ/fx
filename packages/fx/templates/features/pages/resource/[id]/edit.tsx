import { useRouter } from "next/router";
import { SEO } from "@components";

import <%= h.changeCase.pascalCase(name) %>Form from "@lib/<%= h.changeCase.camelCase(name) %>/components/<%= h.changeCase.pascalCase(name) %>Form";

export const EditPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return null
  }

  return (
    <>
      <SEO title="Edit" />
      <h1>Edit</h1>
      <Edit<%= h.changeCase.pascalCase(name) %> <%= h.changeCase.camelCase(name) %>Id={id} />
    </>
  );
};

type Edit<%= h.changeCase.pascalCase(name) %>Props = {
  <%= h.changeCase.camelCase(name) %>Id: any;
}

const Edit<%= h.changeCase.pascalCase(name) %> = ({ <%= h.changeCase.camelCase(name) %>Id }: Edit<%= h.changeCase.pascalCase(name) %>Props) => {
  return (
    <<%= h.changeCase.pascalCase(name) %>Form <%= h.changeCase.camelCase(name) %>Id={parseInt(<%= h.changeCase.camelCase(name) %>Id)} submitType="update" submitText="Update" />
  );
};

export default EditPage;
