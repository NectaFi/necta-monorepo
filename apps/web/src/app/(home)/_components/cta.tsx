"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#101010] py-16 lg:py-24">
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1a1a1a] via-black to-[#0a0a0a] p-8 py-16 text-center shadow-xl md:p-16 md:py-24">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F29600]/20 via-transparent to-transparent opacity-80" />

          {/* Glow effect */}
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#F29600]/20 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#F29600]/10 blur-[100px]" />

          <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center">
            <h2 className="font-sans font-semibold text-4xl text-white sm:text-5xl md:text-5xl">
              Automate. Optimize. Earn.
            </h2>
            <p className="mt-6 max-w-[85%] text-lg text-white/70 leading-relaxed sm:text-xl">
            Deploy an intelligent agent to monitor and rebalance your assets 24/7—maximizing yields with full self-custody.
            </p>
            <div className="mt-10">
              <Link href="/app">
                <Button className="group relative rounded-full bg-gradient-to-r from-[#F29600] to-[#F29600]/90 px-8 py-6 font-medium text-lg text-white shadow-[0_4px_16px_rgba(242,150,0,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(242,150,0,0.5)] active:scale-[0.98]">
                  LAUNCH AGENT
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
