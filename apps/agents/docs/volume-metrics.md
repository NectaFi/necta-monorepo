# Volume Metrics

## Overview

The Volume Metrics feature enhances market data reporting by including trading volume information alongside APY and risk metrics. This provides agents with additional context about protocol activity and liquidity, enabling more informed investment decisions.

## Key Components

1. **Volume Data Integration**

    - Includes 7-day trading volume data for each protocol
    - Formats volume in millions of dollars for readability
    - Handles edge cases like negative or missing volume data

2. **Display Enhancements**
    - Volume metrics are displayed alongside APY, risk level, and TVL
    - Consistent formatting for all numeric values
    - Clear labeling of metrics

## Implementation Details

Volume metrics are integrated into the market data display in the sentinel toolkit:

```typescript
const formatTokens = (data: any) => {
	if (!data?.tokens || data.tokens.length === 0) {
		return 'No opportunities found'
	}

	return data.tokens
		.map((token: any) => {
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
		})
		.join('\n')
}
```

## Example Output

```
[Morpho Seamless USDC Vault] APY: 7.296% - Risk: Low - TVL: $25.83M - Volume 7d: $9.74M
[Fluid USD Coin] APY: 7.456% - Risk: Medium - TVL: $12.21M - Volume 7d: $0.63M
```

## Benefits

1. **Better Context**: Provides insight into protocol activity and adoption
2. **Liquidity Assessment**: Helps identify protocols with sufficient trading volume
3. **Risk Evaluation**: Low volume may indicate lower liquidity and potentially higher risk
4. **Trend Analysis**: Volume changes over time can indicate changing market sentiment

## Implementation Notes

-   Absolute values are used for volume metrics to handle potential negative values in the API response
-   Consistent formatting in millions of dollars makes comparisons easier
-   Graceful handling of missing volume data with "N/A" placeholder

## Future Improvements

-   Historical volume trends (7d, 30d, 90d)
-   Volume change percentage indicators
-   Volume-to-TVL ratio analysis
-   Volume alerts for significant changes
