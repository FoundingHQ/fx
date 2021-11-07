import { createHandler } from "@server/handler";
import {
  createResource,
  getResource,
  getResources,
  updateResource,
  destroyResource,
} from "@lib/auth/server/resourcesService";
import { resourcesRoutes } from "@lib/auth/server/resourcesConfig";

const handler = createHandler({ attachParams: true });

handler
  .get(resourcesRoutes.index, async (_req, res) => {
    const resources = await getResources();
    res.status(200).json({ resources: resources });
  })
  .post(resourcesRoutes.create, async (req, res) => {
    const newResource = await createResource(req.resource);
    res.status(200).json({ resource: newResource });
  })
  .get(resourcesRoutes.show, async (req, res) => {
    const resource = await getResource(req.resourceId);
    res.status(200).json({ resource });
  })
  .patch(resourcesRoutes.update, async (req, res) => {
    const updatedResource = await updateResource(req.resourceId, req.attrs);
    res.status(200).json({ resource: updatedResource });
  })
  .delete(resourcesRoutes.destroy, async (req, res) => {
    const deletedResource = await destroyResource(req.resourceId);
    res.status(200).json({ resource: deletedResource });
  });

export default handler;
