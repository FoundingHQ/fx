import createHandler from "@api/handler";
import {
  create<%= h.changeCase.pascalCase(props.name) %>,
  get<%= h.changeCase.pascalCase(props.name) %>List,
} from "@lib/<%= h.changeCase.camelCase(props.name) %>/api/<%= h.changeCase.camelCase(props.name) %>Service";

const handler = createHandler({ attachParams: true });

handler
  .get(async (_req, res) => {
    const <%= h.pluralizedCamelCase(props.name) %> = await get<%= h.changeCase.pascalCase(props.name) %>List();
    res.status(200).json({ <%= h.pluralizedCamelCase(props.name) %>: <%= h.pluralizedCamelCase(props.name) %> });
  })
  .post(async (req: any, res) => {
    const new<%= h.changeCase.pascalCase(props.name) %> = await create<%= h.changeCase.pascalCase(props.name) %>(req.body);
    res.status(200).json({ <%= h.changeCase.camelCase(props.name) %>: new<%= h.changeCase.pascalCase(props.name) %> });
  })

export default handler;
