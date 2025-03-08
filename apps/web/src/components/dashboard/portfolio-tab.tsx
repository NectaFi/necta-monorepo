"use client";

import { PositionsList } from "@/components/dashboard/positions-list";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, Calendar } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

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

interface PortfolioTabProps {
  positions: Position[];
  totalBalance: number;
  averageApy: number;
  activationDate?: string;
}

export function PortfolioTab({ positions, totalBalance, averageApy, activationDate }: PortfolioTabProps) {
  // Format activation date if available
  const formattedDate = activationDate
    ? new Date(activationDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <div className="space-y-8">
      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          change={{ value: 0, isPositive: true }}
        />
        <MetricCard
          title="Average APY"
          value={`${averageApy.toFixed(2)}%`}
          icon={<TrendingUp className="h-4 w-4 text-[#F29600]" />}
        />
        <MetricCard
          title="Active Since"
          value={formattedDate}
          icon={<Calendar className="h-4 w-4 text-white/60" />}
          isDate
        />
      </div>

      {/* Positions Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Your Active Positions</h3>
        <PositionsList positions={positions} />
      </div>

      {/* PnL Metrics */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Daily Yield"
            value={formatCurrency(totalBalance * (averageApy / 100 / 365))}
            subtitle="Based on current APY"
          />
          <MetricCard
            title="Monthly Estimate"
            value={formatCurrency(totalBalance * (averageApy / 100 / 12))}
            subtitle="Based on current APY"
          />
          <MetricCard
            title="Yearly Estimate"
            value={formatCurrency(totalBalance * (averageApy / 100))}
            subtitle="Based on current APY"
          />
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  isDate?: boolean;
}

function MetricCard({ title, value, subtitle, change, icon, isDate = false }: MetricCardProps) {
  return (
    <Card className="rounded-xl border border-white/[0.08] bg-zinc-800/70 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <p className="text-sm text-white/60">{title}</p>
          {icon}
        </div>

        <div className="mt-2">
          <div className="flex items-baseline">
            <p className={cn(
              "text-2xl font-bold",
              isDate ? "text-white" : "text-white"
            )}>
              {value}
            </p>

            {change && (
              <span className={cn(
                "ml-2 text-sm",
                change.isPositive ? "text-green-500" : "text-red-500"
              )}>
                {change.isPositive ? "+" : "-"}{Math.abs(change.value)}%
              </span>
            )}
          </div>

          {subtitle && (
            <p className="text-xs text-white/60 mt-1">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
