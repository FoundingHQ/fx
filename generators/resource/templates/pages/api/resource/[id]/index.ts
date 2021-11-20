import createHandler from "@server/handler";
import {
  get<%= h.changeCase.pascalCase(name) %>,
  update<%= h.changeCase.pascalCase(name) %>,
  delete<%= h.changeCase.pascalCase(name) %>,
} from "@lib/<%= h.changeCase.camelCase(name) %>/server/<%= h.changeCase.camelCase(name) %>Service";

const handler = createHandler({ attachParams: true });

handler
  .get(async (req: any, res) => {
    const <%= h.changeCase.camelCase(name) %> = await get<%= h.changeCase.pascalCase(name) %>({ id: parseInt(req.query.id) });
    res.status(200).json({ <%= h.changeCase.camelCase(name) %> });
  })
  .patch(async (req: any, res) => {
    const updated<%= h.changeCase.pascalCase(name) %> = await update<%= h.changeCase.pascalCase(name) %>(req.body);
    res.status(200).json({ <%= h.changeCase.camelCase(name) %>: updated<%= h.changeCase.pascalCase(name) %> });
  })
  .delete(async (req: any, res) => {
    const deleted<%= h.changeCase.pascalCase(name) %> = await delete<%= h.changeCase.pascalCase(name) %>({id: parseInt(req.query.id) });
    res.status(200).json({ <%= h.changeCase.camelCase(name) %>: deleted<%= h.changeCase.pascalCase(name) %> });
  });

export default handler;
