import z from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import { Category, Media, Tenant } from "@/payload-types";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/contsants";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      // DUMMY SORTS
      if (input.sort === "curated") {
        sort = "-createdAt";
      }
      if (input.sort === "hot_and_new") {
        sort = "+createdAt";
      }
      if (input.sort === "trending") {
        sort = "-createdAt";
      }

      if (input.minPrice && input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
          greater_than_equal: input.minPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            // override as we are not going more than 2 level deep.
            subcategories: undefined,
          })),
        }));

        const subcategoriesSlug = [];
        const parentCategory = formattedData.at(0);

        if (parentCategory) {
          subcategoriesSlug.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );

          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlug],
          };
          // eg:
          // "category.slug": {
          //   "equals": "business-money"
          // }
        }
      }

      if (input.tags?.length) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        //   depth: 1,  NOTE: populate 'category', 'image', 'tenant'  // depth: 0, NOTE: just populate sub ID--- payload's defauly depth is 2
        depth: 2, // NOTE: populate 'category', 'image', 'tenant' and tenant.image (2 step deep for reference) --- default - but we explicitly set for edu
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      // the above `depth` doesnt infer the types to the subs, so lets properly assign the type of the image
      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
