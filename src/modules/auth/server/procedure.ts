import { headers as getHeaders } from "next/headers";

import { TRPCError } from "@trpc/server";
import { loginSchema, registerSchema } from "../schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });

    return session;
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingUser = existingData.docs[0];

      if (existingUser)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });

      const tenant = await ctx.db.create({
        collection: "tenants",
        data: {
          name: input.username,
          slug: input.username,
          stripeAccountId: "test",
        },
      });

      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, // This will be hashed by payload
          // It has to be an array as the multi tenant plugin allows a user to own multiple tenant(store) at a time. But for simplicity we allow one user for one tenant.
          tenants: [{ tenant: tenant.id }],
        },
      });

      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });

      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });
    }),
  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });

    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    });

    return data;
  }),
});
