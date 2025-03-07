"use client";

interface MetricsDisplayProps {
  tvl: string;
  apy: string;
}

export function MetricsDisplay({ tvl, apy }: MetricsDisplayProps) {
  return (
    <div className="hidden lg:flex items-center space-x-3">
      <div className="flex items-center rounded-full border border-white/[0.08] bg-zinc-800/70 px-3 py-1 text-sm text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm">
        <span className="text-white/60 mr-1">TVL</span>
        {tvl}
      </div>
      <div className="flex items-center rounded-full border border-white/[0.08] bg-zinc-800/70 px-3 py-1 text-sm text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm">
        <span className="text-white/60 mr-1">APY</span>
        {apy}
      </div>
    </div>
  );
}
