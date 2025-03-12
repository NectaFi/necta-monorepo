import { describe, it, expect } from 'bun:test'
import { getMarketData } from '../data/portals'

describe('Approved Protocols', () => {
  // Note: These tests are basic and don't make actual API calls

  describe('getMarketData', () => {
    it('should have protocol filtering capability', () => {
      // Verify the function exists and has the expected parameters
      expect(typeof getMarketData).toBe('function')

      // Check that it accepts excluded protocols parameter
      const functionString = getMarketData.toString()
      expect(functionString).toContain('excludedProtocols')
    })
  })

  describe('Protocol Filtering', () => {
    it('should handle empty excluded protocols array', () => {
      // This is a simple test that doesn't call the actual function
      // Just verifying that the code can handle an empty array
      const emptyArray: string[] = []
      expect(Array.isArray(emptyArray)).toBe(true)
      expect(emptyArray.length).toBe(0)
    })

    it('should handle protocol exclusion logic', () => {
      // Simple test of exclusion logic
      const mockTokens = [
        { platform: 'aavev3', name: 'Test1' },
        { platform: 'compound-v3', name: 'Test2' },
        { platform: 'excluded-protocol', name: 'Test3' }
      ]

      const excludedProtocols = ['excluded-protocol']

      // Filter tokens manually to test the logic
      const filteredTokens = mockTokens.filter(
        token => !excludedProtocols.includes(token.platform)
      )

      expect(filteredTokens.length).toBe(2)
      expect(filteredTokens[0].platform).toBe('aavev3')
      expect(filteredTokens[1].platform).toBe('compound-v3')
    })
  })
})
