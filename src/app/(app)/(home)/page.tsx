import { getQueryClient, trpc } from "@/trpc/server";

export default async function Page() {
  const queryClient = getQueryClient();
  const categories = await queryClient.fetchQuery(
    trpc.categories.getMany.queryOptions()
  );

  return <div className="">{JSON.stringify(categories, null, 2)}</div>;
}
