import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";

import { DISABLED_CHAINS } from "../../data/constants";
import { INetworkDropdown } from "../../interfaces";
import Tooltip from "../Tooltip";

function NetworkDropdown({
	chainList,
	selectedChain,
	setSelectedChain,
	currentNetwork,
}: INetworkDropdown) {
	return (
		<Listbox
			as="div"
			className="z-50 mx-2 flex h-10 w-20 flex-col items-center justify-center outline-none"
			value={selectedChain}
			onChange={setSelectedChain}
		>
			{({ open }) => (
				<div className="relative h-10 w-20">
					<span className="inline-block h-full w-20">
						<Listbox.Button
							style={
								{
									"--offset-border-color": "#395754", // dark-200
								} as React.CSSProperties
							}
							className="offset-border z-10 flex h-10 w-20 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
						>
							{currentNetwork.isSupported ? (
								<div className="flex w-full items-center justify-between">
									<div className="flex w-8 items-center justify-center">
										<img
											alt="selectedChainImage"
											src={selectedChain?.imageSource}
										/>
									</div>
									<AiFillCaretDown className="ml-2 h-8" />
								</div>
							) : (
								<Tooltip tip="Please switch to a supported network.">
									<div className="flex w-full items-center justify-between">
										<div className="flex w-8 items-center justify-center">
											<IoWarningOutline
												className="h-8 text-red-500"
												size="28px"
											/>
										</div>
										<AiFillCaretDown className="ml-2 h-8" />
									</div>
								</Tooltip>
							)}
						</Listbox.Button>
					</span>
					<Transition show={open}>
						<Listbox.Options
							static
							className="relative right-14 mt-3 max-h-64 w-44 overflow-hidden overflow-y-auto bg-dark-600 outline-none ring-1 ring-dark-200"
						>
							{chainList.map((chain) => (
								<Listbox.Option
									key={chain.chainId}
									value={chain}
									className="p-1"
									disabled={DISABLED_CHAINS.includes(
										chain.chainId
									)}
								>
									{({ selected, active }) => (
										<div
											className={`${
												active &&
												"bg-dark-400 text-primary-100"
											}
											${
												DISABLED_CHAINS.includes(
													chain.chainId
												)
													? "hover:cursor-not-allowed hover:bg-dark-400 hover:text-primary-100"
													: "cursor-pointer"
											}
                                         ${
												selected &&
												!active &&
												"bg-dark-500"
											} group flex w-full cursor-pointer items-center p-2 text-sm`}
										>
											<div className="mr-5 flex h-7 w-7 items-center justify-center">
												<img
													className="w-7"
													alt="listedChainImage"
													src={chain.imageSource}
												/>
											</div>
											<span
												className={`${
													selected
														? "font-semibold"
														: "font-normal"
												}`}
											>
												{chain.name}
											</span>
										</div>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
}

export default NetworkDropdown;
