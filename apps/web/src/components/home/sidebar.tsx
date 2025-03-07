"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { dashboardNavItems } from "@/lib/constants";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWindow } from "@/hooks/use-window";
import { Connect } from "../shared/connect";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const { isMobile } = useWindow();

  // Auto collapse on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [pathname, isMobile]);

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside className={cn(
        "fixed top-0 bottom-0 left-0 z-40 w-[280px] bg-zinc-900/[0.65] backdrop-blur-md transition-all duration-300 border-r border-white/[0.08]",
        isCollapsed ? "-translate-x-full" : "translate-x-0",
        "lg:translate-x-0",
        className
      )}>
        <div className="flex h-full flex-col">
          {/* Sidebar Header with Logo */}
          <div className="flex h-[88px] items-center justify-between px-6 border-b border-white/[0.08]">
            <Logo variant="dark" className="h-8 w-auto" />
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsCollapsed(true)}
              >
                <ChevronLeft className="h-5 w-5 text-white/60" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {dashboardNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setIsCollapsed(true)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                    isActive
                      ? "bg-[#F29600]/10 text-[#F29600]"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-base font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Connect Button - Bottom */}
          <div className="p-4 border-t border-white/[0.08]">
            <Connect />
          </div>
        </div>
      </aside>

      {/* Toggle Button - Fixed on mobile */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "fixed top-6 left-6 z-50 h-12 w-12 rounded-full border-white/10 bg-zinc-900/90 backdrop-blur-md lg:hidden",
            !isCollapsed && "hidden"
          )}
          onClick={() => setIsCollapsed(false)}
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>
      )}
    </>
  );
}
