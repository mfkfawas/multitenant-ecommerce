"use client";

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useProductFilters } from "../../hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/contsants";
import { Button } from "@/components/ui/button";

interface Props {
  category?: string;
}

export const ProductList = ({ category }: Props) => {
  const [filters] = useProductFilters();
  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          category,
          ...filters,
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) =>
            !!lastPage.docs.length ? lastPage.nextPage : undefined,
        }
      )
    );

  if (!data.pages.at(0)?.docs.length) {
    return <div>No products...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              price={product.price}
              authorUsername="Fawaz"
              authorImageUrl={undefined}
              reviewCount={3}
              reviewRating={3}
            />
          ))}
      </div>

      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium text-base disabled:opacity-50 bg-white"
            variant="elevated"
          >
            Load More...
          </Button>
        )}
      </div>
    </>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
