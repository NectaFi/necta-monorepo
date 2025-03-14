/**
 * Global constants used across the application
 */

// Supported networks - Base is default for V1
export const NETWORKS = {
  BASE: 'base',
  ARBITRUM: 'arbitrum',
  POLYGON: 'polygon'
}

// Supported tokens - USDC only for V1
export const TOKENS = {
  USDC: 'usdc'
}

// Whitelist of pre-approved protocols based on security audits, TVL, reputation, and liquidity
export const APPROVED_PROTOCOLS = [
  'aavev3',
  'compound-v3',
  'morpho',
  'moonwell',
  'euler',
  'fluid',
]

// Default thresholds for various operations
export const DEFAULT_THRESHOLDS = {
  // Market data thresholds
  MIN_APY: 3,                  // Minimum APY to consider an opportunity (%)
  MAX_APY: 60,                 // Maximum APY to consider an opportunity (%)
  MIN_LIQUIDITY: 5000000,      // Minimum liquidity threshold ($5M)

  // Reallocation thresholds
  MIN_APY_IMPROVEMENT: 1.5,    // Minimum APY improvement to consider reallocation (%)
  MIN_HOLDING_PERIOD: 24,      // Minimum holding period before reallocation (hours)
  MIN_POSITION_VALUE: 100,     // Minimum position value to consider reallocation ($)
  GAS_COST_ESTIMATE: 5,        // Estimated gas cost for reallocation ($)
  MIN_GAIN_RATIO: 3            // Minimum annual gain to gas cost ratio
}
