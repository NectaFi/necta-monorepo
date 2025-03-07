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
      <BackgroundGradientAnimation>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            <div className="relative">
              <Suspense>{children}</Suspense>
            </div>
          </div>
          <AppFooter />
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}
