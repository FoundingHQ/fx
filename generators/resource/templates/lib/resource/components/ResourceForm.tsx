import { useRouter } from "next/router";

import { use<%= h.changeCase.pascalCase(name) %>Create, use<%= h.changeCase.pascalCase(name) %>Update } from "@lib/user/data/<%= h.changeCase.camelCase(name) %>Hooks";
import { <%= h.changeCase.pascalCase(name) %> } from "@prisma/client"

type <%= h.changeCase.pascalCase(name) %>FormProps = {
  <%= h.changeCase.camelCase(name) %>Id?: <%= h.changeCase.pascalCase(name) %>["id"];
  submitType: "create" | "update";
  submitText: string;
  initialValues?: any;
}

export const <%= h.changeCase.pascalCase(name) %>Form = ({
  <%= h.changeCase.camelCase(name) %>Id,
  submitType,
  submitText,
  initialValues,
}: <%= h.changeCase.pascalCase(name) %>FormProps) => {
  const router = useRouter();

  const { mutate: create } = use<%= h.changeCase.pascalCase(name) %>Create(() => {
    router.push("/<%= h.pluralizedCamelCase(name) %>");
  });
  const { mutate: update } = use<%= h.changeCase.pascalCase(name) %>Update(() => {
    router.push("/<%= h.pluralizedCamelCase(name) %>");
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-expect-error
    const { <%= Object.keys(attributes).join(", ") %> } = e.currentTarget.elements;

    if (submitType === "create") {
      create({<% Object.keys(props.attributes).forEach((attr) => { %><%= attr %>: <%= attr %>.value,<% }) %>});
      return;
    }

    if (userId) {
      update({ id: <%= h.changeCase.camelCase(name) %>Id,<% Object.keys(props.attributes).forEach((attr) => { %><%= attr %>: <%= attr %>.value,<% }) %>});
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <% Object.keys(props.attributes).forEach((attributeKey) => { %><input name ="<%= attributeKey %>" type="text" placeholder="<%= h.changeCase.pascalCase(attributeKey) %>" value={initialValues?.<%= attributeKey %>} /><% }) %>
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default <%= h.changeCase.pascalCase(name) %>Form;
