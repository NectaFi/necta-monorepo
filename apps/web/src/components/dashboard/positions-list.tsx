"use client";

import { useState } from "react";
import { PositionCard } from "./position-card";

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

interface PositionsListProps {
  positions: Position[];
}

export function PositionsList({ positions }: PositionsListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {positions.map((position) => (
        <PositionCard key={position.id} position={position} />
            ))}
          </div>
  );
}
