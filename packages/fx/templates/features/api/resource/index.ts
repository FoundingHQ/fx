import createHandler from "@server/handler";
import {
  create<%= h.changeCase.pascalCase(name) %>,
  get<%= h.changeCase.pascalCase(name) %>,
  get<%= h.changeCase.pascalCase(name) %>List,
  update<%= h.changeCase.pascalCase(name) %>,
  delete<%= h.changeCase.pascalCase(name) %>,
} from "@lib/auth/server/<%= h.changeCase.camelCase(name) %>Service";
import { <%= h.changeCase.camelCase(name) %>Routes } from "@lib/auth/server/<%= h.changeCase.camelCase(name) %>Config";

const handler = createHandler({ attachParams: true });

handler
  .get(<%= h.changeCase.camelCase(name) %>Routes.index, async (_req, res) => {
    const <%= h.changeCase.camelCase(name) %> = await get<%= h.changeCase.pascalCase(name) %>List();
    res.status(200).json({ <%= h.changeCase.camelCase(name) %>: <%= h.changeCase.camelCase(name) %> });
  })
  .post(<%= h.changeCase.camelCase(name) %>Routes.create, async (req, res) => {
    const new<%= h.changeCase.camelCase(name) %> = await create<%= h.changeCase.pascalCase(name) %>(req.resource);
    res.status(200).json({ <%= h.changeCase.camelCase(name) %>: new<%= h.changeCase.camelCase(name) %> });
  })
  .get(<%= h.changeCase.camelCase(name) %>Routes.show, async (req, res) => {
    const <%= h.changeCase.camelCase(name) %> = await get<%= h.changeCase.pascalCase(name) %>(req.resourceId);
    res.status(200).json({ <%= h.changeCase.camelCase(name) %> });
  })
  .patch(<%= h.changeCase.camelCase(name) %>Routes.update, async (req, res) => {
    const updated<%= h.changeCase.camelCase(name) %> = await update<%= h.changeCase.pascalCase(name) %>(req.resourceId, req.attrs);
    res.status(200).json({ <%= h.changeCase.camelCase(name) %>: updated<%= h.changeCase.camelCase(name) %> });
  })
  .delete(<%= h.changeCase.camelCase(name) %>Routes.destroy, async (req, res) => {
    const deleted<%= h.changeCase.camelCase(name) %> = await delete<%= h.changeCase.pascalCase(name) %>(req.resourceId);
    res.status(200).json({ <%= h.changeCase.camelCase(name) %>: deleted<%= h.changeCase.camelCase(name) %> });
  });

export default handler;
