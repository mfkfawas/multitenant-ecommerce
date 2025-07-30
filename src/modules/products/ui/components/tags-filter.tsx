import { LoaderIcon } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/contsants";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface TagsFilterProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: TagsFilterProps) => {
  const trpc = useTRPC();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) =>
            // payload supports inbuild pagination
            lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
        }
      )
    );

  if (isLoading)
    return (
      <div className="p-4 grid place-items-center">
        <LoaderIcon className="size-4 animate-spin" />
      </div>
    );

  const onClick = (tag: string) => {
    if (value.includes(tag)) onChange(value.filter((t) => t !== tag));
    else onChange([...(value || []), tag]);
  };

  return (
    <div className="flex flex-col gap-y-2">
      {data?.pages.map((page) =>
        page.docs.map((tag) => (
          <div
            key={tag.id}
            className="flex justify-between items-center cursor-pointer"
            onClick={() => onClick(tag.name)}
          >
            <Label className="font-medium text-base">{tag.name}</Label>
            <Checkbox checked={value.includes(tag.name)} />
          </div>
        ))
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="underline font-medium justify-start text-start disabled:opacity-50 cursor-pointer"
        >
          Load More...
        </button>
      )}
    </div>
  );
};
