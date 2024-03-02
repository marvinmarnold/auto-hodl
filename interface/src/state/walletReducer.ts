/* eslint-disable default-param-last */
import { WalletActions, WalletState } from "../interfaces";

const initialState: WalletState = {
	isWalletConnected: false,
	address: null,
	nativeBalance: null,
	currentWallet: null,
	currentNetwork: null,
	ens: null,
};

function walletReducer(
	state: WalletState = initialState,
	action: WalletActions
) {
	switch (action.type) {
		case "UPDATE_CONNECTION_STATUS":
			return { ...state, isWalletConnected: action.payload };
		case "UPDATE_ADDRESS":
			return { ...state, address: action.payload };
		case "UPDATE_NATIVE_BALANCE":
			return { ...state, nativeBalance: action.payload };
		case "UPDATE_CURRENT_WALLET":
			return { ...state, currentWallet: action.payload };
		case "UPDATE_CURRENT_NETWORK":
			return { ...state, currentNetwork: action.payload };
		case "UPDATE_ENS":
			return { ...state, ens: action.payload };
		default:
			return state;
	}
}

export default walletReducer;
