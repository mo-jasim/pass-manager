"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaFingerprint } from "react-icons/fa";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <nav className="py-4 max-md:px-2 bg-border text-foreground">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex items-center gap-2">
          <FaFingerprint className="text-[24px]" />
          <Link href={"/"} className="text-[18px] font-[600]">
            Pass Manager
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href={"/Home"} className="text-[18px] font-[400]">
            Home
          </Link>
          <Link href={"/Home"} className="text-[18px] font-[400]">
            About
          </Link>
          <Link href={"/Home"} className="text-[18px] font-[400]">
            Services
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="rounded-full">
              <Button variant="outline" size="icon" className="cursor-pointer">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer" />
                <span className="sr-only cursor-pointer">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer"
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <SignedOut>
            <div className="p-1 px-2 rounded-lg text-white bg-blue-600 transition-colors duration-500 hover:bg-blue-800">
              <SignInButton />
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
