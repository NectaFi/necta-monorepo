/**
 * Formats a large number in millions with M suffix
 */
export function formatInMillions(value: number, fractionDigits: number = 2): string {
  return `$${(value / 1000000).toFixed(fractionDigits)}M`
}
