# Reallocation Thresholds

## Overview

The Reallocation Thresholds feature prevents unnecessary position movements by ensuring that reallocations are only performed when economically beneficial. This feature helps optimize gas costs and prevents excessive trading that could reduce overall returns.

## Key Components

1. **Position Tracking**

    - In-memory storage of positions with timestamps
    - Automatic recording of positions when wallet balances are fetched
    - Functions to calculate position age

2. **Economic Viability Checks**

    - Minimum APY improvement required
    - Minimum holding period
    - Minimum position value
    - Gain-to-cost ratio analysis

3. **Agent Integration**
    - Sentinel agent toolkit includes a `checkReallocationViability` tool
    - System prompts updated to guide agents on using thresholds
    - Hourly checks with appropriate wait times

## Default Thresholds

| Parameter                | Value | Description                                         |
| ------------------------ | ----- | --------------------------------------------------- |
| MIN_APY_IMPROVEMENT      | 1.5%  | Minimum APY improvement required                    |
| MIN_HOLDING_PERIOD_HOURS | 24    | Minimum time to hold a position before reallocation |
| MIN_USD_VALUE            | $100  | Minimum position value to consider reallocation     |
| ESTIMATED_GAS_COST_USD   | $5    | Estimated gas cost for a reallocation transaction   |
| MIN_GAIN_TO_COST_RATIO   | 3     | Minimum ratio of annual gain to gas cost            |

## How It Works

1. When the sentinel agent fetches wallet balances, it automatically records position information
2. When considering a reallocation, the sentinel agent uses the `checkReallocationViability` tool
3. The tool checks if the reallocation meets all threshold criteria
4. The sentinel agent only recommends viable reallocations to the curator agent
5. The curator agent double-checks the viability before approving tasks

## Example Scenarios

### Scenario 1: Small APY Improvement

-   Current position: $1000 at 4% APY
-   New opportunity: 4.5% APY
-   APY improvement: 0.5% (below 1.5% threshold)
-   Annual gain: $5
-   Decision: NOT VIABLE - APY improvement too small

### Scenario 2: Short Holding Period

-   Current position: $1000 at 3% APY
-   New opportunity: 5% APY
-   Position age: 12 hours (below 24 hour threshold)
-   Decision: NOT VIABLE - Position too new

### Scenario 3: Viable Reallocation

-   Current position: $1000 at 3% APY
-   New opportunity: 5% APY
-   Position age: 48 hours
-   APY improvement: 2%
-   Annual gain: $20
-   Gain-to-cost ratio: 4 ($20/$5)
-   Decision: VIABLE - All criteria met

## Future Improvements

For future versions, consider:

1. Persistent storage of position history in a database
2. User-configurable thresholds
3. Dynamic gas cost estimation
4. Protocol-specific thresholds based on complexity
5. Integration with gas price oracles for real-time cost analysis
