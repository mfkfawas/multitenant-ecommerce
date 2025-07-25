import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";

interface Props {
  data: Category[];
}

export const Categories = ({ data }: Props) => {
  return (
    <div className="flex flex-nowrap items-center">
      {data.map((category) => (
        <CategoryDropdown
          key={category.id}
          category={category}
          isActive={false}
          isNavigationHovered={false}
        />
      ))}
    </div>
  );
};
