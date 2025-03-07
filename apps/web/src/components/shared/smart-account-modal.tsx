"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Copy, ExternalLink, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export interface SmartAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function SmartAccountModal({ open, onOpenChange, onSuccess }: SmartAccountModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-white/10 bg-black">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Create Smart Account</DialogTitle>
        </DialogHeader>
        <SmartAccount onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}

interface SmartAccountProps {
  onSuccess: () => void;
}

function SmartAccount({ onSuccess }: SmartAccountProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  const handleCreateAccount = async () => {
    setIsDeploying(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a mock account address
      const mockAddress = "0x" + Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");

      // Store in localStorage for persistence
      localStorage.setItem("smartAccountAddress", mockAddress);

      setAccountAddress(mockAddress);
      toast.success("Smart account created successfully!");

      // Notify parent component
      onSuccess();
    } catch (err) {
      setError("Failed to create smart account. Please try again.");
      toast.error("Failed to create smart account");
    } finally {
      setIsDeploying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="space-y-6 py-4">
      {!accountAddress ? (
        <>
          <div className="space-y-4">
            <p className="text-white/80">
              A smart account enhances your security and reduces gas costs by batching transactions.
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-brand-primary" />
                <span>Enhanced security with multi-signature support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-brand-primary" />
                <span>Lower gas fees through transaction batching</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-brand-primary" />
                <span>Simplified DeFi interactions with account abstraction</span>
              </li>
            </ul>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            onClick={handleCreateAccount}
            disabled={isDeploying}
            className="w-full bg-brand-primary hover:bg-brand-primary/90"
          >
            {isDeploying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Smart Account"
            )}
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-white/10 p-4">
            <p className="text-sm text-white/60 mb-2">Your Smart Account Address</p>
            <div className="flex items-center justify-between">
              <code className="text-xs text-white bg-white/5 p-2 rounded">
                {accountAddress}
              </code>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(accountAddress)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(`https://etherscan.io/address/${accountAddress}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <p className="text-white/80 text-sm">
            Your smart account has been created successfully. You can now start using Necta to earn yield.
          </p>

          <Button
            onClick={() => onSuccess()}
            className="w-full bg-brand-primary hover:bg-brand-primary/90"
          >
            Continue to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
}
