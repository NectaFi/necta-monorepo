"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Connect } from "@/components/shared/connect";
import { useAccount } from "wagmi";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { SmartAccountModal } from "@/components/shared/smart-account-modal";
import { DepositForm } from "@/components/shared/deposit-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const protocols = [
  { name: "Morpho", src: "/protocols/morpho.png" },
  { name: "Aave", src: "/protocols/aave.svg" },
  { name: "Compound", src: "/protocols/compound.svg" },
  { name: "Euler", src: "/protocols/euler.svg" },
  { name: "Fluid", src: "/protocols/fluid.png" }
];

export function HeroSection() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { walletData } = useStore();
  const [showSmartAccountModal, setShowSmartAccountModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [hasSmartAccount, setHasSmartAccount] = useState(false);

  // Safe check for active positions
  const hasActivePositions = Boolean(walletData?.positions && walletData.positions.length > 0);

  // Check for smart account on client side only
  useEffect(() => {
    setHasSmartAccount(localStorage?.getItem("smartAccountAddress") !== null);
  }, []);

  const handleAction = () => {
    if (!hasSmartAccount) {
      setShowSmartAccountModal(true);
      return;
    }

    if (!hasActivePositions) {
      setShowDepositModal(true);
      return;
    }

    router.push("/earn/dashboard");
  };

  const handleSmartAccountSuccess = () => {
    setShowSmartAccountModal(false);
    setHasSmartAccount(true);
    setShowDepositModal(true);
  };

  const handleDepositSuccess = () => {
    setShowDepositModal(false);
    router.push("/earn/dashboard");
  };

  // Get the appropriate headline, subtext, and CTA based on user state
  const getHeroContent = () => {
    if (!isConnected) {
      return {
        headline: "Earn AI-optimized yields effortlessly.",
        subtext: "Smart automation, best rates, zero complexity.",
        cta: <Connect label="Connect Wallet" hideBalance={true} />
      };
    }

    if (!hasSmartAccount || !hasActivePositions) {
      return {
        headline: "Activate AI-powered yield optimization.",
        subtext: "Deposit funds, and our AI does the rest.",
        cta: (
          <Button
            onClick={handleAction}
            className="rounded-full border border-white/[0.08] bg-zinc-800/70 px-8 py-6 text-[15px] text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm h-auto"
          >
            Deposit & Activate AI
          </Button>
        )
      };
    }

    return {
      headline: "Your AI agents are optimizing your yield.",
      subtext: "Track your earnings and adjust strategies anytime.",
      cta: (
        <Button
          onClick={() => router.push("/earn/dashboard")}
          className="rounded-full border border-white/[0.08] bg-zinc-800/70 px-8 py-6 text-[15px] text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm h-auto"
        >
          View Portfolio
        </Button>
      )
    };
  };

  const { headline, subtext, cta } = getHeroContent();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-8 md:py-12">
        {/* Left side - Main content */}
        <div className="flex flex-col items-start space-y-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {headline}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/70">
              {subtext}
            </p>
          </div>

          <div className="mt-2">
            {cta}
          </div>
        </div>

        {/* Right side - Protocol logos */}
        <div className="flex flex-col items-center space-y-4 mt-6 md:mt-0">
          <p className="text-white/60 text-sm">Supported Protocols</p>
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className="relative h-12 w-12 md:h-16 md:w-16 rounded-full bg-zinc-800/70 border border-white/[0.08] p-3 flex items-center justify-center hover:border-white/20 transition-colors"
              >
                <Image
                  src={protocol.src}
                  alt={`${protocol.name} logo`}
                  fill
                  className="object-contain p-3"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Account Modal */}
      <SmartAccountModal
        open={showSmartAccountModal}
        onOpenChange={setShowSmartAccountModal}
        onSuccess={handleSmartAccountSuccess}
      />

      {/* Deposit Modal */}
      <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
        <DialogContent className="sm:max-w-md border-white/10 bg-black">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Deposit USDC</DialogTitle>
          </DialogHeader>
          <DepositForm
            opportunityId="default"
            token="USDC"
            onSuccess={handleDepositSuccess}
            isFirstTime={!hasActivePositions}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
