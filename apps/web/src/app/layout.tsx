import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { ClientProviders } from "@/providers";
import { Toaster as Sonner } from "sonner";

import "../styles/globals.css";


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Necta Finance",
  description:
    "The agentic platform for automated DeFi yield optimization and portfolio management.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Get cookies for authentication
  const headersData = await headers();
  const cookies = headersData.get('cookie');

  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          manrope.variable
        )}
      >
        <ClientProviders
          cookies={cookies}
          themes={["light", "dark", "system"]}
          defaultTheme="dark"
          attribute="class"
          enableSystem
        >
          {children}
          <Sonner />
        </ClientProviders>
      </body>
    </html>
  );
}
