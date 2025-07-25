import configPromise from "@payload-config";
import { getPayload } from "payload";

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    // depth: 0, NOTE: just populate subcategories ID
    depth: 1, // NOTE: populate entire subcategories field. we dont need to specify it explicitly but for edu purpose let me keep it here.
    where: {
      parent: {
        exists: false,
      },
    },
  });

  return Response.json(data);
};
