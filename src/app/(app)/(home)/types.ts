import { Category } from "@/payload-types";

export type CustomCategory = {
  subcategories: {
    subcategories: undefined;
    id: string;
    name: string;
    slug: string;
    color?: string | null;
    parent?: (string | null) | Category;
    updatedAt: string;
    createdAt: string;
  }[];
  id: string;
  name: string;
  slug: string;
  color?: string | null;
  parent?: (string | null) | Category;
  updatedAt: string;
  createdAt: string;
};
