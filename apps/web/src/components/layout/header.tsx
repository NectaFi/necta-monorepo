"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Connect } from "@/components/shared/connect";
import { Button } from "@/components/ui/button";
import { Settings, Menu } from "lucide-react";
import { MetricsDisplay } from "@/components/earn/metrics-display";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Add scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Earn",
      href: "/earn",
      active: pathname === "/earn",
    },
    {
      name: "Portfolio",
      href: "/earn/dashboard",
      active: pathname === "/earn/dashboard",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-zinc-900/[0.65] backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-white/[0.08] bg-zinc-800/70 text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[180px] bg-zinc-900/95 border border-white/[0.08] p-1 mt-2"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-[15px] transition-colors ${
                      item.active
                        ? "bg-zinc-800/70 text-white/90"
                        : "text-white/60 hover:bg-zinc-800/40 hover:text-white/90"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Logo className="h-8" />

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-1.5 text-[15px] transition-colors ${
                  item.active
                    ? "rounded-full border border-white/[0.08] bg-zinc-800/70 text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm"
                    : "text-white/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <MetricsDisplay tvl="$2,881,080.12" apy="7.61%" />
          <Connect label="Connect" hideBalance={true} />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-white/[0.08] bg-zinc-800/70 text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
