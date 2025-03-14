"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DepositForm } from "../shared/deposit-form";
import { useStore } from "@/lib/store";
import { useAccount } from "wagmi";
import { SmartAccountModal } from "../shared/smart-account-modal";

interface Opportunity {
  id: string;
  name: string;
  protocol: string;
  apy: number;
  risk: string;
  description: string;
  tvl: number;
  asset: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showSmartAccountModal, setShowSmartAccountModal] = useState(false);
  const { isConnected } = useAccount();
  const { walletData } = useStore();
  const [hasSmartAccount, setHasSmartAccount] = useState(false);

  // Check for smart account on client side only
  useEffect(() => {
    setHasSmartAccount(localStorage?.getItem("smartAccountAddress") !== null);
  }, []);

  const hasActivePositions = Boolean(walletData?.positions && walletData.positions.length > 0);

  const handleDepositClick = () => {
    if (!isConnected) {
      // User needs to connect wallet first
      return;
    }

    if (!hasSmartAccount) {
      // User needs to create a smart account first
      setShowSmartAccountModal(true);
      return;
    }

    // User has a smart account, show deposit modal
    setIsDepositOpen(true);
  };

  const handleSmartAccountSuccess = () => {
    setShowSmartAccountModal(false);
    setHasSmartAccount(true);
    setIsDepositOpen(true);
  };

  const handleDepositSuccess = () => {
    setIsDepositOpen(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-green-500/90 bg-green-500/[0.08]";
      case "medium":
        return "text-yellow-500/90 bg-yellow-500/[0.08]";
      case "high":
        return "text-red-500/90 bg-red-500/[0.08]";
      default:
        return "text-gray-500/90 bg-gray-500/[0.08]";
    }
  };

  const formatTVL = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <>
      <Card
        className="rounded-xl border border-white/[0.08] bg-zinc-800/70 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
        onClick={() => setIsDetailsOpen(true)}
      >
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-white">{opportunity.name}</h3>
              <div className="flex items-center mt-1">
                <Badge variant="secondary" className="text-xs bg-white/[0.02] border-0 text-white/80">
                  {opportunity.protocol}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`ml-2 text-xs border-0 ${getRiskColor(opportunity.risk)}`}
                >
                  {opportunity.risk} Risk
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <p className="text-xl font-bold text-[#F29600]">{opportunity.apy.toFixed(2)}%</p>
                <ArrowUpRight className="h-4 w-4 ml-1 text-[#F29600]" />
              </div>
              <p className="text-xs text-white/60">APY</p>
            </div>
          </div>

          <p className="text-sm text-white/60 mb-4 line-clamp-2">{opportunity.description}</p>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-white/60">TVL</p>
              <p className="text-sm font-medium text-white">{formatTVL(opportunity.tvl)}</p>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleDepositClick();
              }}
              className="rounded-[24px] gap-2 bg-[#F29600] px-8 text-white hover:bg-[#F29600]/80"
            >
              Deposit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Details Modal - Simplified */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-800/90 border border-white/[0.08] shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">{opportunity.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Key metrics in a grid for better mobile layout */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/60">Protocol</p>
                <p className="text-base font-medium text-white">{opportunity.protocol}</p>
              </div>
              <div>
                <p className="text-sm text-white/60">APY</p>
                <p className="text-xl font-bold text-[#F29600]">{opportunity.apy.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-white/60">Risk Level</p>
                <Badge
                  variant="secondary"
                  className={`text-xs border-0 ${getRiskColor(opportunity.risk)}`}
                >
                  {opportunity.risk}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-white/60">TVL</p>
                <p className="text-base font-medium text-white">{formatTVL(opportunity.tvl)}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-1">Description</p>
              <p className="text-sm text-white/90">{opportunity.description}</p>
            </div>

            <div className="rounded-lg bg-white/5 p-3 text-sm text-white/80 flex items-start gap-2">
              <Info className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
              <p>
                Our AI agents will automatically optimize your yield based on market conditions.
              </p>
            </div>

            <Button
              onClick={handleDepositClick}
              className="w-full rounded-[24px] gap-2 bg-[#F29600] px-8 text-white hover:bg-[#F29600]/80"
            >
              Deposit & Activate AI
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deposit Modal */}
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-800/90 border border-white/[0.08] shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Deposit into {opportunity.name}</DialogTitle>
          </DialogHeader>
          <DepositForm
            opportunityId={opportunity.id}
            token={opportunity.asset}
            onSuccess={handleDepositSuccess}
            isFirstTime={!hasActivePositions}
          />
        </DialogContent>
      </Dialog>

      {/* Smart Account Modal */}
      <SmartAccountModal
        open={showSmartAccountModal}
        onOpenChange={setShowSmartAccountModal}
        onSuccess={handleSmartAccountSuccess}
      />
    </>
  );
}
