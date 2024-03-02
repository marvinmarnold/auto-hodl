import { Menu, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { PiCheckSquareOffset, PiCopy, PiPlug } from "react-icons/pi";
import { useSelector } from "react-redux";

import { getChain } from "../../resources";
import WalletService from "../../services/wallet";
import { RootState } from "../../state/store";
import {
	copyToClipboard,
	getTokenDisplayUnits,
	truncateAddress,
} from "../../utils";
import CompactButton from "./CompactButton";
import FullButton from "./FullButton";

function WalletMenu() {
	const { address, currentNetwork, nativeBalance, ens } = useSelector(
		(state: RootState) => state.wallet
	);
	const [copied, setCopied] = useState<boolean>(false);

	return (
		<Menu as="div" className="relative inline-block text-left">
			{({ open }) => (
				<>
					<Menu.Button
						style={
							{
								"--offset-border-color": "#395754", // dark-200
							} as React.CSSProperties
						}
						className="offset-border z-10 flex h-10 min-w-fit items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
					>
						<div className="hidden sm:flex">
							<FullButton ens={ens!} address={address!} />
						</div>
						<div className="sm:hidden">
							<CompactButton ens={ens!} address={address!} />
						</div>
					</Menu.Button>
					<Transition show={open}>
						<Menu.Items className="absolute right-0 z-50 mt-4 w-[200px] origin-top-right bg-dark-600 p-1 text-sm outline-none ring-1 ring-dark-200">
							<div className="py-2 text-center">
								{currentNetwork!.isSupported ? (
									<span>
										{getTokenDisplayUnits(
											BigInt(nativeBalance!.value),
											nativeBalance!.decimals
										)}{" "}
										{nativeBalance!.symbol}
									</span>
								) : (
									<span className="text-center text-bad-accent">
										NETWORK NOT SUPPORTED
									</span>
								)}
							</div>
							<div className="flex flex-col items-center justify-center">
								<button
									className="group flex w-full items-center p-2 outline-none hover:bg-dark-400 hover:text-primary-100"
									onClick={() =>
										copyToClipboard(address!, setCopied)
									}
								>
									{!copied ? (
										<PiCopy
											className="mr-5 flex items-center justify-center"
											size="16px"
										/>
									) : (
										<PiCheckSquareOffset
											className="mr-5 flex items-center justify-center text-good-accent"
											size="16px"
										/>
									)}
									<span>{truncateAddress(address!)}</span>
								</button>
							</div>
							{currentNetwork!.isSupported ? (
								<Menu.Item>
									{({ active }) => (
										<a
											className={`${
												active &&
												"bg-dark-400 text-primary-100"
											} group flex w-full items-center p-2`}
											href={`${
												getChain({
													chainId:
														currentNetwork!.chainId,
												})!.blockExplorer
											}/address/${address}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<LiaExternalLinkAltSolid
												className="mr-5 flex items-center justify-center"
												size="16px"
											/>
											<span>View on explorer</span>
										</a>
									)}
								</Menu.Item>
							) : null}
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active &&
											"bg-dark-400 text-primary-100"
										} group flex w-full items-center p-2`}
										onClick={() =>
											WalletService.getInstance().disconnectWallet()
										}
									>
										<PiPlug
											className="mr-5 flex items-center justify-center"
											size="16px"
										/>
										<span>Disconnect</span>
									</button>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}

export default WalletMenu;
