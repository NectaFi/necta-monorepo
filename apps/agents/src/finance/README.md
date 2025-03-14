# Finance Module

This directory contains financial business logic for the agent system.

## Contents

-   `rebalancer.ts`: Logic for determining when it's economically viable to move funds between different yield opportunities.

## Purpose

The finance module encapsulates business rules related to financial decision-making, separate from the agent implementation details. This separation makes the codebase more maintainable and allows for easier testing of financial logic.

## Usage

Import the functions from this module when you need to make financial decisions in your agent system:

```typescript
import { isReallocationViable } from '../finance/rebalancer'

// Check if reallocation makes economic sense
const { viable, reason } = isReallocationViable(currentValue, currentApy, newApy, positionAgeHours)

if (viable) {
	// Proceed with reallocation
} else {
	// Log reason why reallocation is not viable
	console.log(reason)
}
```
