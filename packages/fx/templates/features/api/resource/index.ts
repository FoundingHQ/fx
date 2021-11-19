import createHandler from "@server/handler";
import {
  create<%= h.changeCase.pascalCase(name) %>,
  get<%= h.changeCase.pascalCase(name) %>List,
} from "@lib/<%= h.changeCase.camelCase(name) %>/server/<%= h.changeCase.camelCase(name) %>Service";

const handler = createHandler({ attachParams: true });

handler
  .get(async (_req, res) => {
    const <%= h.pluralizedCamelCase(name) %> = await get<%= h.changeCase.pascalCase(name) %>List();
    res.status(200).json({ <%= h.pluralizedCamelCase(name) %>: <%= h.pluralizedCamelCase(name) %> });
  })
  .post(async (req: any, res) => {
    const new<%= h.changeCase.pascalCase(name) %> = await create<%= h.changeCase.pascalCase(name) %>(req.body);
    res.status(200).json({ <%= h.changeCase.camelCase(name) %>: new<%= h.changeCase.pascalCase(name) %> });
  })

export default handler;
