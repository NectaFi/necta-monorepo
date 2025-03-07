"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PortfolioHero() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      {/* Left Section */}
      <div className="flex flex-col justify-center space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Your Portfolio Overview
          </h1>
          <p className="mt-4 text-xl text-white/70">
            Currently earning up to <span className="text-[#4CAF50] font-semibold">7.81% APY*</span>
          </p>
          <p className="mt-2 text-sm text-white/50">
            *Average APY across all active positions
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => router.push("/earn")}
            className="rounded-full border border-white/[0.08] bg-zinc-800/70 px-4 py-2 text-[15px] text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm flex items-center gap-2"
          >
            Explore More Opportunities
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative hidden md:block">
        {/* Add portfolio stats or graph here */}
      </div>
    </div>
  );
}
