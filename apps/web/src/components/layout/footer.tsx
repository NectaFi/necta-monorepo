"use client";

import Link from "next/link";
import { APP_LINKS, APP_SOCIALS } from "@/lib/constants";

export function AppFooter() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-zinc-900/30 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} NectaFi. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            {APP_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[16px] text-white/60 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {APP_SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
