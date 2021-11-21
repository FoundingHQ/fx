import createHandler from "@server/handler";
import {
  get<%= h.changeCase.pascalCase(props.name) %>,
  update<%= h.changeCase.pascalCase(props.name) %>,
  delete<%= h.changeCase.pascalCase(props.name) %>,
} from "@lib/<%= h.changeCase.camelCase(props.name) %>/server/<%= h.changeCase.camelCase(props.name) %>Service";

const handler = createHandler({ attachParams: true });

handler
  .get(async (req: any, res) => {
    const <%= h.changeCase.camelCase(props.name) %> = await get<%= h.changeCase.pascalCase(props.name) %>({ id: parseInt(req.query.id) });
    res.status(200).json({ <%= h.changeCase.camelCase(props.name) %> });
  })
  .patch(async (req: any, res) => {
    const updated<%= h.changeCase.pascalCase(props.name) %> = await update<%= h.changeCase.pascalCase(props.name) %>(req.body);
    res.status(200).json({ <%= h.changeCase.camelCase(props.name) %>: updated<%= h.changeCase.pascalCase(props.name) %> });
  })
  .delete(async (req: any, res) => {
    const deleted<%= h.changeCase.pascalCase(props.name) %> = await delete<%= h.changeCase.pascalCase(props.name) %>({id: parseInt(req.query.id) });
    res.status(200).json({ <%= h.changeCase.camelCase(props.name) %>: deleted<%= h.changeCase.pascalCase(props.name) %> });
  });

export default handler;
