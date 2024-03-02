import { SupportedChain } from "../data/chains";
import { Network } from "../state/wallet";

export interface INetworkDropdown {
	chainList: SupportedChain[];
	selectedChain: SupportedChain;
	setSelectedChain: (value: SupportedChain) => void;
	currentNetwork: Network;
}
