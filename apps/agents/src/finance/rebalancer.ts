/**
 * This module determines when it's economically viable to move funds between
 * different yield opportunities, considering APY improvement, position age,
 * gas costs, and position size.
 */
import { DEFAULT_THRESHOLDS } from '../utils/constants'
import { z } from 'zod'

// Define the position entry schema
export const PositionEntrySchema = z.object({
  protocol: z.string(),
  token: z.string(),
  timestamp: z.number()
})

export type PositionEntry = z.infer<typeof PositionEntrySchema>

// In-memory storage for position timestamps (for Beta V1)
// In a production environment, this would be stored in a database
const positionEntryTimes: Record<string, PositionEntry[]> = {}

/**
 * Records when a position was first seen or updates an existing entry
 * @param address - Wallet address
 * @param protocol - Protocol name
 * @param token - Token symbol
 * @returns The recorded position entry
 */
export function recordPositionEntry(
  address: string,
  protocol: string,
  token: string
): PositionEntry {
  // Initialize position history for this address if it doesn't exist
  if (!positionEntryTimes[address]) {
    positionEntryTimes[address] = []
  }

  // Find existing position with the same protocol and token
  const existingIndex = positionEntryTimes[address].findIndex(
    p => p.protocol === protocol && p.token === token
  )

  // If position already exists, return it without updating the timestamp
  // This preserves the original entry time
  if (existingIndex >= 0) {
    return positionEntryTimes[address][existingIndex]
  }

  // Create new position entry with current timestamp
  const entry: PositionEntry = {
    protocol,
    token,
    timestamp: Date.now()
  }

  // Add new position entry
  positionEntryTimes[address].push(entry)
  return entry
}

/**
 * Gets the entry timestamp for a specific position
 * @param address - Wallet address
 * @param protocol - Protocol name
 * @param token - Token symbol
 * @returns The position entry if found, undefined otherwise
 */
export function getPositionEntry(
  address: string,
  protocol: string,
  token: string
): PositionEntry | undefined {
  if (!positionEntryTimes[address]) return undefined

  return positionEntryTimes[address].find(
    p => p.protocol === protocol && p.token === token
  )
}

/**
 * Calculates the age of a position in hours
 * @param address - Wallet address
 * @param protocol - Protocol name
 * @param token - Token symbol
 * @returns Age in hours, or 0 if position entry is not found
 */
export function getPositionAgeHours(
  address: string,
  protocol: string,
  token: string
): number {
  const entry = getPositionEntry(address, protocol, token)
  if (!entry) return 0

  const ageMs = Date.now() - entry.timestamp
  return ageMs / (1000 * 60 * 60) // Convert ms to hours
}

/**
 * Removes a position entry from the history
 * @param address - Wallet address
 * @param protocol - Protocol name
 * @param token - Token symbol
 * @returns True if position entry was removed, false otherwise
 */
export function removePositionEntry(
  address: string,
  protocol: string,
  token: string
): boolean {
  if (!positionEntryTimes[address]) return false

  const initialLength = positionEntryTimes[address].length
  positionEntryTimes[address] = positionEntryTimes[address].filter(
    p => !(p.protocol === protocol && p.token === token)
  )

  return positionEntryTimes[address].length < initialLength
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
