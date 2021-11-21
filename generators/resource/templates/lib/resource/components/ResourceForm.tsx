import { useRouter } from "next/router";

import { use<%= h.changeCase.pascalCase(props.name) %>Create, use<%= h.changeCase.pascalCase(props.name) %>Update } from "@lib/user/data/<%= h.changeCase.camelCase(props.name) %>Hooks";
import { <%= h.changeCase.pascalCase(props.name) %> } from "@prisma/client"

type <%= h.changeCase.pascalCase(props.name) %>FormProps = {
  <%= h.changeCase.camelCase(props.name) %>Id?: <%= h.changeCase.pascalCase(props.name) %>["id"];
  submitType: "create" | "update";
  submitText: string;
  initialValues?: any;
}

export const <%= h.changeCase.pascalCase(props.name) %>Form = ({
  <%= h.changeCase.camelCase(props.name) %>Id,
  submitType,
  submitText,
  initialValues,
}: <%= h.changeCase.pascalCase(props.name) %>FormProps) => {
  const router = useRouter();

  const { mutate: create } = use<%= h.changeCase.pascalCase(props.name) %>Create(() => {
    router.push("/<%= h.pluralizedCamelCase(props.name) %>");
  });
  const { mutate: update } = use<%= h.changeCase.pascalCase(props.name) %>Update(() => {
    router.push("/<%= h.pluralizedCamelCase(props.name) %>");
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-expect-error
    const { <%= Object.keys(props.attributes).join(", ") %> } = e.currentTarget.elements;

    if (submitType === "create") {
      create({<% Object.keys(props.attributes).forEach((attr) => { %><%= attr %>: <%= attr %>.value,<% }) %>});
      return;
    }

    if (userId) {
      update({ id: <%= h.changeCase.camelCase(props.name) %>Id,<% Object.keys(props.attributes).forEach((attr) => { %><%= attr %>: <%= attr %>.value,<% }) %>});
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

export default <%= h.changeCase.pascalCase(props.name) %>Form;
