import { parseUnits } from "../resources";

export const getTokenBaseUnits = (
	amount: string,
	tokenDecimals: number
): bigint =>
	// amount needs to be in display units (e.g., 3.16546489)
	// returns a bigint in base units
	parseUnits(amount, tokenDecimals);
