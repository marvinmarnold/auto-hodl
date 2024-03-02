import { chainList } from "../data/chains";
import { IGetChain } from "../interfaces";

export const getChain = ({ name, chainId }: IGetChain) => {
	if (name) {
		return chainList[chainList.findIndex((chain) => chain.name === name)];
	}

	if (chainId) {
		return chainList[
			chainList.findIndex((chain) => chain.chainId === chainId)
		];
	}
	return undefined;
};
