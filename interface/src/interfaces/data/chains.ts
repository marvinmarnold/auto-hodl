export type SupportedChain = {
	name: string;
	imageSource: string;
	nativeCurrency: {
		symbol: string;
		decimals: number;
	};
	blockExplorer: string;
	chainId: number;
	isTestnet: boolean;
};
