"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabProps {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function PortfolioTabs({ tabs, activeTab, onChange }: TabProps) {
  return (
    <div className="border-b border-white/[0.08] mb-6">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
