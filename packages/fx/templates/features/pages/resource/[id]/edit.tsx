import { useRouter } from "next/router";
import { SEO } from "@components";

import <%= h.changeCase.pascalCase(name) %>Form from "@lib/<%= h.changeCase.camelCase(name) %>/components/<%= h.changeCase.pascalCase(name) %>Form";
import { use<%= h.changeCase.pascalCase(name) %>Destroy } from "@lib/user/data/<%= h.changeCase.camelCase(name) %>Hooks";

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
  const { mutate: destroy } = use<%= h.changeCase.pascalCase(name) %>Destroy((res: any) => {
    console.log("res", res);
  });

  const handleClick = () => {
    destroy({ id: <%= h.changeCase.camelCase(name) %>Id });
  };

  return (
    <>
      <<%= h.changeCase.pascalCase(name) %>Form <%= h.changeCase.camelCase(name) %>Id={parseInt(<%= h.changeCase.camelCase(name) %>Id)} submitType="update" submitText="Update" />
      <button onClick={handleClick}>Destroy</button>
    </>
  );
};

export default EditPage;
