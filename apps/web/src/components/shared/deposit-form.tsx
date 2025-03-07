"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DepositFormProps {
  opportunityId: string;
  token: string;
  onSuccess: () => void;
  isFirstTime?: boolean;
}

export function DepositForm({
  opportunityId,
  token,
  onSuccess,
  isFirstTime = false,
}: DepositFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [riskLevel, setRiskLevel] = useState<number>(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, this would be an API call to deposit funds
      console.log("Depositing", {
        opportunityId,
        amount: parseFloat(amount),
        riskLevel: isFirstTime ? riskLevel : undefined,
      });

      toast.success(`Successfully deposited ${amount} ${token}`);
      onSuccess();
    } catch (error) {
      console.error("Deposit failed:", error);
      toast.error("Deposit failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="amount" className="block text-sm text-white/60">
          Amount ({token})
        </label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
          min="0"
          step="0.01"
          required
        />

        <div className="flex justify-between mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs border-white/10 text-white/60"
            onClick={() => setAmount("10")}
          >
            $10
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs border-white/10 text-white/60"
            onClick={() => setAmount("100")}
          >
            $100
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs border-white/10 text-white/60"
            onClick={() => setAmount("1000")}
          >
            $1,000
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs border-white/10 text-white/60"
            onClick={() => setAmount("10000")}
          >
            $10,000
          </Button>
        </div>
      </div>

      {isFirstTime && (
        <div className="space-y-2">
          <label className="block text-sm text-white/60">
            Risk Preference
          </label>
          <div className="space-y-6">
            <Slider
              defaultValue={[50]}
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
              <span className="text-brand-primary font-medium">
                {getRiskLabel(riskLevel)}
              </span>
              <span>Aggressive</span>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-primary hover:bg-brand-primary/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Depositing...
          </>
        ) : (
          `Deposit ${amount ? `${amount} ${token}` : ""}`
        )}
      </Button>
    </form>
  );
}

function getRiskLabel(value: number): string {
  if (value < 25) return "Low Risk";
  if (value < 75) return "Moderate Risk";
  return "High Risk";
}
