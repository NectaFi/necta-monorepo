"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OpportunityCard } from "./opportunity-card";
import { cn } from "@/lib/utils";


interface Opportunity {
  id: string;
  name: string;
  protocol: string;
  apy: number;
  risk: string;
  description: string;
  tvl: number;
  asset: string;
}

interface OpportunityListProps {
  opportunities: Opportunity[];
}

type SortOption = "apy" | "risk" | "tvl";

export function OpportunityList({ opportunities }: OpportunityListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("apy");

  const filteredOpportunities = opportunities.filter(
    (opp) =>
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.protocol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (sortBy === "apy") return b.apy - a.apy;
    if (sortBy === "tvl") return b.tvl - a.tvl;

    // Sort by risk (Low, Medium, High)
    const riskOrder = { low: 1, medium: 2, high: 3 };
    return riskOrder[a.risk.toLowerCase() as keyof typeof riskOrder] -
           riskOrder[b.risk.toLowerCase() as keyof typeof riskOrder];
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            type="text"
            placeholder="Search by name or protocol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-700/30 border-white/[0.08] text-white placeholder:text-white/60"
          />
        </div>
        <div className="flex space-x-2">
          <SortButton active={sortBy === "apy"} onClick={() => setSortBy("apy")}>
            Highest APY
          </SortButton>
          <SortButton active={sortBy === "risk"} onClick={() => setSortBy("risk")}>
            Lowest Risk
          </SortButton>
          <SortButton active={sortBy === "tvl"} onClick={() => setSortBy("tvl")}>
            Highest TVL
          </SortButton>
        </div>
      </div>

      {sortedOpportunities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/60">No opportunities found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </div>
  );
}

interface SortButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function SortButton({ children, active, onClick }: SortButtonProps) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="sm"
      onClick={onClick}
      className={cn(
        "bg-transparent hover:bg-white/10",
        active ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
      )}
    >
      {children}
    </Button>
  );
}
