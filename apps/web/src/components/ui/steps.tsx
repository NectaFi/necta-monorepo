"use client";

import { CheckCircle2, Circle } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white">
          {steps[currentStep].title}
        </h1>
        <p className="mt-2 text-white/60">
          {steps[currentStep].description}
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center">
            {/* Step Indicator */}
            {index < currentStep ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : index === currentStep ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#F29600] text-sm font-medium text-[#F29600]">
                {index + 1}
              </div>
            ) : (
              <Circle className="h-6 w-6 text-white/40" />
            )}

            {/* Step Title */}
            <span
              className={`ml-2 font-medium ${
                index <= currentStep ? "text-white" : "text-white/40"
              }`}
            >
              {step.title}
            </span>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="mx-4 h-[2px] w-8 bg-white/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
