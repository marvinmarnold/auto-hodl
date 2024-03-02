/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		// ********* PRIVATE ********* //
		// PRIVATE_ETHEREUM_RPC: process.env.PRIVATE_ETHEREUM_RPC,
		// PRIVATE_OPTIMISM_RPC: process.env.PRIVATE_OPTIMISM_RPC,
		// PRIVATE_ARBITRUM_ONE_RPC: process.env.PRIVATE_ARBITRUM_ONE_RPC,
		// PRIVATE_POLYGON_RPC: process.env.PRIVATE_POLYGON_RPC,
		// PRIVATE_GNOSIS_RPC: process.env.PRIVATE_GNOSIS_RPC,
		// PRIVATE_CELO_RPC: process.env.PRIVATE_CELO_RPC,
		// PRIVATE_AVALANCHE_RPC: process.env.PRIVATE_AVALANCHE_RPC,
		// PRIVATE_FANTOM_RPC: process.env.PRIVATE_FANTOM_RPC,
		// PRIVATE_BSC_RPC: process.env.PRIVATE_BSC_RPC,
		// PRIVATE_BASE_RPC: process.env.PRIVATE_BASE_RPC,
		// PRIVATE_SCROLL_RPC: process.env.PRIVATE_SCROLL_RPC,
		PRIVATE_SEPOLIA_RPC: process.env.PRIVATE_SEPOLIA_RPC,
		// PRIVATE_OPTIMISM_SEPOLIA_RPC: process.env.PRIVATE_OPTIMISM_SEPOLIA_RPC,
		// PRIVATE_POLYGON_MUMBAI_RPC: process.env.PRIVATE_POLYGON_MUMBAI_RPC,
		// PRIVATE_BASE_SEPOLIA_RPC: process.env.PRIVATE_BASE_SEPOLIA_RPC,
		WC_PROJECT_ID: process.env.WC_PROJECT_ID,

		// ********* PUBLIC ********* //
		// APP_URL: "https://test.io",
		// DOCS_URL: "https://docs.io",
	},
};

export default nextConfig;
