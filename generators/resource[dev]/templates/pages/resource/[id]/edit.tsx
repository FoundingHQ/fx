import { useRouter } from "next/router";
import Link from "next/link";

import <%= h.changeCase.pascalCase(props.name) %>Form from "@lib/<%= h.changeCase.camelCase(props.name) %>/components/<%= h.changeCase.pascalCase(props.name) %>Form";
import { use<%= h.changeCase.pascalCase(props.name) %>Show, use<%= h.changeCase.pascalCase(props.name) %>Destroy } from "@lib/user/data/<%= h.changeCase.camelCase(props.name) %>Hooks";

const EditPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return null
  }

  return (
    <>
      <h1>Edit</h1>
      <Edit id={id} />
    </>
  );
};

const Edit = ({ id }: { id: string }) => {
  const res = use<%= h.changeCase.pascalCase(props.name) %>Show(parseInt(id as string));
  const { data } = res;
  const <%= h.changeCase.camelCase(props.name) %> = data?.<%= h.changeCase.camelCase(props.name) %>;

  const { mutate: destroy } = use<%= h.changeCase.pascalCase(props.name) %>Destroy((res: any) => {
    console.log("res", res);
  });

  const handleClick = () => {
    destroy({ id });
  };

  const initialValues = {
    <% Object.keys(props.attributes).forEach((attribute) => { %><%= attribute %>: <%= h.changeCase.camelCase(props.name) %>?.<%= attribute %>,<% }) %>
  };

  return (
    <>
      <<%= h.changeCase.pascalCase(props.name) %>Form <%= h.changeCase.camelCase(props.name) %>Id={parseInt(id)} submitType="update" submitText="Update" initialValues={initialValues} />
      <ul>
        <li><Link href={`/<%= h.pluralizedCamelCase(props.name) %>/${id}`}>Show</Link></li>
        <li><button onClick={handleClick}>Destroy</button></li>
      </ul>
    </>
  );
};

export default EditPage;
