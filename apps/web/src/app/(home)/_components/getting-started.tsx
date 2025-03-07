import { GETTING_STARTED_STEPS } from "@/lib/constants";

type Step = {
  number: number;
  title: string;
  description: string;
};

export function GettingStarted() {
  return (
    <section id="steps" className="relative overflow-hidden bg-[#F9F4ED] py-24 sm:py-32">
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-4xl text-[#23191A] tracking-tight sm:text-5xl">
           Deposit Once, Earn Highest Yields Across Protocols
          </h2>
          <p className="text-[#23191A]/70 text-lg">
            Simply deposit once and let specialized AI agents optimize your yields across
            the best DeFi protocols—maximizing returns 24/7 with zero hassle.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3 lg:gap-12">
          {GETTING_STARTED_STEPS.map((step: Step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, title, description }: Step) {
  return (
    <div className="group relative flex flex-col space-y-6 rounded-2xl border border-[#23191A]/5 bg-gradient-to-br from-white via-white/95 to-white/90 p-8 shadow-[0_4px_20px_-4px_rgba(35,25,26,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-[#F29600]/20 hover:shadow-[0_8px_30px_-4px_rgba(242,150,0,0.12)]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F29600]/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Top right glow */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#F29600]/[0.02] blur-[50px] transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F29600] to-[#F29600]/90 shadow-[0_4px_10px_-2px_rgba(242,150,0,0.3)]">
          <span className="font-semibold text-lg text-white">{number}</span>
        </div>
      </div>

      <div className="relative z-10 space-y-3">
        <h3 className="font-bold text-[#23191A] text-xl">{title}</h3>
        <p className="text-[#23191A]/70 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
