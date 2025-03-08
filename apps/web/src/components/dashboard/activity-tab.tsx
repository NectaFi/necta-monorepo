"use client";

import { formatCurrency, cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, AlertCircle } from "lucide-react";

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'rebalance' | 'alert';
  amount?: number;
  asset?: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  agent?: 'sentinel' | 'curator' | 'executor';
  txHash?: string;
}

interface ActivityTabProps {
  transactions: Transaction[];
}

export function ActivityTab({ transactions }: ActivityTabProps) {
  // Sort transactions by timestamp (newest first)
  const sortedTransactions = [...transactions].sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>

      {sortedTransactions.length === 0 ? (
        <div className="text-center py-12 bg-zinc-800/70 border border-white/[0.08] rounded-xl">
          <p className="text-white/60">No activity yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTransactions.map((transaction) => (
            <ActivityItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}

interface ActivityItemProps {
  transaction: Transaction;
}

function ActivityItem({ transaction }: ActivityItemProps) {
  const { type, amount, asset, timestamp, status, description, agent, txHash } = transaction;

  // Format date
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Get icon based on transaction type
  const getIcon = () => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
      case 'withdraw':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      case 'rebalance':
        return <RefreshCw className="h-5 w-5 text-[#F29600]" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  // Get agent name
  const getAgentName = () => {
    switch (agent) {
      case 'sentinel':
        return 'Sentinel';
      case 'curator':
        return 'Curator';
      case 'executor':
        return 'Executor';
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "p-4 rounded-xl border border-white/[0.08] bg-zinc-800/70 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]",
      status === 'pending' && "border-yellow-500/30 bg-yellow-500/[0.03]",
      status === 'failed' && "border-red-500/30 bg-red-500/[0.03]"
    )}>
      <div className="flex items-start">
        <div className="p-2 rounded-full bg-white/5 mr-3">
          {getIcon()}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-white">{description}</p>
              {agent && (
                <p className="text-xs text-white/60 mt-1">
                  Via {getAgentName()} Agent
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {amount && asset ? (
                  <>
                    {type === 'withdraw' ? '-' : '+'}{amount.toFixed(asset === 'ETH' ? 6 : 2)} {asset}
                  </>
                ) : (
                  <span className="text-white/60">—</span>
                )}
              </p>
              {amount && asset && (
                <p className="text-xs text-white/60">
                  {formatCurrency(amount * (asset === 'ETH' ? 1800 : 1))}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center">
              <p className="text-xs text-white/60">
                {formattedDate} at {formattedTime}
              </p>
              {status === 'pending' && (
                <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full bg-yellow-500/10 text-yellow-500">
                  Pending
                </span>
              )}
              {status === 'failed' && (
                <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full bg-red-500/10 text-red-500">
                  Failed
                </span>
              )}
            </div>

            {txHash && (
              <button
                className="text-xs text-white/40 hover:text-white/60"
                onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
              >
                View Transaction
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
