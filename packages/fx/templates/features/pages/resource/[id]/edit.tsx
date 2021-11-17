import { SEO } from "@components";
import <%= h.changeCase.pascalCase(name) %>Form from "@lib/<%= h.changeCase.camelCase(name) %>/components/<%= h.changeCase.pascalCase(name) %>Form";

export const EditPage = () => {
  return (
    <>
      <SEO title="Edit" />
      <h1>Edit</h1>
      <<%= h.changeCase.pascalCase(name) %>Form submitType="update" submitText="Update" />
    </>
  );
};

export default EditPage;
