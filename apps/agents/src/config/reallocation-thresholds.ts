/**
 * Configuration for reallocation thresholds
 * These thresholds determine when it's economically viable to reallocate funds
 */

/**
 * Default thresholds for reallocation decisions
 */
export const DEFAULT_REALLOCATION_THRESHOLDS = {
  // Minimum APY improvement required to consider reallocation (percentage points)
  MIN_APY_IMPROVEMENT: 1.5,

  // Minimum holding period before considering reallocation (in hours)
  MIN_HOLDING_PERIOD_HOURS: 24,

  // Minimum USD value required to consider reallocation
  MIN_USD_VALUE: 100,

  // Estimated gas cost for reallocation (in USD)
  ESTIMATED_GAS_COST_USD: 5,

  // Minimum gain-to-cost ratio required for reallocation
  // (Expected annual gain / Gas cost)
  MIN_GAIN_TO_COST_RATIO: 3
}

/**
 * Calculates the expected annual gain from a reallocation
 * @param currentValue - Current USD value of the position
 * @param currentApy - Current APY of the position (percentage)
 * @param newApy - New APY of the target position (percentage)
 * @returns Expected annual gain in USD
 */
export function calculateExpectedAnnualGain(
  currentValue: number,
  currentApy: number,
  newApy: number
): number {
  const apyImprovement = newApy - currentApy
  return (currentValue * apyImprovement) / 100
}

/**
 * Checks if a reallocation meets the minimum thresholds
 * @param currentValue - Current USD value of the position
 * @param currentApy - Current APY of the position (percentage)
 * @param newApy - New APY of the target position (percentage)
 * @param positionAgeHours - Age of the current position in hours
 * @param thresholds - Optional custom thresholds (defaults to DEFAULT_REALLOCATION_THRESHOLDS)
 * @returns Object containing the reallocation decision and reasoning
 */
export function isReallocationViable(
  currentValue: number,
  currentApy: number,
  newApy: number,
  positionAgeHours: number,
  thresholds = DEFAULT_REALLOCATION_THRESHOLDS
): { viable: boolean; reason: string } {
  // Check minimum value threshold
  if (currentValue < thresholds.MIN_USD_VALUE) {
    return {
      viable: false,
      reason: `Position value ($${currentValue.toFixed(2)}) is below minimum threshold ($${thresholds.MIN_USD_VALUE})`
    }
  }

  // Check minimum holding period
  if (positionAgeHours < thresholds.MIN_HOLDING_PERIOD_HOURS) {
    return {
      viable: false,
      reason: `Position age (${positionAgeHours.toFixed(1)} hours) is below minimum holding period (${thresholds.MIN_HOLDING_PERIOD_HOURS} hours)`
    }
  }

  // Check APY improvement threshold
  const apyImprovement = newApy - currentApy
  if (apyImprovement < thresholds.MIN_APY_IMPROVEMENT) {
    return {
      viable: false,
      reason: `APY improvement (${apyImprovement.toFixed(2)}%) is below minimum threshold (${thresholds.MIN_APY_IMPROVEMENT}%)`
    }
  }

  // Calculate expected annual gain
  const expectedAnnualGain = calculateExpectedAnnualGain(currentValue, currentApy, newApy)

  // Calculate gain-to-cost ratio
  const gainToCostRatio = expectedAnnualGain / thresholds.ESTIMATED_GAS_COST_USD

  // Check gain-to-cost ratio threshold
  if (gainToCostRatio < thresholds.MIN_GAIN_TO_COST_RATIO) {
    return {
      viable: false,
      reason: `Gain-to-cost ratio (${gainToCostRatio.toFixed(2)}) is below minimum threshold (${thresholds.MIN_GAIN_TO_COST_RATIO})`
    }
  }

  return {
    viable: true,
    reason: `Reallocation is economically viable with expected annual gain of $${expectedAnnualGain.toFixed(2)} and gain-to-cost ratio of ${gainToCostRatio.toFixed(2)}`
  }
}
