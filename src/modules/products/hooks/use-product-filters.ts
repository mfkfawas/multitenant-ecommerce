import { useQueryStates } from "nuqs";
import { parseAsString, createLoader } from "nuqs/server";

export const params = {
  minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
};

export const useProductFilters = () => {
  return useQueryStates(params);
};

// for RSC
export const loadProductFilters = createLoader(params);
