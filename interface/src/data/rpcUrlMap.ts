export const rpcUrlMap: Record<number, string> = {
	1: process.env.PRIVATE_ETHEREUM_RPC!,
	421614: process.env.PRIVATE_ARBITRUM_SEPOLIA_RPC!,
	8453: process.env.PRIVATE_BASE_RPC!,
	11155111: process.env.PRIVATE_SEPOLIA_RPC!,
	59144: process.env.PRIVATE_LINEA_RPC!,
	50: process.env.PRIVATE_XDC_RPC!,
	9090: process.env.PRIVATE_INCO_RPC!,
	1234: process.env.PRIVATE_INJECTIVE_RPC!,
	42069: process.env.PRIVATE_FHENIX_RPC!,
};
