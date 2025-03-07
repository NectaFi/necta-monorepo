"use client";

import { Card } from "@/components/ui/card";
import { Plus, Power, Zap } from "lucide-react";
import type { Thought } from "@/lib/types";

interface ActivityHistoryProps {
  thoughts: Thought[];
}

export function ActivityHistory({ thoughts }: ActivityHistoryProps) {
  return (
    <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-8 backdrop-blur-md rounded-xl">
      <h2 className="mb-6 font-medium text-lg text-white">Recent Activity</h2>
      <div className="space-y-4">
        {thoughts.slice(0, 5).map((thought: Thought) => {
          const getActionIcon = () => {
            if (thought.message.includes("deposit")) return Plus;
            if (thought.message.includes("withdraw")) return Plus;
            if (thought.message.includes("deactivate")) return Power;
            return Zap;
          };
          const Icon = getActionIcon();

          return (
            <div
              key={thought.id}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08]">
                  <Icon className="h-4 w-4 text-[#F29600]" />
                </div>
                <div>
                  <p className="font-medium text-white capitalize">{thought.message}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-white/60">by {thought.agent}</p>
                  </div>
                </div>
              </div>
              <span className="text-sm text-white/40">
                {new Date(thought.timestamp).toLocaleTimeString()}
              </span>
            </div>
          );
        })}

        {thoughts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08]">
              <Zap className="h-6 w-6 text-[#F29600]" />
            </div>
            <p className="mt-4 text-white">Initializing AI agents...</p>
            <p className="mt-2 text-sm text-white/60">Your agents will start working soon</p>
          </div>
        )}
      </div>
    </Card>
  );
}
