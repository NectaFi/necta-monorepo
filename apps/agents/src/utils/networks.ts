import * as chains from "viem/chains";
import env from "../env";
import { NETWORKS } from "./constants";

// Get chain object from chain ID
export const getChain = (chainId: number) =>
  Object.values(chains).find((chain) => chain.id === chainId);

// Supported networks
export type SupportedNetwork = typeof NETWORKS[keyof typeof NETWORKS];

// Default network
export const DEFAULT_NETWORK: SupportedNetwork = env.CHAIN_NAME as SupportedNetwork || NETWORKS.BASE;
