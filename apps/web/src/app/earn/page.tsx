"use client";

import { OpportunityList } from "@/components/earn/opportunity-list";
import { HeroSection } from "@/components/earn/hero-section";
import { useEffect, useState } from "react";

// Mock data for opportunities
const mockOpportunities = [
  {
    id: "1",
    name: "USDC Yield Strategy",
    protocol: "Aave",
    description: "Stable yield from lending USDC on Aave with automatic reinvestment.",
    apy: 4.5,
    risk: "Low",
    tvl: 5000000,
    asset: "USDC",
  },
  {
    id: "2",
    name: "ETH Staking",
    protocol: "Lido",
    description: "Liquid staking solution for ETH with competitive yields.",
    apy: 3.8,
    risk: "Low",
    tvl: 12000000,
    asset: "ETH",
  },
  {
    id: "3",
    name: "BTC Yield Strategy",
    protocol: "Curve",
    description: "Earn yield on BTC through optimized Curve pool strategies.",
    apy: 5.2,
    risk: "Medium",
    tvl: 8000000,
    asset: "BTC",
  },
  {
    id: "4",
    name: "Stablecoin Diversification",
    protocol: "Compound",
    description: "Diversified stablecoin lending across multiple protocols.",
    apy: 6.1,
    risk: "Medium",
    tvl: 3500000,
    asset: "USDC/DAI/USDT",
  },
  {
    id: "5",
    name: "ETH-BTC LP Strategy",
    protocol: "Uniswap",
    description: "Liquidity provision for ETH-BTC pair with fee optimization.",
    apy: 8.5,
    risk: "High",
    tvl: 2800000,
    asset: "ETH-BTC",
  },
  {
    id: "6",
    name: "Yield Optimizer",
    protocol: "Yearn",
    description: "Automated yield farming strategy with protocol diversification.",
    apy: 7.2,
    risk: "Medium",
    tvl: 4200000,
    asset: "USDC",
  },
];

export default function EarnPage() {
  return (
    <div className="mx-auto space-y-16">
      {/* Hero Section - No card, directly on background */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div>

      {/* Opportunities Section Card */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/[0.08] bg-zinc-900 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="px-6 md:px-8 py-6 md:py-8">
            <h2 className="text-2xl font-bold text-white mb-6">Available Opportunities</h2>
            <OpportunityList opportunities={mockOpportunities} />
          </div>
        </div>
      </div>
    </div>
  );
}
