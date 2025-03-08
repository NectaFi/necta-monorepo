"use client";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { AppFooter } from "@/components/layout/footer";


export default function EarnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/earn/dashboard";

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-[-1]">
        <BackgroundGradientAnimation />
      </div>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Suspense>{children}</Suspense>
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
