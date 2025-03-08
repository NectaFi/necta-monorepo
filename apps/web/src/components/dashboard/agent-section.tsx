"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Shield, Brain, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentSectionProps {
  // Props can be added later for real data
}

export function AgentSection({}: AgentSectionProps) {
  const [autoRebalancing, setAutoRebalancing] = useState(true);
  const [riskLevel, setRiskLevel] = useState(50);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">AI Agents</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white/60">Auto Rebalancing</span>
          <Switch
            checked={autoRebalancing}
            onCheckedChange={setAutoRebalancing}
            className="data-[state=checked]:bg-[#F29600]"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AgentCard
          name="Sentinel"
          description="Monitors risk & security"
          icon={<Shield className="h-5 w-5 text-blue-400" />}
          isActive={true}
          lastActivity="Risk assessment completed 2h ago"
          details="All positions secure, no anomalies detected"
        />

        <AgentCard
          name="Curator"
          description="Selects best yield strategies"
          icon={<Brain className="h-5 w-5 text-purple-400" />}
          isActive={true}
          lastActivity="Optimization decision 6h ago"
          details="Identified Aave as optimal for USDC (+0.2% APY)"
        />

        <AgentCard
          name="Executor"
          description="Executes transactions"
          icon={<Zap className="h-5 w-5 text-[#F29600]" />}
          isActive={autoRebalancing}
          lastActivity="Last rebalance 6h ago"
          details="Moved 500 USDC to Aave, gas cost: 0.002 ETH"
        />
      </div>

      {/* Risk Parameters */}
      <Card className="rounded-xl border border-white/[0.08] bg-zinc-800/70 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]">
        <CardContent className="p-5">
          <h3 className="text-lg font-medium text-white mb-4">Risk Parameters</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-white/60">Risk Level</span>
                <span className="text-sm font-medium text-white">{getRiskLabel(riskLevel)}</span>
              </div>
              <Slider
                value={[riskLevel]}
                min={0}
                max={100}
                step={1}
                onValueChange={(values) => {
                  if (values && values.length > 0 && typeof values[0] === 'number') {
                    setRiskLevel(values[0]);
                  }
                }}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-white/60">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-white/60">Min TVL Requirement</span>
                <p className="text-sm font-medium text-white">$10M+</p>
              </div>

              <div className="space-y-1">
                <span className="text-sm text-white/60">Protocol Diversification</span>
                <p className="text-sm font-medium text-white">At least 3 protocols</p>
              </div>

              <div className="space-y-1">
                <span className="text-sm text-white/60">Max Single Position</span>
                <p className="text-sm font-medium text-white">50% of portfolio</p>
              </div>

              <div className="space-y-1">
                <span className="text-sm text-white/60">Rebalancing Frequency</span>
                <p className="text-sm font-medium text-white">When APY diff &gt; 0.2%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface AgentCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  lastActivity: string;
  details: string;
}

function AgentCard({ name, description, icon, isActive, lastActivity, details }: AgentCardProps) {
  return (
    <Card className={cn(
      "rounded-xl border shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]",
      isActive
        ? "border-white/[0.08] bg-zinc-800/70"
        : "border-white/[0.04] bg-zinc-800/30"
    )}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-white/5 mr-3">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">{name}</h3>
              <p className="text-xs text-white/60">{description}</p>
            </div>
          </div>
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            isActive
              ? "bg-green-500/10 text-green-500"
              : "bg-gray-500/10 text-gray-400"
          )}>
            {isActive ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-white/60">
            <Clock className="h-4 w-4 mr-1" />
            {lastActivity}
          </div>
          <p className="text-sm text-white/80">{details}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function getRiskLabel(value: number): string {
  if (value < 33) return "Conservative";
  if (value < 66) return "Balanced";
  return "Aggressive";
}
