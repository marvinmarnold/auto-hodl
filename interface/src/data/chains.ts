import { SupportedChain } from "../interfaces";

export const chainList: SupportedChain[] = [
	// ********** Base ********** //
	{
		name: "Base",
		imageSource: "/images/iconBase.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://basescan.org",
		chainId: 8453,
		isTestnet: false,
	},
	// // ********** Arbitrum Sepolia ********** //
	{
		name: "Arbitrum Sepolia",
		imageSource: "/images/iconArbitrumOne.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://arbiscan.io",
		chainId: 421614,
		isTestnet: false,
	},
	// ********** Linea ********** //
	{
		name: "Linea",
		imageSource: "/images/iconLinea.jpg",
		blockExplorer: "https://lineascan.build",
		nativeCurrency: {
			symbol: "LIN",
			decimals: 18,
		},
		chainId: 59144,
		isTestnet: false,
	},

	// ********** XDC ********** //
	{
		name: "XDC",
		imageSource: "/images/iconXdc.png",
		blockExplorer: "https://explorer.apothem.network",
		nativeCurrency: {
			symbol: "XDC",
			decimals: 18,
		},
		chainId: 51,
		isTestnet: true,
	},
	// ********** Injective ********** //
	{
		name: "inEvm Testnet",
		imageSource: "/images/iconInEvm.svg",
		blockExplorer: "https://explorer.injective.network",
		nativeCurrency: {
			symbol: "INJ",
			decimals: 18,
		},
		chainId: 1738,
		isTestnet: true,
	},
	// ********** Inco ********** //
	{
		name: "Inco",
		imageSource: "/images/iconInco.jpg",
		blockExplorer: "https://explorer.testnet.inco.org",
		nativeCurrency: {
			symbol: "INCO",
			decimals: 18,
		},
		chainId: 9090,
		isTestnet: true,
	},
	// ********** Fhenix ********** //
	{
		name: "Fhenix Frontier",
		imageSource: "/images/iconFhenix.jpg",
		blockExplorer: "https://explorer.testnet.fhenix.zone",
		nativeCurrency: {
			symbol: "tFHE",
			decimals: 18,
		},
		chainId: 42069,
		isTestnet: true,
	},
	// ********** Sepolia ********** //
	{
		name: "Sepolia",
		imageSource: "/images/iconEthereum.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://sepolia.etherscan.io",
		chainId: 11155111,
		isTestnet: true,
	},
	// ********** Ethereum ********** //
	{
		name: "Ethereum",
		imageSource: "/images/iconEthereum.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://etherscan.io",
		chainId: 1,
		isTestnet: false,
	},
];
