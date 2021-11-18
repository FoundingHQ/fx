import { use<%= h.changeCase.pascalCase(name) %>Create, use<%= h.changeCase.pascalCase(name) %>Update } from "../data/<%= h.changeCase.camelCase(name) %>Hooks";

type <%= h.changeCase.pascalCase(name) %>FormProps = {
  submitType: "create" | "update";
  submitText: string;
}

export const <%= h.changeCase.pascalCase(name) %>Form = ({
  submitType,
  submitText
}: <%= h.changeCase.pascalCase(name) %>FormProps) => {
  const { mutate: create } = use<%= h.changeCase.pascalCase(name) %>Create((res: any) => {
    console.log("res", res);
  });
  const { mutate: update } = use<%= h.changeCase.pascalCase(name) %>Update((res: any) => {
    console.log("res", res);
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-expect-error
    const { <%= h.destructureAttributes(attributes) %> } = e.currentTarget.elements;
    const action = submitType === "create" ? create : update;

    action({<% Object.keys(attributes).forEach((attr) => { %><%= attr %>: <%= attr %>.value,<% }) %>});
  };

  return (
    <form onSubmit={handleSubmit}>
      <% Object.keys(attributes).forEach((attributeKey) => { %><input name ="<%= attributeKey %>" type="text" placeholder="<%= h.changeCase.pascalCase(attributeKey) %>" /><% }) %>
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default <%= h.changeCase.pascalCase(name) %>Form;
