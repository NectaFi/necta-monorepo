import type { Hex } from 'viem'
import env from '../env'
import type { SupportedNetwork } from '../utils/networks'
import { DEFAULT_NETWORK } from '../utils/networks'
import { getProtocolRiskLevel } from './risk-scores'
import { APPROVED_PROTOCOLS, DEFAULT_THRESHOLDS, TOKENS } from '../utils/constants'

/**
 * Protocol Inclusion Criteria:
 * 1. Multiple security audits by reputable firms
 * 2. Minimum TVL of $10M
 * 3. At least 6 months in production
 * 4. No major security incidents
 * 5. Non-volatile (exclude AMM pools with high volatility)
 */

/**
 * @dev Gets the balances of an account
 * @param owner - The owner of the account
 * @param network - The network to query (defaults to env.CHAIN_NAME)
 * @returns The balances of the account
 */
export const getAccountBalances = async (owner: Hex, network: SupportedNetwork = DEFAULT_NETWORK) => {
	try {
		const url = `https://api.portals.fi/v2/account?owner=${owner}&networks=${network}`
		console.log(`[getAccountBalances] Fetching from: ${url}`)

		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${env.PORTALS_API_KEY}`,
			},
		})

		if (!response.ok) {
			console.error(`[getAccountBalances] API error: ${response.status}`)
			return { balances: [] } // Return empty array instead of undefined
		}

		const data = await response.json()

		// Check if the response has the expected structure
		if (!data.balances) {
			console.error('[getAccountBalances] Unexpected API response format:', data)
			return { balances: [] } // Return empty array instead of undefined
		}

		return data
	} catch (error) {
		console.error('[getAccountBalances] Error:', error)
		return { balances: [] } // Return empty array instead of undefined
	}
}

/**
 * @dev Gets the market data for USDC
 * @param minApy - Minimum APY threshold (default: 3)
 * @param maxApy - Maximum APY threshold (default: 60)
 * @param excludedProtocols - Additional protocols to exclude (optional)
 * @param network - The network to query (defaults to env.CHAIN_NAME)
 * @param token - The token to search for (defaults to USDC)
 * @returns The market data for USDC opportunities
 */
export const getMarketData = async (
	minApy: number = DEFAULT_THRESHOLDS.MIN_APY,
	maxApy: number = DEFAULT_THRESHOLDS.MAX_APY,
	excludedProtocols: string[] = [],
	network: SupportedNetwork = DEFAULT_NETWORK,
	token: string = TOKENS.USDC
) => {
	const url = `https://api.portals.fi/v2/tokens?networks=${network}&minLiquidity=${DEFAULT_THRESHOLDS.MIN_LIQUIDITY}&minApy=${minApy}&maxApy=${maxApy}&search=${token}`
	console.log('======== fetchTokenData =========')
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${env.PORTALS_API_KEY}`,
		},
	})
	const data = await response.json()

	// Filter to only include approved protocols and exclude user-specified protocols
	if (data.tokens) {
		// First filter the tokens
		data.tokens = data.tokens.filter(
			(token: any) =>
				APPROVED_PROTOCOLS.includes(token.platform) &&
				!excludedProtocols.includes(token.platform)
		)

		// Then add risk level to each token
		data.tokens = data.tokens.map((token: any) => ({
			...token,
			riskLevel: getProtocolRiskLevel(token.platform),
			// We keep the original data from the API (liquidity, addresses, etc.)
		}))
	}

	return {
		usdc: data,
	}
}

/**
 * @dev Gets the market data for multiple protocol/token combinations
 * @param queries - Array of {protocol, token} pairs to check
 * @param minLiquidity - Minimum liquidity threshold
 * @param minApy - Minimum APY threshold
 * @param maxApy - Maximum APY threshold
 * @param network - The network to query (defaults to env.CHAIN_NAME)
 * @returns The market data for the specified positions
 */
export const getPositionData = async (
	queries: Array<{ protocol: string; token: string }>,
	minLiquidity: number = DEFAULT_THRESHOLDS.MIN_LIQUIDITY,
	minApy: number = DEFAULT_THRESHOLDS.MIN_APY,
	maxApy: number = DEFAULT_THRESHOLDS.MAX_APY,
	network: SupportedNetwork = DEFAULT_NETWORK
) => {
	// Filter queries to only include approved protocols
	const filteredQueries = queries.filter(
		({ protocol }) => APPROVED_PROTOCOLS.includes(protocol)
	)

	try {
		const results = await Promise.all(
			filteredQueries.map(async ({ protocol, token }) => {
				const url = `https://api.portals.fi/v2/tokens?networks=${network}&platforms=${protocol}&minLiquidity=${minLiquidity}&minApy=${minApy}&maxApy=${maxApy}&search=${token}`
				console.log('======== fetchPositionData ========')
				const response = await fetch(url, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${env.PORTALS_API_KEY}`,
					},
				});
				const data = await response.json();

				// Add risk level to the result
				return {
					protocol,
					token,
					data,
					riskLevel: getProtocolRiskLevel(protocol),
				};
			})
		)
		return results
	} catch (error) {
		console.error('[getPositionData] Error:', error)
		return []
	}
}
