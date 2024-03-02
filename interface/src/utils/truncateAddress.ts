export const truncateAddress = (address: `0x${string}`): string => {
	if (!address) return "No Account";
	const match = address.match(
		/^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{5})$/
	);
	if (!match) return address;
	return `${match[1]}...${match[2]}`;
};
