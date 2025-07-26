import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

// export type Inputs = inferRouterInputs<AppRouter>;
// export type Outputs = inferRouterOutputs<AppRouter>;

export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
