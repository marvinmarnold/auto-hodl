import { Wallet, WalletType } from "../interfaces";

export const walletList: Wallet[] = [
	{
		type: WalletType.INJECTED,
		label: "Browser",
		imageSource: "/images/iconInjected.svg",
	},
	{
		type: WalletType.METAMASK,
		label: "Metamask",
		imageSource: "/images/iconMetamask.svg",
	},
	{
		type: WalletType.WALLETCONNECT,
		label: "WalletConnect",
		imageSource: "/images/iconWalletConnect.svg",
	},
	{
		type: WalletType.COINBASE,
		label: "Coinbase",
		imageSource: "/images/iconCoinbase.svg",
	},
];
