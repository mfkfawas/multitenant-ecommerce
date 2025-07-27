import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      // depth: 0, NOTE: just populate subcategories ID
      depth: 1, // NOTE: populate entire subcategories field. we dont need to specify it explicitly but for edu purpose let me keep it here. Also subcategories.[0] will be type of "Category"
      pagination: false, // NOTE: we dont have lot of categories and we need to load all categories.
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Because of "depth: 1" we are confident "doc" will be a type of Category
        ...(doc as Category),
        // override as we are not going more than 2 level deep.
        subcategories: undefined,
      })),
    }));

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    return formattedData;
  }),
});
