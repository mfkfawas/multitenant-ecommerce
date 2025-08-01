"use client";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";

import { NavbarSidebar } from "./navbar-sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

interface NavbarItemProps {
  children: ReactNode;
  href: string;
  isActive?: boolean;
}

const NavbarItem = ({ children, href, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full border-transparent hover:border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 bg-white border-b font-medium flex justify-between">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      <NavbarSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        items={navbarItems}
      />

      <div className="hidden lg:flex items-center gap-4">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-r-0 border-b-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link href="/admin">Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-r-0 border-b-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-r-0 border-b-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link href="/sign-up">Start Selling</Link>
          </Button>
        </div>
      )}

      <div className="flex justify-center items-center lg:hidden">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isSidebarOpen}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
