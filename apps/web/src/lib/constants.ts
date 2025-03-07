import { LayoutDashboard, Settings, Bot, Wallet, LineChart, Shield, Github, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Types
interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

interface AppMenuItem {
  href: string;
  title: string;
  icon?: React.ReactNode;
}


// App Navigation & Links
export const APP_MENU: AppMenuItem[] = [];

export const APP_LINKS = [
  {
    name: "Blog",
    href: "http://blog.nectafi.xyz",
  },
  {
    name: "Docs",
    href: "http://blog.nectafi.xyz/docs",
  },
] as const;

export const APP_SOCIALS = [
  {
    name: "X",
    href: "https://x.com/NectaFi_AI",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "https://github.com/NectaFi",
    icon: Github,
  },
] as const;

// Supported Networks & Protocols
export const NETWORKS = [
  {
    name: "Base",
    icon: "/protocols/base.svg",
  },
] as const;


// Landing Page Constants
export const NAVBAR_MENU = [
  { title: "Earn", href: "/app" },
  { title: "Blog", href: "http://blog.nectafi.xyz" },
  { title: "Docs", href: "http://blog.nectafi.xyz/docs" },
] as const;

export const FOOTER_MENU = {
  Product: [
    { title: "Earn", href: "/app" },
    { title: "Blog", href: "http://blog.nectafi.xyz" },
    { title: "Docs", href: "http://blog.nectafi.xyz/docs" },
  ],
  Legal: [
    { title: "Privacy Policy", href: "/legal/privacy" },
    { title: "Terms of Service", href: "/legal/terms" },
  ],
  Community: [
    { title: "X", href: "https://x.com/NectaFi_AI" },
    { title: "Github", href: "https://github.com/NectaFi" },
  ],
} as const;

export const GETTING_STARTED_STEPS = [
  {
    number: 1,
    title: "Connect Wallet & Deploy Your Smart Account",
    description:
      "Launch the app, connect your wallet, and deploy a secure Smart Account for automated yield optimization.",
  },
  {
    number: 2,
    title: "Deposit Assets & Activate Agents",
    description:
      "Deposit USDC and activate NectaFi's intelligent agents to optimize your yield across DeFi protocols.",
  },
  {
    number: 3,
    title: "Track Profits & Withdraw Anytime",
    description:
      "Monitor real-time performance and withdraw your funds at any time with full self-custody.",
  },
] as const;

export const FEATURES = [
  {
    id: "ai-automation",
    icon: Bot,
    title: "Multi-Agent Intelligence",
    description:
      "Three specialized AI agents collaborate to automatically optimize yields across multiple protocols, securing the highest APYs with ease.",
    badge: "Smart",
  },
  {
    id: "yield-optimization",
    icon: LineChart,
    title: "Automated Rebalancing",
    description:
      "NectaFi's AI agents dynamically monitor and rebalance your portfolio in real time to maximize returns—zero manual effort required.",
    badge: "Efficient",
  },
  {
    id: "risk-management",
    icon: Shield,
    title: "Secure & Self-Custodial",
    description:
      "Complete security and control, allowing you to maintain full custody of your assets.",
    badge: "Secure",
  },
  {
    id: "seamless-integration",
    icon: Wallet,
    title: "Seamless Yield Optimization",
    description:
      "NectaFi makes earning yield easy, adaptive, and stress-free for both seasoned DeFi users and newcomers.",
    badge: "Easy",
  },
] as const;

export const FAQS = [
  {
    id: "what-is-necta",
    question: "What is NectaFi?",
    answer:
      "Necta Finance automatically manages your stablecoins across DeFi protocols to get you the best yields, while keeping your assets safe and secure.",
  },
  {
    id: "how-it-works",
    question: "How does Necta work?",
    answer:
      "Our intelligent agents continuously monitor yield opportunities across major DeFi protocols. When better rates are available, your funds are automatically moved to capture the highest yields, all while maintaining your preferred risk parameters.",
  },
  {
    id: "how-to-use",
    question: "How do I use Necta?",
    answer:
      "Getting started with Necta is simple: 1) Connect your wallet, 2) Deploy Smart Account, 3) Deposit your assets, 4) Activate NectaFi's agents, and 5) Let our AI agents optimize your yields. You can monitor your portfolio and withdraw at any time.",
  },
  {
    id: "risks",
    question: "Is it safe?",
    answer:
      "NectaFi is fully on-chain and self-custodial, meaning you maintain full control of your assets. We implement robust security measures and risk management protocols to ensure the safety of your funds.",
  },
  {
    id: "fees",
    question: "What are the fees?",
    answer:
      "We charge a performance fee of 10% on the yields generated. There are no deposit, withdrawal, or management fees. You only pay when you earn, and our success is aligned with yours.",
  },
  {
    id: "assets",
    question: "What assets are supported?",
    answer:
      "Currently, NectaFi supports USDC, and DAI. We will expand to more assets in the future.",
  },
] as const;
