"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Power } from "lucide-react";
import { DeactivateModal } from "./deactivate";
import type { Position } from "@/lib/types";

interface PortfolioCardProps {
  mainPosition: Position | undefined;
  averageApy: number;
}

export function PortfolioCard({ mainPosition, averageApy }: PortfolioCardProps) {
  return (
    <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-8 backdrop-blur-md rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm text-white/60">Total Value</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="font-semibold text-3xl text-white">
              ${mainPosition?.value || "0.00"}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-green-500 text-sm">+12.5%</span>
              <LineChart className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
        <div>
          <DeactivateModal
            onDeactivate={() => Promise.resolve(console.log("Deactivating..."))}
            trigger={
              <Button
                variant="outline"
                className="gap-2 border-red-500/20 bg-red-500/10 font-medium text-red-500 hover:bg-red-500/20"
              >
                <Power className="h-4 w-4" />
                Exit Position
              </Button>
            }
          />
        </div>
      </div>

      <div className="mt-10 grid gap-8 border-white/[0.08] border-t pt-8 md:grid-cols-4">
        <div>
          <p className="text-sm text-white/60">Initial Deposit</p>
          <p className="mt-1 font-medium text-white text-xl">
            {mainPosition?.amount || "0"} USDC
          </p>
        </div>
        <div>
          <p className="text-sm text-white/60">Active Protocol</p>
          <p className="mt-1 font-medium text-white text-xl">
            {mainPosition?.protocol || "None"}
          </p>
        </div>
        <div>
          <p className="text-sm text-white/60">Current APY</p>
          <p className="mt-1 font-medium text-white text-xl">
            {averageApy.toFixed(2) || "0.00"}%
          </p>
        </div>
        <div>
          <p className="text-sm text-white/60">Active Since</p>
          <p className="mt-1 font-medium text-white text-xl">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
