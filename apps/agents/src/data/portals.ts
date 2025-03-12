import type { Hex } from 'viem'
import env from '../env'
import type { PortalsNetwork } from '../utils/chain'
import { DEFAULT_NETWORK } from '../utils/chain'

/**
 * @dev Gets the balances of an account
 * @param owner - The owner of the account
 * @param network - The network to query (defaults to env.CHAIN_NAME)
 * @returns The balances of the account
 */
export const getAccountBalances = async (owner: Hex, network: PortalsNetwork = DEFAULT_NETWORK) => {
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
 * @param network - The network to query (defaults to env.CHAIN_NAME)
 * @returns The market data for USDC opportunities
 */
export const getMarketData = async (
	minApy: number = 3,
	maxApy: number = 60,
	network: PortalsNetwork = DEFAULT_NETWORK
) => {
	const url = `https://api.portals.fi/v2/tokens?networks=${network}&minLiquidity=10000000&minApy=${minApy}&maxApy=${maxApy}&search=usdc`
	console.log('======== fetchTokenData =========')
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${env.PORTALS_API_KEY}`,
		},
	})
	const data = await response.json()

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
	minLiquidity: number = 10000000,
	minApy: number = 3,
	maxApy: number = 60,
	network: PortalsNetwork = DEFAULT_NETWORK
) => {
	const results = await Promise.all(
		queries.map(async ({ protocol, token }) => {
			const url = `https://api.portals.fi/v2/tokens?networks=${network}&platforms=${protocol}&minLiquidity=${minLiquidity}&minApy=${minApy}&maxApy=${maxApy}&search=${token}`
			console.log('======== fetchPositionData ========')
			const response = await fetch(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${env.PORTALS_API_KEY}`,
				},
			});
			const data = await response.json();
			return {
				protocol,
				token,
				data,
			};
		})
	)
	return results
}
