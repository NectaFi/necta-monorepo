# Approved Protocols

## Overview

The Approved Protocols feature implements a curated list of DeFi protocols that meet specific security and reliability criteria. This ensures that the agent system only recommends investments in protocols with strong security records, protecting users from higher-risk options.

## Key Components

1. **Protocol Filtering**

    - Filters market data to only include approved protocols
    - Excludes high-risk or experimental protocols
    - Ensures all recommendations meet minimum security standards

2. **Configurable Parameters**
    - Minimum APY threshold (default: 3%)
    - Maximum APY threshold (default: 60%)
    - Excluded protocols list

## Implementation Details

The approved protocols filtering is integrated into the market data retrieval process:

```typescript
export const getMarketData = async (
	minApy: number = 3,
	maxApy: number = 60,
	excludedProtocols: string[] = []
) => {
	// Fetch data from Portals API

	// Filter to only include approved protocols
	if (data.tokens) {
		data.tokens = data.tokens.filter((token) => !excludedProtocols.includes(token.platform))
	}

	return {
		usdc: data,
	}
}
```

## Protocol Inclusion Criteria

Protocols are included in the approved list based on:

1. Multiple security audits by reputable firms
2. Minimum TVL of $10M
3. At least 6 months in production
4. No major security incidents
5. Non-volatile (exclude AMM pools with high volatility)

## Benefits

1. **Enhanced Security**: Protects users from higher-risk protocols
2. **Quality Assurance**: Ensures all recommendations meet minimum standards
3. **Simplified Decision Making**: Reduces the number of options to consider
4. **Risk Management**: Prevents exposure to protocols with poor security records

## Future Improvements

-   Dynamic protocol scoring based on multiple security factors
-   Tiered approval levels (e.g., Tier 1, Tier 2, Tier 3)
-   Network-specific approved protocol lists
-   Automated security monitoring and alerts
