"use client";

import { PositionsList } from "@/components/dashboard/positions-list";
import { PortfolioHero } from "@/components/dashboard/portfolio-hero";
import { useEffect, useState } from "react";

// Mock data for positions
const mockPositions = [
  {
    id: "1",
    name: "USDC Yield Strategy",
    protocol: "Aave",
    description: "Stable yield from lending USDC on Aave with automatic reinvestment.",
    apy: 4.5,
    risk: "Low",
    value: 5000000,
    asset: "USDC",
  },
  {
    id: "2",
    name: "ETH Staking",
    protocol: "Lido",
    description: "Liquid staking solution for ETH with competitive yields.",
    apy: 3.8,
    risk: "Low",
    value: 12000000,
    asset: "ETH",
  },
  {
    id: "3",
    name: "BTC Yield Strategy",
    protocol: "Curve",
    description: "Earn yield on BTC through optimized Curve pool strategies.",
    apy: 5.2,
    risk: "Medium",
    value: 8000000,
    asset: "BTC",
  },
  {
    id: "4",
    name: "Stablecoin Diversification",
    protocol: "Compound",
    description: "Diversified stablecoin lending across multiple protocols.",
    apy: 6.1,
    risk: "Medium",
    value: 3500000,
    asset: "USDC/DAI/USDT",
  },
  {
    id: "5",
    name: "ETH-BTC LP Strategy",
    protocol: "Uniswap",
    description: "Liquidity provision for ETH-BTC pair with fee optimization.",
    apy: 8.5,
    risk: "High",
    value: 2800000,
    asset: "ETH-BTC",
  },
  {
    id: "6",
    name: "Yield Optimizer",
    protocol: "Yearn",
    description: "Automated yield farming strategy with protocol diversification.",
    apy: 7.2,
    risk: "Medium",
    value: 4200000,
    asset: "USDC",
  },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Hero Section */}
      <PortfolioHero />

      {/* Divider */}
      <div className="my-8 border-t border-white/[0.08]"></div>

      {/* Positions Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Your Active Positions</h2>
        <PositionsList positions={mockPositions} />
      </div>
    </div>
  );
}
