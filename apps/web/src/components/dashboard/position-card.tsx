"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface Position {
  id: string;
  name: string;
  protocol: string;
  description: string;
  apy: number;
  risk: string;
  value: number;
  asset: string;
}

interface PositionCardProps {
  position: Position;
}

function formatValue(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function getRiskColor(risk: string) {
  switch (risk.toLowerCase()) {
    case "low":
      return "bg-emerald-500/10 text-emerald-500";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500";
    case "high":
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-white/10 text-white";
  }
}

export function PositionCard({ position }: PositionCardProps) {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <Card className="rounded-xl border border-white/[0.08] bg-zinc-800/70 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-white">{position.name}</h3>
            <div className="flex items-center mt-1">
              <Badge variant="secondary" className="text-xs bg-white/[0.02] border-0 text-white/80">
                {position.protocol}
              </Badge>
              <Badge
                variant="secondary"
                className={`ml-2 text-xs border-0 ${getRiskColor(position.risk)}`}
              >
                {position.risk} Risk
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <p className="text-xl font-bold text-[#F29600]">{position.apy.toFixed(2)}%</p>
              <ArrowUpRight className="h-4 w-4 ml-1 text-[#F29600]" />
            </div>
            <p className="text-xs text-white/60">APY</p>
          </div>
        </div>

        <p className="text-sm text-white/60 mb-4 line-clamp-2">{position.description}</p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-white/60">Value</p>
            <p className="text-sm font-medium text-white">{formatValue(position.value)}</p>
          </div>
          <Button
            onClick={() => setIsWithdrawOpen(true)}
            className="rounded-[24px] gap-2 bg-[#F29600] px-8 text-white hover:bg-[#F29600]/80"
          >
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
