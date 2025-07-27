import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedure";
import { authRouter } from "@/modules/auth/server/procedure";
import { productsRouter } from "@/modules/products/server/procedure";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
  products: productsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
