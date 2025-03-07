import { create } from "zustand";
import type { WalletData } from "./types";

// Types
export interface Position {
  protocol: string;
  amount: string;
  value: string;
}

interface StoreState {
  // Wallet & Portfolio state
  walletData: WalletData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchWalletData: () => Promise<void>;
  updateWalletData: (data: WalletData) => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  walletData: null,
  isLoading: false,
  error: null,

  // Actions
  fetchWalletData: async () => {
    set({ isLoading: true, error: null });
    try {
      // This is mock data - will be replaced with actual API call
      const mockWalletData: WalletData = {
        address: "0x1234...5678",
        totalValue: 3500,
        averageApy: 4.15,
        positions: [
          {
            id: "1",
            name: "USDC Yield Strategy",
            protocol: "Aave",
            value: 1000,
            apy: 4.5,
            depositDate: "2024-03-15",
          },
          {
            id: "2",
            name: "ETH Staking",
            protocol: "Lido",
            value: 2500,
            apy: 3.8,
            depositDate: "2024-03-10",
          },
        ],
      };
      set({ walletData: mockWalletData, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch wallet data", isLoading: false });
    }
  },

  updateWalletData: (data) => {
    set({ walletData: data });
  },
}));
