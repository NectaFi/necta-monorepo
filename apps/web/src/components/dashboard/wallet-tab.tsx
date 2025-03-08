"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface WalletToken {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  icon: string;
}

interface WalletTabProps {
  address: string;
  tokens: WalletToken[];
}

export function WalletTab({ address, tokens }: WalletTabProps) {
  // Calculate total wallet value
  const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  const handleViewOnExplorer = () => {
    window.open(`https://etherscan.io/address/${address}`, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Wallet Address */}
      <div className="bg-zinc-800/70 border border-white/[0.08] rounded-xl p-5">
        <p className="text-sm text-white/60 mb-2">Smart Account Address</p>
        <div className="flex items-center">
          <code className="text-sm bg-white/5 p-2 rounded text-white/90 flex-1 overflow-hidden overflow-ellipsis">
            {address}
          </code>
          <div className="flex ml-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/60 hover:text-white/90"
              onClick={handleCopyAddress}
              title="Copy address"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/60 hover:text-white/90"
              onClick={handleViewOnExplorer}
              title="View on Etherscan"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Wallet Balance */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Wallet Balance</h3>
        <Card className="rounded-xl border border-white/[0.08] bg-zinc-800/70 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-white/60">Total Value</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totalValue)}</p>
            </div>

            <div className="space-y-4">
              {tokens.map((token) => (
                <TokenRow key={token.symbol} token={token} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supported Tokens */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Supported Tokens</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tokens.map((token) => (
            <Card key={token.symbol} className="rounded-xl border border-white/[0.08] bg-zinc-800/70 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]">
              <CardContent className="p-4 flex items-center">
                <div className="relative h-8 w-8 mr-3">
                  <Image
                    src={token.icon}
                    alt={`${token.name} icon`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{token.symbol}</p>
                  <p className="text-xs text-white/60">{token.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TokenRowProps {
  token: WalletToken;
}

function TokenRow({ token }: TokenRowProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
      <div className="flex items-center">
        <div className="relative h-8 w-8 mr-3">
          <Image
            src={token.icon}
            alt={`${token.name} icon`}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{token.symbol}</p>
          <p className="text-xs text-white/60">{token.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-white">{token.balance.toFixed(token.symbol === 'ETH' ? 6 : 2)} {token.symbol}</p>
        <p className="text-xs text-white/60">{formatCurrency(token.value)}</p>
      </div>
    </div>
  );
}
