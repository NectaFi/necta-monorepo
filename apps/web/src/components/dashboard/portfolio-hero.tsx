"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, LogOut } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { WithdrawModal } from "./withdraw-modal";

interface PortfolioHeroProps {
  totalBalance?: number;
  averageApy?: number;
}

export function PortfolioHero({ totalBalance = 10000, averageApy = 5.81 }: PortfolioHeroProps) {
  const router = useRouter();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        {/* Left Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Your Portfolio Overview
            </h1>
            <div className="mt-4 flex items-center">
              <span className="text-xl text-white/70">
                Currently earning up to
              </span>
              <div className="flex items-center ml-2">
                <span className="text-xl font-semibold text-[#4CAF50]">
                  {averageApy.toFixed(2)}% APY
                </span>
                <TrendingUp className="h-4 w-4 ml-1 text-[#4CAF50]" />
              </div>
            </div>
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

            <Button
              onClick={() => setShowWithdrawModal(true)}
              variant="outline"
              className="rounded-full border border-white/[0.08] bg-zinc-800/70 px-4 py-2 text-[15px] text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm flex items-center gap-2"
            >
              Manage Funds
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Section - Portfolio Summary */}
        <div className="flex items-center justify-center">
          <div className="bg-zinc-800/70 border border-white/[0.08] rounded-xl p-6 w-full max-w-md">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/60">Total Balance</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(totalBalance)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                <div>
                  <p className="text-sm text-white/60">Daily Yield</p>
                  <p className="text-lg font-medium text-white">
                    {formatCurrency(totalBalance * (averageApy / 100 / 365))}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Monthly Yield</p>
                  <p className="text-lg font-medium text-white">
                    {formatCurrency(totalBalance * (averageApy / 100 / 12))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      <WithdrawModal
        open={showWithdrawModal}
        onOpenChange={setShowWithdrawModal}
        totalBalance={totalBalance}
      />
    </>
  );
}
