"use client";

interface ConnectProps {
  label?: string;
  hideBalance?: boolean;
}

export function Connect({ label = "Login", hideBalance = false }: ConnectProps) {
  return (
    <div>
      {/* @ts-expect-error Add this line while our team fix the upgrade to react 19 for global components */}
      <appkit-button label={label} balance={hideBalance ? "hide" : "show"} />
    </div>
  );
}
