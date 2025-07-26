"use client";
import { useState } from "react";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { CategoriesSidebar } from "./categories-sidebar";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          disabled={disabled}
          placeholder="Search Products"
        />
      </div>
      {/* TODO: Add categories view all button */}
      <Button
        className="size-12 shrink-0 flex lg:hidden"
        variant="elevated"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* TODO: Add library button */}

      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
    </div>
  );
};
