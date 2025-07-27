import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

// export type Inputs = inferRouterInputs<AppRouter>;
// export type Outputs = inferRouterOutputs<AppRouter>;

export type ProductsGetManyOutput =
  inferRouterOutputs<AppRouter>["products"]["getMany"];
