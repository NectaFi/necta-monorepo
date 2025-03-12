/**
 * Utility functions for tracking position history and calculating position age
 */

import { z } from 'zod'

// Define the position schema
export const PositionSchema = z.object({
  protocol: z.string(),
  token: z.string(),
  value: z.number(),
  apy: z.number(),
  timestamp: z.number()
})

export type Position = z.infer<typeof PositionSchema>

// In-memory storage for positions (for Beta V1)
// In a production environment, this would be stored in a database
const positionHistory: Record<string, Position[]> = {}

/**
 * Records a new position or updates an existing one
 * @param address - Wallet address
 * @param protocol - Protocol name
 * @param token - Token symbol
 * @param value - USD value of the position
 * @param apy - Current APY of the position
 * @returns The recorded position
 */
export function recordPosition(
  address: string,
  protocol: string,
  token: string,
  value: number,
  apy: number
): Position {
  const position: Position = {
    protocol,
    token,
    value,
    apy,
    timestamp: Date.now()
  }

  // Initialize position history for this address if it doesn't exist
  if (!positionHistory[address]) {
    positionHistory[address] = []
  }

  // Find existing position with the same protocol and token
  const existingIndex = positionHistory[address].findIndex(
    p => p.protocol === protocol && p.token === token
  )

  if (existingIndex >= 0) {
    // Update existing position
    positionHistory[address][existingIndex] = position
  } else {
    // Add new position
    positionHistory[address].push(position)
  }

  return position
}

/**
 * Gets the current positions for an address
 * @param address - Wallet address
 * @returns Array of current positions
 */
export function getPositions(address: string): Position[] {
  return positionHistory[address] || []
}

/**
 * Gets a specific position by protocol and token
 * @param address - Wallet address
 * @param protocol - Protocol name
 * @param token - Token symbol
 * @returns The position if found, undefined otherwise
 */
export function getPosition(
  address: string,
  protocol: string,
  token: string
): Position | undefined {
  if (!positionHistory[address]) return undefined

  return positionHistory[address].find(
    p => p.protocol === protocol && p.token === token
  )
}

/**
 * Calculates the age of a position in hours
 * @param position - The position to calculate age for
 * @returns Age in hours, or 0 if position is undefined
 */
export function getPositionAgeHours(position?: Position): number {
  if (!position) return 0

  const ageMs = Date.now() - position.timestamp
  return ageMs / (1000 * 60 * 60) // Convert ms to hours
}

/**
 * Removes a position from the history
 * @param address - Wallet address
 * @param protocol - Protocol name
 * @param token - Token symbol
 * @returns True if position was removed, false otherwise
 */
export function removePosition(
  address: string,
  protocol: string,
  token: string
): boolean {
  if (!positionHistory[address]) return false

  const initialLength = positionHistory[address].length
  positionHistory[address] = positionHistory[address].filter(
    p => !(p.protocol === protocol && p.token === token)
  )

  return positionHistory[address].length < initialLength
}
