import <%= h.changeCase.pascalCase(props.name) %>Form from "@lib/<%= h.changeCase.camelCase(props.name) %>/ui/<%= h.changeCase.pascalCase(props.name) %>Form";

export const NewPage = () => {
  return (
    <>
      <h1>New</h1>
      <<%= h.changeCase.pascalCase(props.name) %>Form submitType="create" submitText="Create" />
    </>
  );
};

export default NewPage;
