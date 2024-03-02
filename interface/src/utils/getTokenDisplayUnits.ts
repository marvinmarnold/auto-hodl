import { formatUnits } from "./formatUnits";
import { getMinimumFractionDigits } from "./getMinimumFractionDigits";

export const getTokenDisplayUnits = (
	amount: bigint,
	tokenDecimals: number
): string => {
	// amount needs to be in base units
	// returns a formatted string in display units
	const rawAmountString = formatUnits(amount, tokenDecimals);
	const formattedAmountString = parseFloat(rawAmountString).toLocaleString(
		"en-US",
		{
			minimumFractionDigits: getMinimumFractionDigits(
				parseFloat(rawAmountString)
			),
		}
	);

	return formattedAmountString;
};
