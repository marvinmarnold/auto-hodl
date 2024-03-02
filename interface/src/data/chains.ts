import { SupportedChain } from "../interfaces";

export const chainList: SupportedChain[] = [
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
	// // ********** Optimism ********** //
	// {
	// 	name: "Optimism",
	// 	imageSource: "/images/iconOptimism.svg",
	// 	nativeCurrency: {
	// 		symbol: "ETH",
	// 		decimals: 18,
	// 	},
	// 	blockExplorer: "https://optimistic.etherscan.io",
	// 	chainId: 10,
	// 	isTestnet: false,
	// },
	// // ********** Polygon ********** //
	// {
	// 	name: "Polygon",
	// 	imageSource: "/images/iconPolygon.svg",
	// 	nativeCurrency: {
	// 		symbol: "MATIC",
	// 		decimals: 18,
	// 	},
	// 	blockExplorer: "https://polygonscan.com",
	// 	chainId: 137,
	// 	isTestnet: false,
	// },
	// // ********** BNB Smart Chain ********** //
	// {
	// 	name: "BNB Smart Chain",
	// 	imageSource: "/images/iconBsc.svg",
	// 	nativeCurrency: {
	// 		symbol: "BNB",
	// 		decimals: 18,
	// 	},
	// 	blockExplorer: "https://bscscan.com",
	// 	chainId: 56,
	// 	isTestnet: false,
	// },
	// // ********** Gnosis ********** //
	// {
	// 	name: "Gnosis",
	// 	imageSource: "/images/iconGnosis.svg",
	// 	nativeCurrency: {
	// 		symbol: "XDAI",
	// 		decimals: 18,
	// 	},
	// 	blockExplorer: "https://gnosisscan.io",
	// 	chainId: 100,
	// 	isTestnet: false,
	// },
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
	// // ********** Optimism Sepolia ********** //
	// {
	// 	name: "Optimism Sepolia",
	// 	imageSource: "/images/iconOptimism.svg",
	// 	nativeCurrency: {
	// 		symbol: "ETH",
	// 		decimals: 18,
	// 	},
	// 	blockExplorer: "https://sepolia-optimism.etherscan.io",
	// 	chainId: 11155420,
	// 	isTestnet: true,
	// },
	// // ********** Polygon Mumbai ********** //
	// {
	// 	name: "Polygon Mumbai",
	// 	imageSource: "/images/iconPolygon.svg",
	// 	nativeCurrency: {
	// 		symbol: "MATIC",
	// 		decimals: 18,
	// 	},
	// 	blockExplorer: "https://mumbai.polygonscan.com",
	// 	chainId: 80001,
	// 	isTestnet: true,
	// },
	// // ********** Arbitrum One ********** //
	{
		name: "Arbitrum One",
		imageSource: "/images/iconArbitrumOne.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://arbiscan.io",
		chainId: 42161,
		isTestnet: false,
	},
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
	// // ********** Scroll ********** //
	// {
	// 	name: "Scroll",
	// 	imageSource: "/images/iconScroll.svg",
	// 	blockExplorer: "https://scrollscan.com",
	// 	nativeCurrency: {
	// 		symbol: "ETH",
	// 		decimals: 18,
	// 	},
	// 	chainId: 534352,
	// 	isTestnet: false,
	// },
	// // ********** Avalanche C-Chain ********** //
	// {
	// 	name: "Avalanche C-Chain",
	// 	imageSource: "/images/iconAvalanche.svg",
	// 	nativeCurrency: {
	// 		symbol: "AVAX",
	// 		decimals: 18,
	// 	},
	// 	blockExplorer: "https://snowtrace.io",
	// 	chainId: 43114,
	// 	isTestnet: false,
	// },
	// // ********** Celo ********** //
	// {
	// 	name: "Celo",
	// 	imageSource: "/images/iconCelo.svg",
	// 	nativeCurrency: {
	// 		symbol: "CELO",
	// 		decimals: 18,
	// 	},
	// 	blockExplorer: "https://celoscan.io",
	// 	chainId: 42220,
	// 	isTestnet: false,
	// },
	// // ********** Fantom ********** //
	// {
	// 	name: "Fantom",
	// 	imageSource: "/images/iconFantom.svg",
	// 	blockExplorer: "https://ftmscan.com",
	// 	nativeCurrency: {
	// 		symbol: "FTM",
	// 		decimals: 18,
	// 	},
	// 	chainId: 250,
	// 	isTestnet: false,
	// },
];
