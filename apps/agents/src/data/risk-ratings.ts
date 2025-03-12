/**
 * Risk ratings for protocols supported by the platform.
 * These ratings are based on security audits, TVL, time in production,
 * and historical security incidents.
 */

export enum RiskLevel {
	LOW = 'Low',
	MEDIUM = 'Medium',
	HIGH = 'High',
}

/**
 * Risk level assignments for approved protocols
 * We only need to define the risk level here, as other data comes from the API
 */
export const PROTOCOL_RISK_LEVELS: Record<string, RiskLevel> = {
	aavev3: RiskLevel.LOW,
	'compound-v3': RiskLevel.LOW,
	morpho: RiskLevel.LOW,
	moonwell: RiskLevel.LOW,
	euler: RiskLevel.MEDIUM,
	fluid: RiskLevel.MEDIUM,
}

/**
 * Get risk level for a protocol
 * @param protocol Protocol identifier
 * @returns Risk level or HIGH if not found
 */
export function getProtocolRiskLevel(protocol: string): RiskLevel {
	return PROTOCOL_RISK_LEVELS[protocol] || RiskLevel.HIGH;
}
