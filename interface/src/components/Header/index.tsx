"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { chainList } from "../../data/chains";
import { SupportedChain } from "../../interfaces";
import { getChain } from "../../resources";
import WalletService from "../../services/wallet";
import { RootState } from "../../state/store";
import ConnectDropdown from "../ConnectDropdown";
import NetworkDropdown from "../NetworkDropdown";
import WalletMenu from "../WalletMenu";

function Header() {
	const { isWalletConnected, currentNetwork } = useSelector(
		(state: RootState) => state.wallet
	);
	const [selectedChain, setSelectedChain] = useState<SupportedChain | null>(
		null
	);

	// Initialize selectedChain
	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			if (
				selectedChain === null ||
				selectedChain.chainId !== currentNetwork.chainId
			) {
				setSelectedChain(
					getChain({ chainId: currentNetwork.chainId })!
				);
			}
		} else if (selectedChain === null) {
			setSelectedChain(getChain({ name: "Sepolia" })!);
		}
	}, [currentNetwork, isWalletConnected, selectedChain]);

	// Update selectedChain when currentNetwork changes
	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			setSelectedChain(getChain({ chainId: currentNetwork.chainId })!);
		}
	}, [currentNetwork]);

	// If selectedChain changes, switch network and update currentNetwork
	useEffect(() => {
		if (isWalletConnected) {
			if (selectedChain!.chainId !== currentNetwork!.chainId) {
				WalletService.getInstance().switchNetwork({
					chainId: selectedChain!.chainId,
					isSupported: true,
				});
			}
		}
	}, [selectedChain]);

	return (
		<header className="sticky top-0 z-10 flex w-full items-center justify-center px-4 py-2 backdrop-blur-sm">
			<div className="flex w-full max-w-4xl items-center justify-between">
				<Link
					className="relative flex w-14 justify-center outline-none"
					href="/"
				>
					<img
						className="rounded-full"
						src="/images/iconAutoHodl.jpeg"
						alt="auto-hodl-icon"
					/>
				</Link>
				{isWalletConnected ? (
					<div className="flex items-center justify-center">
						<NetworkDropdown
							chainList={chainList}
							selectedChain={selectedChain!}
							setSelectedChain={setSelectedChain}
							currentNetwork={currentNetwork!}
						/>
						<WalletMenu />
					</div>
				) : (
					<ConnectDropdown />
				)}
			</div>
		</header>
	);
}

export default Header;
