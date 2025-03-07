// Agent types
export interface AgentStatus {
  agent: "sentinel" | "curator" | "executor";
  isActive: boolean;
}

// Thought types
export interface Thought {
  id: string;
  agent: string;
  message: string;
  timestamp: string;
  hash?: string; // Optional transaction hash for on-chain actions
}

// Position types
export interface Position {
  id: string;
  name: string;
  protocol: string;
  value: number;
  apy: number;
  depositDate: string;
}

// Wallet types
export interface WalletData {
  address: string;
  totalValue: number;
  averageApy: number;
  positions: Position[];
}

// Transaction types
export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  asset: string;
  timestamp: string;
  status: 'completed' | 'pending';
  txHash: string;
}
