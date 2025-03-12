import * as chains from "viem/chains";
import env from "../env";

// Get chain object from chain ID
export const getChain = (chainId: number) =>
  Object.values(chains).find((chain) => chain.id === chainId);

// Network names as used by Portals API - only include what we need now and immediate future options
export type PortalsNetwork = "base" | "arbitrum" | "polygon";

// Default network from environment
export const DEFAULT_NETWORK: PortalsNetwork = env.CHAIN_NAME as PortalsNetwork;
