"use client";

import { ThemeProvider } from "@/providers/theme-provider";
import ContextProvider from "@/context";
import type { ThemeProviderProps } from "next-themes";

interface ProvidersProps extends ThemeProviderProps {
  cookies?: string | null;
}

export function Providers({ children, cookies = null, ...props }: ProvidersProps) {
  return (
    <ThemeProvider {...props}>
      <ContextProvider cookies={cookies}>{children}</ContextProvider>
    </ThemeProvider>
  );
}

// Client component wrapper for the Providers
export function ClientProviders({ children, cookies = null, ...props }: ProvidersProps) {
  return (
    <Providers cookies={cookies} {...props}>
      {children}
    </Providers>
  );
}
