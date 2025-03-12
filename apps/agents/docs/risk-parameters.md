# Risk Parameters

## Overview

The Risk Parameters feature enhances the agent system by incorporating risk assessment into investment decisions. This allows the agents to make more balanced decisions that consider both yield (APY) and risk when evaluating opportunities.

## Key Components

1. **Risk Levels**

    - **Low**: Well-established protocols with strong security records
    - **Medium**: Established protocols with good security but potentially higher complexity
    - **High**: Newer or more experimental protocols with less established security records

2. **Risk Information in Market Data**

    - Each protocol is assigned a risk level
    - Risk levels are displayed alongside APY in market reports
    - Agents consider both APY and risk when making recommendations

3. **Protocol Filtering**
    - The system can exclude high-risk protocols from consideration
    - Configurable minimum and maximum APY thresholds

## Implementation Details

The risk parameters are integrated into the market data retrieval process:

```typescript
export const getMarketData = async (
	minApy: number = 3,
	maxApy: number = 60,
	excludedProtocols: string[] = []
) => {
	// Fetch data from Portals API
	// Filter by approved protocols
	// Add risk information to each token
	// Return formatted data
}
```

## Agent Integration

The sentinel agent has been updated to:

-   Display risk levels alongside APY in market reports
-   Consider risk when evaluating opportunities
-   Make recommendations that balance yield and risk

## Example Output

```
[Morpho Seamless USDC Vault] APY: 7.296% - Risk: Low - TVL: $25.83M
[Fluid USD Coin] APY: 7.456% - Risk: Medium - TVL: $12.21M
```

## Benefits

1. **Better Decision Making**: Agents can make more balanced decisions by considering both yield and risk
2. **Transparency**: Users can see the risk assessment for each protocol
3. **Safety**: Helps prevent allocation to high-risk protocols with unsustainable yields

## Future Improvements

-   Dynamic risk scoring based on multiple factors
-   User-configurable risk tolerance settings
-   Historical risk performance tracking
