"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle, WalletIcon, PauseCircle, PowerOff } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalBalance: number;
  onSuccess?: () => void;
}

export function WithdrawModal({ open, onOpenChange, totalBalance, onSuccess }: WithdrawModalProps) {
  const [activeTab, setActiveTab] = useState("withdraw");
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > totalBalance) {
      toast.error("Amount exceeds available balance");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(`Successfully withdrawn ${amount} USDC to your wallet`);
      setAmount("");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Withdrawal failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStopAI = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("AI management stopped. Funds moved to smart account.");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to stop AI management. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeactivateAI = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("AI agents deactivated. You can reactivate anytime.");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to deactivate AI. Please try again.");
    } finally {
      setIsSubmitting(false);
      setConfirmDeactivate(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-white/10 bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Manage Your Funds</DialogTitle>
          <DialogDescription className="text-white/60">
            Choose how you want to manage your funds and AI agents.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="withdraw"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="withdraw" className="data-[state=active]:bg-[#F29600]">
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="stop" className="data-[state=active]:bg-[#F29600]">
              Stop AI
            </TabsTrigger>
            <TabsTrigger value="deactivate" className="data-[state=active]:bg-[#F29600]">
              Deactivate
            </TabsTrigger>
          </TabsList>

          {/* Withdraw to Wallet Tab */}
          <TabsContent value="withdraw" className="space-y-4">
            <div className="rounded-lg bg-white/5 p-3 text-sm text-white/80 flex items-start gap-2">
              <WalletIcon className="h-5 w-5 text-[#F29600] flex-shrink-0 mt-0.5" />
              <p>
                Withdraw funds from all pools directly to your connected wallet.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="amount" className="block text-sm text-white/60">
                  Amount (USDC)
                </label>
                <span className="text-sm text-white/60">
                  Available: {formatCurrency(totalBalance)}
                </span>
              </div>

              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                min="0"
                step="0.01"
                required
              />

              <div className="flex justify-between mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs border-white/10 text-white/60"
                  onClick={() => setAmount((totalBalance * 0.25).toFixed(2))}
                >
                  25%
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs border-white/10 text-white/60"
                  onClick={() => setAmount((totalBalance * 0.5).toFixed(2))}
                >
                  50%
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs border-white/10 text-white/60"
                  onClick={() => setAmount((totalBalance * 0.75).toFixed(2))}
                >
                  75%
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs border-white/10 text-white/60"
                  onClick={() => setAmount(totalBalance.toFixed(2))}
                >
                  Max
                </Button>
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              disabled={isSubmitting}
              className="w-full bg-[#F29600] hover:bg-[#F29600]/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Withdraw to Wallet"
              )}
            </Button>
          </TabsContent>

          {/* Stop AI Management Tab */}
          <TabsContent value="stop" className="space-y-4">
            <div className="rounded-lg bg-white/5 p-3 text-sm text-white/80 flex items-start gap-2">
              <PauseCircle className="h-5 w-5 text-[#F29600] flex-shrink-0 mt-0.5" />
              <p>
                Move all funds back to your smart account but keep them deposited. AI will stop managing your funds.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-white/60">Total Balance</span>
                <span className="text-sm font-medium text-white">{formatCurrency(totalBalance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/60">Destination</span>
                <span className="text-sm font-medium text-white">Smart Account</span>
              </div>
            </div>

            <div className="rounded-lg bg-yellow-500/10 p-3 text-sm text-yellow-500 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>
                Your funds will remain in your smart account and you can reactivate AI management anytime.
              </p>
            </div>

            <Button
              onClick={handleStopAI}
              disabled={isSubmitting}
              className="w-full bg-[#F29600] hover:bg-[#F29600]/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Stop AI Management"
              )}
            </Button>
          </TabsContent>

          {/* Deactivate AI Tab */}
          <TabsContent value="deactivate" className="space-y-4">
            <div className="rounded-lg bg-white/5 p-3 text-sm text-white/80 flex items-start gap-2">
              <PowerOff className="h-5 w-5 text-[#F29600] flex-shrink-0 mt-0.5" />
              <p>
                Pause all AI activity while keeping your funds in your smart account. You can reactivate later.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-white/60">Active Agents</span>
                <span className="text-sm font-medium text-white">3</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-white/60">Sentinel</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/60">Curator</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/60">Executor</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Active</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>
                Deactivating AI will pause all optimization activities. Your funds will remain in your smart account.
              </p>
            </div>

            {!confirmDeactivate ? (
              <Button
                onClick={() => setConfirmDeactivate(true)}
                className="w-full bg-red-500/80 hover:bg-red-500"
              >
                Deactivate AI
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-white/80 text-center">Are you sure you want to deactivate all AI agents?</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setConfirmDeactivate(false)}
                    variant="outline"
                    className="flex-1 border-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeactivateAI}
                    disabled={isSubmitting}
                    className="flex-1 bg-red-500/80 hover:bg-red-500"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
