import { tool } from 'ai'
import type { Hex } from 'viem'
import { getAccountBalances, getMarketData } from '../../data'
import { z } from 'zod'
import { retrievePastReports } from '../../memory'
import { getPosition, getPositionAgeHours, recordPosition } from '../../data/positions'
import { isReallocationViable } from '../../config/reallocation-thresholds'

export const getSentinelToolkit = (address: Hex) => {
	return {
		getPastReports: tool({
			description:
				'A tool that returns the past reports that contain information about previously executed actions.',
			parameters: z.object({
				question: z
					.string()
					.describe(
						'The question to retrieve past reports for. If you are thinking about performing operations with USDC for example, you could generate a question to ask to your memory.'
					),
			}),
			execute: async ({ question }) => {
				console.log('======== getPastReports Tool =========')
				console.log(`[getPastReports] retrieving past reports with question: ${question}`)
				const reports = await retrievePastReports(question)

				if (!reports || reports.length === 0) {
					return "No past reports found. This is ok, it means that you're thinking about a new operation."
				}

				console.log(`[getPastReports] reports retrieved: ${reports.length}`)

				return reports
					.map(
						(report: any) =>
							`Report containing the operations done the ${report.created_at}:\n${report.content}\n`
					)
					.join('\n')
			},
		}),
		getWalletBalances: tool({
			description: 'A tool that returns the current balances of your wallet.',
			parameters: z.object({}),
			execute: async () => {
				console.log('======== getWalletBalances Tool =========')
				console.log(`[getWalletBalances] fetching token balances for ${address}...`)
				const { balances = [] } = await getAccountBalances(address)

				const tokenBalances = (Array.isArray(balances) ? balances : [])
					.filter(
						(balance: any) =>
							balance.platform === 'native' || balance.platform === 'basic'
					)
					.map(
						(balance: any) =>
							`[${balance.symbol}] balance: ${balance.balance} $${balance.balanceUSD}) - price: $${balance.price}`
					)
					.join('\n')

				// Record positions for reallocation threshold tracking
				balances
					.filter(
						(balance: any) =>
							balance.platform !== 'native' && balance.platform !== 'basic'
					)
					.forEach((balance: any) => {
						recordPosition(
							address as string,
							balance.platform,
							balance.symbol,
							balance.balanceUSD,
							balance.metrics.apy
						)
					})

				const formattedBalances = balances
					.filter(
						(balance: any) =>
							balance.platform !== 'native' && balance.platform !== 'basic'
					)
					.map(
						(balance: any) =>
							`[${balance.symbol}] balance: ${balance.balance} $${
								balance.balanceUSD
							}) on protocol ${balance.platform.replace('-', ' ')} with APY ${
								balance.metrics.apy
							}%`
					)
					.join('\n')

				console.log(`[getWalletBalances] balances fetched correctly.`)
				return `This is the current status of the wallet with address ${address}:\nTokens:\n${tokenBalances}\nOpen positions:\n${formattedBalances}`
			},
		}),
		getMarketData: tool({
			description: 'A tool that returns the current market data for USDC.',
			parameters: z.object({}),
			execute: async () => {
				console.log('======== getMarketData Tool =========')
				console.log(`[getMarketData] fetching market data...`)
				const marketData = await getMarketData()

				const formatTokens = (data: any) => {
					if (!data?.tokens || data.tokens.length === 0) {
						return 'No opportunities found'
					}

					return data.tokens
						.map(
							(token: any) => {
								// Format liquidity to be more readable
								const liquidityInMillions = (token.liquidity / 1000000).toFixed(2)

								// Handle volume metrics - use absolute value since we only care about volume magnitude
								let volume7d = 'N/A'
								if (token.metrics.volumeUsd7d) {
									// Parse the volume, take absolute value, and format
									const volumeValue = Math.abs(parseFloat(token.metrics.volumeUsd7d))
									volume7d = `$${(volumeValue / 1000000).toFixed(2)}M`
								}

								return `[${token.name}] APY: ${token.metrics.apy}% - Risk: ${token.riskLevel} - TVL: $${liquidityInMillions}M - Volume 7d: ${volume7d}`
							}
						)
						.join('\n')
				}

				const usdcFormatted = formatTokens(marketData.usdc)

				console.log(`[getMarketData] market data fetched correctly.`)
				return `These are the current market opportunities:\n\nUSDC Opportunities:\n${usdcFormatted}`
			},
		}),
		checkReallocationViability: tool({
			description: 'A tool that checks if reallocating funds from one protocol to another is economically viable.',
			parameters: z.object({
				currentProtocol: z.string().describe('The protocol where funds are currently allocated'),
				currentToken: z.string().describe('The token symbol (e.g., USDC)'),
				targetProtocol: z.string().describe('The protocol where funds would be reallocated to'),
				targetApy: z.number().describe('The APY of the target protocol (percentage)'),
			}),
			execute: async ({ currentProtocol, currentToken, targetProtocol, targetApy }) => {
				console.log('======== checkReallocationViability Tool =========')
				console.log(`[checkReallocationViability] checking viability for ${currentProtocol} -> ${targetProtocol}`)

				// Get the current position
				const position = getPosition(address as string, currentProtocol, currentToken)

				if (!position) {
					return `No existing position found for ${currentToken} on ${currentProtocol}. Cannot evaluate reallocation.`
				}

				// Calculate position age in hours
				const positionAgeHours = getPositionAgeHours(position)

				// Check if reallocation is viable
				const { viable, reason } = isReallocationViable(
					position.value,
					position.apy,
					targetApy,
					positionAgeHours
				)

				// Format the response
				const response = [
					`Reallocation Analysis: ${currentProtocol} -> ${targetProtocol}`,
					`Current position: ${position.value.toFixed(2)} ${currentToken} at ${position.apy.toFixed(2)}% APY`,
					`Position age: ${positionAgeHours.toFixed(1)} hours`,
					`Target APY: ${targetApy.toFixed(2)}%`,
					`APY improvement: ${(targetApy - position.apy).toFixed(2)}%`,
					`Decision: ${viable ? 'VIABLE' : 'NOT VIABLE'}`,
					`Reason: ${reason}`
				].join('\n')

				console.log(`[checkReallocationViability] completed check: ${viable ? 'VIABLE' : 'NOT VIABLE'}`)
				return response
			},
		}),
		noFurtherActionsTool: tool({
			description: 'A tool that you decide to use when no further actions are needed.',
			parameters: z.object({
				reason: z.string().describe('The reason why no further actions are needed.'),
				waitTime: z
					.number()
					.describe(
						"The time to wait before executing the next action. This number must be logical to the operations you've done."
					),
			}),
		}),
	}
}
