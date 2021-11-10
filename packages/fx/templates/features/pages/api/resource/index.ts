import { createHandler } from "@server/handler";
import {
  createResource,
  getResource,
  getResources,
  updateResource,
  destroyResource,
} from "@lib/auth/server/resourceService";
import { resourceRoutes } from "@lib/auth/server/resourceConfig";

const handler = createHandler({ attachParams: true });

handler
  .get(resourceRoutes.index, async (_req, res) => {
    const resource = await getResources();
    res.status(200).json({ resource: resource });
  })
  .post(resourceRoutes.create, async (req, res) => {
    const newResource = await createResource(req.resource);
    res.status(200).json({ resource: newResource });
  })
  .get(resourceRoutes.show, async (req, res) => {
    const resource = await getResource(req.resourceId);
    res.status(200).json({ resource });
  })
  .patch(resourceRoutes.update, async (req, res) => {
    const updatedResource = await updateResource(req.resourceId, req.attrs);
    res.status(200).json({ resource: updatedResource });
  })
  .delete(resourceRoutes.destroy, async (req, res) => {
    const deletedResource = await destroyResource(req.resourceId);
    res.status(200).json({ resource: deletedResource });
  });

export default handler;
