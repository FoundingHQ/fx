import { useRouter } from "next/router";
import Link from "next/link";

import { SEO } from "@components";
import <%= h.changeCase.pascalCase(name) %>Form from "@lib/<%= h.changeCase.camelCase(name) %>/components/<%= h.changeCase.pascalCase(name) %>Form";
import { use<%= h.changeCase.pascalCase(name) %>Show, use<%= h.changeCase.pascalCase(name) %>Destroy } from "@lib/user/data/<%= h.changeCase.camelCase(name) %>Hooks";

const EditPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return null
  }

  return (
    <>
      <SEO title="Edit" />
      <h1>Edit</h1>
      <Edit id={id} />
    </>
  );
};

const Edit = ({ id }: { id: string }) => {
  const res = use<%= h.changeCase.pascalCase(name) %>Show(parseInt(id as string));
  const { data } = res;
  const <%= h.changeCase.camelCase(name) %> = data?.<%= h.changeCase.camelCase(name) %>;

  const { mutate: destroy } = use<%= h.changeCase.pascalCase(name) %>Destroy((res: any) => {
    console.log("res", res);
  });

  const handleClick = () => {
    destroy({ id });
  };

  const initialValues = {
    <% Object.keys(attributes).forEach((attribute) => { %><%= attribute %>: <%= h.changeCase.camelCase(name) %>?.<%= attribute %>,<% }) %>
  };

  return (
    <>
      <<%= h.changeCase.pascalCase(name) %>Form <%= h.changeCase.camelCase(name) %>Id={parseInt(id)} submitType="update" submitText="Update" initialValues={initialValues} />
      <ul>
        <li><Link href={`/<%= h.pluralizedCamelCase(name) %>/${id}`}>Show</Link></li>
        <li><button onClick={handleClick}>Destroy</button></li>
      </ul>
    </>
  );
};

export default EditPage;
