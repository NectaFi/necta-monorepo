"use client";

import { useState } from "react";
import { PortfolioHero } from "@/components/dashboard/portfolio-hero";
import { PortfolioTabs } from "@/components/dashboard/portfolio-tabs";
import { PortfolioTab } from "@/components/dashboard/portfolio-tab";
import { WalletTab } from "@/components/dashboard/wallet-tab";
import { ActivityTab, type Transaction } from "@/components/dashboard/activity-tab";
import { AgentSection } from "@/components/dashboard/agent-section";

// Mock data for positions
const mockPositions = [
  {
    id: "1",
    name: "USDC Yield Strategy",
    protocol: "Aave",
    description: "Stable yield from lending USDC on Aave with automatic reinvestment.",
    apy: 4.5,
    risk: "Low",
    value: 5000,
    asset: "USDC",
  },
  {
    id: "2",
    name: "ETH Staking",
    protocol: "Lido",
    description: "Liquid staking solution for ETH with competitive yields.",
    apy: 3.8,
    risk: "Low",
    value: 2000,
    asset: "ETH",
  },
  {
    id: "3",
    name: "BTC Yield Strategy",
    protocol: "Curve",
    description: "Earn yield on BTC through optimized Curve pool strategies.",
    apy: 5.2,
    risk: "Medium",
    value: 3000,
    asset: "BTC",
  },
];

// Mock data for wallet tokens
const mockTokens = [
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: 1250.75,
    value: 1250.75,
    icon: "/tokens/usdc.svg",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: 0.25,
    value: 450,
    icon: "/tokens/eth.svg",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    balance: 0.05,
    value: 1500,
    icon: "/tokens/wbtc.svg",
  },
];

// Mock data for transactions
const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    type: "deposit",
    amount: 1000,
    asset: "USDC",
    timestamp: "2024-03-15T10:30:00Z",
    status: "completed",
    description: "Deposited USDC into smart account",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: "tx2",
    type: "rebalance",
    amount: 500,
    asset: "USDC",
    timestamp: "2024-03-15T11:45:00Z",
    status: "completed",
    description: "Rebalanced funds to Aave for better yield",
    agent: "curator",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "tx3",
    type: "alert",
    timestamp: "2024-03-16T09:15:00Z",
    status: "completed",
    description: "Risk assessment completed - All positions secure",
    agent: "sentinel",
  },
  {
    id: "tx4",
    type: "rebalance",
    amount: 250,
    asset: "USDC",
    timestamp: "2024-03-17T14:20:00Z",
    status: "pending",
    description: "Optimizing yield allocation",
    agent: "executor",
  },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("portfolio");

  // Calculate total balance and average APY
  const totalBalance = mockPositions.reduce((sum, position) => sum + position.value, 0);
  const averageApy = mockPositions.reduce((sum, position) => sum + (position.apy * position.value), 0) / totalBalance;

  // Mock smart account address
  const smartAccountAddress = "0x1234567890abcdef1234567890abcdef12345678";

  // Mock activation date
  const activationDate = "2024-03-15";

  const tabs = [
    { id: "portfolio", label: "Portfolio" },
    { id: "wallet", label: "Wallet" },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Hero Section */}
      <PortfolioHero
        totalBalance={totalBalance}
        averageApy={averageApy}
      />

      {/* Divider */}
      <div className="my-8 border-t border-white/[0.08]"></div>

      {/* Tabs */}
      <PortfolioTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "portfolio" && (
          <PortfolioTab
            positions={mockPositions}
            totalBalance={totalBalance}
            averageApy={averageApy}
            activationDate={activationDate}
          />
        )}

        {activeTab === "wallet" && (
          <WalletTab
            address={smartAccountAddress}
            tokens={mockTokens}
          />
        )}

        {activeTab === "activity" && (
          <ActivityTab
            transactions={mockTransactions}
          />
        )}
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-white/[0.08]"></div>

      {/* AI Agents Section */}
      <AgentSection />
    </div>
  );
}
