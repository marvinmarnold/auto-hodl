export const getMinimumFractionDigits = (amount: number): number => {
	// amount needs to be in display units
	// the numbers below should NOT be BigInts
	if (amount === 0) {
		return 0;
	}
	if (amount > 0 && amount < 1) {
		return 6;
	}
	return 3;
};
