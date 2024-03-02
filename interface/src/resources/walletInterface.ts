import {
	Chain,
	configureChains,
	connect,
	createConfig,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	readContract,
	signMessage,
	switchNetwork,
	waitForTransaction,
	watchAccount,
	watchNetwork,
	writeContract,
} from "@wagmi/core";
import {
	arbitrumSepolia,
	base,
	linea,
	mainnet,
	sepolia,
	xdcTestnet,
} from "@wagmi/core/chains";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { publicProvider } from "@wagmi/core/providers/public";

import { rpcUrlMap } from "../data/rpcUrlMap";

const incoTest = {
	id: 9090,
	name: "Inco Testnet",
	network: "incoTest",
	nativeCurrency: { name: "Inco", symbol: "INCO", decimals: 18 },
	rpcUrls: {
		public: { http: ["https://testnet.inco.org"] },
		default: { http: ["https://testnet.inco.org"] },
	},
	blockExplorers: {
		etherscan: {
			name: "Inco Explorer",
			url: "https://explorer.testnet.inco.org",
		},
		default: {
			name: "Inco Explorer",
			url: "https://explorer.testnet.inco.org",
		},
	},
} as const satisfies Chain;

const inEvmTest = {
	id: 1738,
	name: "inEvm Testnet",
	network: "inEvmTest",
	nativeCurrency: { name: "INJ", symbol: "INJ", decimals: 18 },
	rpcUrls: {
		public: { http: ["https://testnet.rpc.inevm.com/http"] },
		default: { http: ["https://testnet.rpc.inevm.com/http"] },
	},
	blockExplorers: {
		etherscan: {
			name: "Injective Explorer",
			url: "https://explorer.injective.network",
		},
		default: {
			name: "Injective Explorer",
			url: "https://explorer.injective.network",
		},
	},
} as const satisfies Chain;

const fhenixFrontier = {
	id: 42069,
	name: "Fhenix Frontier",
	network: "fhenixFrontier",
	nativeCurrency: { name: "tFHE", symbol: "tFHE", decimals: 18 },
	rpcUrls: {
		public: { http: ["https://api.testnet.fhenix.zone:7747"] },
		default: { http: ["https://api.testnet.fhenix.zone:7747"] },
	},
	blockExplorers: {
		etherscan: {
			name: "Fhenix Explorer",
			url: "https://explorer.testnet.fhenix.zone",
		},
		default: {
			name: "Fhenix Explorer",
			url: "https://explorer.testnet.fhenix.zone",
		},
	},
} as const satisfies Chain;

const { chains, publicClient } = configureChains(
	[
		arbitrumSepolia,
		base,
		mainnet,
		sepolia,
		linea,
		xdcTestnet,
		incoTest,
		inEvmTest,
		fhenixFrontier,
	],
	[
		jsonRpcProvider({
			rpc: (chain: Chain) => ({
				http: rpcUrlMap[chain.id],
			}),
		}),
		publicProvider(),
	]
);

const connectors = [
	new InjectedConnector({
		chains,
		options: {
			shimDisconnect: true,
		},
	}),
	new MetaMaskConnector({
		chains,
		options: {
			shimDisconnect: true,
		},
	}),
	new WalletConnectConnector({
		options: { projectId: process.env.WC_PROJECT_ID },
	}),
	new CoinbaseWalletConnector({
		options: {
			appName: "Auto Hodl",
			darkMode: true,
		},
	}),
];

const walletConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

export {
	connect,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	readContract,
	signMessage,
	switchNetwork,
	waitForTransaction,
	walletConfig,
	watchAccount,
	watchNetwork,
	writeContract,
};
