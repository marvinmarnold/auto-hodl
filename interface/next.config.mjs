/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		// ********* PRIVATE ********* //
		PRIVATE_ETHEREUM_RPC: process.env.PRIVATE_ETHEREUM_RPC,
		PRIVATE_ARBITRUM_SEPOLIA_RPC: process.env.PRIVATE_ARBITRUM_SEPOLIA_RPC,
		PRIVATE_BASE_RPC: process.env.PRIVATE_BASE_RPC,
		PRIVATE_SEPOLIA_RPC: process.env.PRIVATE_SEPOLIA_RPC,
		WC_PROJECT_ID: process.env.WC_PROJECT_ID,
		PRIVATE_LINEA_RPC: process.env.PRIVATE_LINEA_RPC,
		PRIVATE_XDC_RPC: process.env.PRIVATE_XDC_RPC,
		PRIVATE_INCO_RPC: process.env.PRIVATE_INCO_RPC,
		PRIVATE_INJECTIVE_RPC: process.env.PRIVATE_INJECTIVE_RPC,
		PRIVATE_FHENIX_RPC: process.env.PRIVATE_FHENIX_RPC,
		// ********* PUBLIC ********* //
		// APP_URL: "https://test.io",
		// DOCS_URL: "https://docs.io",
	},
};

export default nextConfig;
