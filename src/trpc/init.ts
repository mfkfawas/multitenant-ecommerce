import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import superjson from "superjson";

import { initTRPC } from "@trpc/server";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
// extend base procedure using use middleware
export const baseProcedure = t.procedure.use(async ({ next }) => {
  const payload = await getPayload({
    config: configPromise,
  });

  return next({ ctx: { db: payload } });
});
