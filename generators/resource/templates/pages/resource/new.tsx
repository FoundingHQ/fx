import { SEO } from "@components";
import <%= h.changeCase.pascalCase(name) %>Form from "@lib/<%= h.changeCase.camelCase(name) %>/components/<%= h.changeCase.pascalCase(name) %>Form";

export const NewPage = () => {
  return (
    <>
      <SEO title="New" />
      <h1>New</h1>
      <<%= h.changeCase.pascalCase(name) %>Form submitType="create" submitText="Create" />
    </>
  );
};

export default NewPage;
