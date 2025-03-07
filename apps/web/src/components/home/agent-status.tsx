"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Zap } from "lucide-react";
import type { AgentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const agentInfo = {
  sentinel: {
    icon: Shield,
    description: "Monitors market conditions and tracks wallet status",
  },
  curator: {
    icon: Brain,
    description: "Analyzes reports and determines optimal actions",
  },
  executor: {
    icon: Zap,
    description: "Processes and executes secure transactions",
  },
};

interface AgentStatusCardProps {
  agent: AgentStatus;
}

export function AgentStatusCard({ agent }: AgentStatusCardProps) {
  const info = agentInfo[agent.agent as keyof typeof agentInfo];
  const Icon = info?.icon || Shield;

  return (
    <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
            <Icon className="h-5 w-5 text-[#F29600]" />
          </div>
          <div>
            <h3 className="font-medium text-white capitalize">
              {agent.agent} Agent
            </h3>
            <p className="mt-1 text-sm text-white/60 line-clamp-2">
              {info?.description}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "border-green-500/20 bg-green-500/10 text-green-500",
            !agent.isActive && "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
          )}
        >
          {agent.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>
    </Card>
  );
}
