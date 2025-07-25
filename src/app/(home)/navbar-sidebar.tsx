import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ReactNode } from "react";

interface NavbarItem {
  href: string;
  children: ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0" side="left">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center w-full p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onChange={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}

          <div className="border-t">
            <Link
              href="/sign-in"
              className="flex items-center w-full p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onChange={() => onOpenChange(false)}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center w-full p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onChange={() => onOpenChange(false)}
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
