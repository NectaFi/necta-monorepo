"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEATURES } from "@/lib/constants";

export function FeaturesSection() {
  return (
    <section className="relative bg-[#101010] py-24 sm:py-32">
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-4xl text-white tracking-tight sm:text-5xl">
            The intelligent stablecoin yield optimizer
          </h2>
          <p className="text-gray-400 text-lg">
            Unlock AI-powered DeFi to maximize yields and optimize your portfolio—effortlessly
          </p>
        </div>

        <div className="relative mt-16">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex justify-between">
            <div className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="w-px translate-x-[200%] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((FEATURE) => (
              <Card
                key={FEATURE.id}
                className="group relative overflow-hidden border-[#F29600]/20 bg-gradient-to-br from-[#1a1a1a] via-black to-[#0a0a0a] p-6 transition-all duration-300 hover:border-[#F29600]/30 hover:shadow-[0_4px_16px_rgba(242,150,0,0.15)]"
              >
                {/* Gradient Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F29600]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Top Right Glow */}
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#F29600]/5 blur-[50px] transition-opacity duration-300 group-hover:opacity-100" />

                {/* Bottom Left Glow */}
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#F29600]/5 blur-[50px] transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 text-white">
                    {FEATURE.icon && <FEATURE.icon size={24} />}
                  </div>
                  <Badge variant="outline" className="mb-3 border-[#F29600]/30 text-[#F29600]">
                    {FEATURE.badge}
                  </Badge>
                  <h3 className="mb-2 font-bold text-white text-xl">{FEATURE.title}</h3>
                  <p className="text-base text-gray-400">{FEATURE.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
