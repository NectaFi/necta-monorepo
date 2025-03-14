/**
 * This module determines when it's economically viable to move funds between
 * different yield opportunities, considering APY improvement, position age,
 * gas costs, and position size.
 */
import { DEFAULT_THRESHOLDS } from '../utils/constants'
import { recordPositionEntry, getPositionAgeHours } from '../memory/db'

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
 * Determines if reallocating funds is economically viable
 *
 * @param currentValue - Current USD value of the position
 * @param currentApy - Current APY of the position (percentage)
 * @param newApy - New APY of the target position (percentage)
 * @param positionAgeHours - Age of the current position in hours
 * @returns Object containing the reallocation decision and reasoning
 */
export function isReallocationViable(
  currentValue: number,
  currentApy: number,
  newApy: number,
  positionAgeHours: number
): { viable: boolean; reason: string } {
  // Check minimum value threshold
  if (currentValue < DEFAULT_THRESHOLDS.MIN_POSITION_VALUE) {
    return {
      viable: false,
      reason: `Position value ($${currentValue.toFixed(2)}) is below minimum threshold ($${DEFAULT_THRESHOLDS.MIN_POSITION_VALUE})`
    }
  }

  // Check minimum holding period
  if (positionAgeHours < DEFAULT_THRESHOLDS.MIN_HOLDING_PERIOD) {
    return {
      viable: false,
      reason: `Position age (${positionAgeHours.toFixed(1)} hours) is below minimum holding period (${DEFAULT_THRESHOLDS.MIN_HOLDING_PERIOD} hours)`
    }
  }

  // Check APY improvement threshold
  const apyImprovement = newApy - currentApy
  if (apyImprovement < DEFAULT_THRESHOLDS.MIN_APY_IMPROVEMENT) {
    return {
      viable: false,
      reason: `APY improvement (${apyImprovement.toFixed(2)}%) is below minimum threshold (${DEFAULT_THRESHOLDS.MIN_APY_IMPROVEMENT}%)`
    }
  }

  // Calculate expected annual gain
  const expectedAnnualGain = calculateExpectedAnnualGain(currentValue, currentApy, newApy)

  // Calculate gain-to-cost ratio
  const gainToCostRatio = expectedAnnualGain / DEFAULT_THRESHOLDS.GAS_COST_ESTIMATE

  // Check gain-to-cost ratio threshold
  if (gainToCostRatio < DEFAULT_THRESHOLDS.MIN_GAIN_RATIO) {
    return {
      viable: false,
      reason: `Gain-to-cost ratio (${gainToCostRatio.toFixed(2)}) is below minimum threshold (${DEFAULT_THRESHOLDS.MIN_GAIN_RATIO})`
    }
  }

  return {
    viable: true,
    reason: `Reallocation is economically viable with expected annual gain of $${expectedAnnualGain.toFixed(2)} and gain-to-cost ratio of ${gainToCostRatio.toFixed(2)}`
  }
}

// Export the database functions for use in the toolkit
export { recordPositionEntry, getPositionAgeHours }
