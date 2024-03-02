import type { EIP1193Provider, WalletClient } from "../../resources";

export type { EIP1193Provider, WalletClient };

export enum WalletType {
	METAMASK = "metaMask",
	INJECTED = "injected",
	WALLETCONNECT = "walletConnect",
	COINBASE = "coinbaseWallet",
}

export type Wallet = {
	type: WalletType;
	label: string;
	imageSource: string;
};

export type Network = {
	chainId: number;
	isSupported: boolean;
};

export type Ens = {
	name: string | null;
	avatar: string | null;
};

// The 'value' property is of type 'string' because the bigint type cannot
// be stored in Redux. Whenever 'value' is fetched from Redux in the app,
// it must be casted to bigint using BigInt().
export type Balance = {
	decimals: number;
	formatted: string;
	symbol: string;
	value: string;
};

export interface WalletState {
	isWalletConnected: boolean;
	address: `0x${string}` | null;
	nativeBalance: Balance | null;
	currentWallet: Wallet | null;
	currentNetwork: Network | null;
	ens: Ens | null;
}

export interface IUpdateConnectionStatus {
	type: "UPDATE_CONNECTION_STATUS";
	payload: boolean;
}

export interface IUpdateCurrentWallet {
	type: "UPDATE_CURRENT_WALLET";
	payload: Wallet | null;
}

export interface IUpdateAddress {
	type: "UPDATE_ADDRESS";
	payload: `0x${string}` | null;
}

export interface IUpdateNativeBalance {
	type: "UPDATE_NATIVE_BALANCE";
	payload: Balance | null;
}

export interface IUpdateCurrentNetwork {
	type: "UPDATE_CURRENT_NETWORK";
	payload: Network | null;
}

export interface IUpdateEns {
	type: "UPDATE_ENS";
	payload: Ens | null;
}

export type WalletActions =
	| IUpdateConnectionStatus
	| IUpdateCurrentWallet
	| IUpdateAddress
	| IUpdateNativeBalance
	| IUpdateCurrentNetwork
	| IUpdateEns;
