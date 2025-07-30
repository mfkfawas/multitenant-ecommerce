import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { DEFAULT_LIMIT } from "@/contsants";

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        // NOTE: cursor is necessary to support infiniteQueryOptions() on trpc - refer - TagsFilter line 13
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "tags",
        page: input.cursor,
        limit: input.limit,
      });

      return data;
    }),
});
