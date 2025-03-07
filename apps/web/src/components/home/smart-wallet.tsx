"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Copy, ExternalLink, ArrowUpRight, Plus, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WalletData } from "@/lib/types";
import { WithdrawModal } from "@/components/shared/withdraw";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Deposit } from "@/components/shared/deposit";
import { useState } from "react";

interface SmartWalletProps {
  walletData: WalletData | null;
  isOpen: boolean;
  onToggle: () => void;
}

export function SmartWallet({ walletData, isOpen, onToggle }: SmartWalletProps) {
  const router = useRouter();
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-screen w-80 transform bg-zinc-900/90 p-6 shadow-xl backdrop-blur-md transition-transform duration-300 ease-in-out lg:block",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-10 top-8 border-white/[0.08] bg-zinc-900/90 backdrop-blur-md"
          onClick={onToggle}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
              <Shield className="h-5 w-5 text-[#F29600]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium text-lg text-white">Smart Wallet</h2>
                <Badge
                  variant="outline"
                  className="border-[#F29600]/20 bg-[#F29600]/10 text-[#F29600]"
                >
                  Active
                </Badge>
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="space-y-2">
            <p className="text-sm text-white/60">Wallet Address</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-white">
                {walletData?.address
                  ? `${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`
                  : "Not connected"}
              </p>
              {walletData?.address && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white/40 hover:text-white"
                    onClick={() => {
                      navigator.clipboard.writeText(walletData.address);
                      toast.success("Address copied to clipboard");
                    }}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white/40 hover:text-white"
                    onClick={() => window.open(`https://basescan.org/address/${walletData.address}`, "_blank")}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Balance */}
          <div className="space-y-2">
            <p className="text-sm text-white/60">Available Balance</p>
            <p className="font-semibold text-2xl text-white">
              ${walletData?.balance || "0.00"}
            </p>
          </div>

          {/* Assets */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8">
                  <Image src="/tokens/usdc.svg" alt="USDC" fill className="rounded-full" />
                </div>
                <div>
                  <p className="font-medium text-white">USDC</p>
                  <p className="text-sm text-white/60">{walletData?.balance || "0"} USDC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid gap-3">
            <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-white/10 font-medium hover:bg-white/5"
                >
                  <Plus className="h-4 w-4" />
                  Deposit
                </Button>
              </DialogTrigger>
              <DialogContent className="border-white/[0.08] bg-zinc-900/[0.65] backdrop-blur-md">
                <Deposit
                  mode="dashboard"
                  onSuccess={() => setIsDepositOpen(false)}
                  onClose={() => setIsDepositOpen(false)}
                />
              </DialogContent>
            </Dialog>
            <WithdrawModal
              maxAmount={walletData?.balance || "0"}
              onWithdraw={(amount) => Promise.resolve(console.log("Withdrawing:", amount))}
              trigger={
                <Button
                  variant="outline"
                  className="w-full gap-2 border-white/10 font-medium hover:bg-white/5"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Withdraw to EOA
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 transform bg-zinc-900/90 p-6 shadow-xl backdrop-blur-md transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Mobile Content - Simplified version */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#F29600]" />
              <h2 className="font-medium text-white">Smart Wallet</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <ChevronLeft className={cn("h-4 w-4 rotate-90 transition-transform", !isOpen && "-rotate-90")} />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">Available Balance</p>
            <p className="font-semibold text-xl text-white">
              ${walletData?.balance || "0.00"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-white/10 font-medium hover:bg-white/5"
                >
                  <Plus className="h-4 w-4" />
                  Deposit
                </Button>
              </DialogTrigger>
              <DialogContent className="border-white/[0.08] bg-zinc-900/[0.65] backdrop-blur-md">
                <Deposit
                  mode="dashboard"
                  onSuccess={() => setIsDepositOpen(false)}
                  onClose={() => setIsDepositOpen(false)}
                />
              </DialogContent>
            </Dialog>
            <WithdrawModal
              maxAmount={walletData?.balance || "0"}
              onWithdraw={(amount) => Promise.resolve(console.log("Withdrawing:", amount))}
              trigger={
                <Button
                  variant="outline"
                  className="gap-2 border-white/10 font-medium hover:bg-white/5"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Withdraw
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
