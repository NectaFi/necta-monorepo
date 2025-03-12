import { describe, it, expect } from 'bun:test'
import { isReallocationViable, calculateExpectedAnnualGain, DEFAULT_REALLOCATION_THRESHOLDS } from '../config/reallocation-thresholds'

describe('Reallocation Thresholds', () => {
  describe('calculateExpectedAnnualGain', () => {
    it('should calculate the expected annual gain correctly', () => {
      // $1000 position with 2% APY improvement
      const gain = calculateExpectedAnnualGain(1000, 3, 5)
      expect(gain).toBe(20) // $20 annual gain
    })

    it('should handle negative APY changes', () => {
      // $1000 position with -1% APY change (worse APY)
      const gain = calculateExpectedAnnualGain(1000, 5, 4)
      expect(gain).toBe(-10) // -$10 annual gain (a loss)
    })
  })

  describe('isReallocationViable', () => {
    it('should reject reallocation when position value is too small', () => {
      const result = isReallocationViable(
        50, // $50 position (below $100 minimum)
        3,  // 3% current APY
        6,  // 6% new APY
        48  // 48 hours position age
      )

      expect(result.viable).toBe(false)
      expect(result.reason).toContain('below minimum threshold')
      expect(result.reason).toContain('value')
    })

    it('should reject reallocation when position age is too short', () => {
      const result = isReallocationViable(
        1000, // $1000 position
        3,    // 3% current APY
        6,    // 6% new APY
        12    // 12 hours position age (below 24 hours minimum)
      )

      expect(result.viable).toBe(false)
      expect(result.reason).toContain('below minimum holding period')
    })

    it('should reject reallocation when APY improvement is too small', () => {
      const result = isReallocationViable(
        1000, // $1000 position
        4,    // 4% current APY
        4.5,  // 4.5% new APY (below 1.5% minimum improvement)
        48    // 48 hours position age
      )

      expect(result.viable).toBe(false)
      expect(result.reason).toContain('APY improvement')
      expect(result.reason).toContain('below minimum threshold')
    })

    it('should reject reallocation when gain-to-cost ratio is too low', () => {
      // Custom thresholds to test gain-to-cost ratio specifically
      const customThresholds = {
        ...DEFAULT_REALLOCATION_THRESHOLDS,
        MIN_APY_IMPROVEMENT: 1, // Lower this to test gain-to-cost ratio
        ESTIMATED_GAS_COST_USD: 10, // Higher gas cost
        MIN_GAIN_TO_COST_RATIO: 5 // Higher ratio requirement
      }

      const result = isReallocationViable(
        200,  // $200 position
        3,    // 3% current APY
        4.5,  // 4.5% new APY (1.5% improvement)
        48,   // 48 hours position age
        customThresholds
      )

      // Expected annual gain: $3 (1.5% of $200)
      // Gain-to-cost ratio: 0.3 ($3/$10)
      expect(result.viable).toBe(false)
      expect(result.reason).toContain('Gain-to-cost ratio')
      expect(result.reason).toContain('below minimum threshold')
    })

    it('should approve reallocation when all criteria are met', () => {
      const result = isReallocationViable(
        1000, // $1000 position
        3,    // 3% current APY
        5,    // 5% new APY (2% improvement)
        48    // 48 hours position age
      )

      // Expected annual gain: $20 (2% of $1000)
      // Gain-to-cost ratio: 4 ($20/$5)
      expect(result.viable).toBe(true)
      expect(result.reason).toContain('economically viable')
      expect(result.reason).toContain('expected annual gain')
    })
  })
})
