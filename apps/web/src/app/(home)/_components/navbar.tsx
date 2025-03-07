"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { NAVBAR_MENU } from "@/lib/constants";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto max-w-[1150px] px-4 transition-all duration-300"
    >
      <nav className="flex h-12 items-center justify-between rounded-[24px] bg-white/80 shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] ring-1 ring-black/[0.08] backdrop-blur-md md:h-[64px]">
        <div className="flex items-center">
          <Logo className="px-4" />
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <ul className="flex items-center space-x-8">
            {NAVBAR_MENU.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="font-medium text-[#23191A]/80 text-[16px] transition-colors hover:text-[#F29600]"
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center px-2.5">
          <Link
            href="/app"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "default",
                className:
                  "rounded-[20px] bg-[#F29600] px-4 font-medium text-[16px] text-white hover:bg-[#F29600]/80 h-8 md:h-[44px] my-2",
              }),
            )}
          >
            LAUNCH APP
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
