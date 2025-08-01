// for client. --- for server pls refer ../search-params.ts
import {
  useQueryStates,
  parseAsString,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs";

const sortValues = ["curated", "trending", "hot_and_new"] as const;

const params = {
  minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: true })
    .withDefault([]),
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
};

export const useProductFilters = () => {
  return useQueryStates(params);
};
