"use client";

import React, { useEffect, useState } from "react";
import { PiCheckSquareOffset, PiCopy } from "react-icons/pi";
import { useSelector } from "react-redux";

import { chainList } from "../data/chains";
import { SupportedChain } from "../interfaces";
import { getChain } from "../resources";
import { RootState } from "../state/store";

export default function Home() {
	const { isWalletConnected, currentNetwork, nativeBalance } = useSelector(
		(state: RootState) => state.wallet
	);
	const [targetContract, setTargetContract] = useState<string>("");
	const [savingsContract, setSavingsContracts] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const getSavingsContract = async () => {
		// Call Factory contract to see if person has a Savings contract
		console.log("Get savings contract.");
	};

	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			getSavingsContract();
		}
	}, [isWalletConnected, currentNetwork]);

	return (
		<div className="flex w-full flex-1 flex-col items-center justify-start py-10">
			<div className="flex min-h-fit w-full max-w-3xl flex-col px-4">
				<h1 className="mb-5 w-fit border-b border-b-primary-100 pb-1 text-2xl font-bold">
					Auto Hodl
				</h1>
				<input
					className="h-10 w-full bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
					type="text"
					placeholder="0x..."
					value={targetContract}
					onChange={(event) => setTargetContract(event.target.value)}
					autoComplete="off"
				/>
				{isWalletConnected &&
				currentNetwork?.isSupported &&
				savingsContract ? (
					<span>Render Savings</span>
				) : null}
				{errorMessage && (
					<div className="mt-2 flex w-full items-center justify-center text-sm">
						<span className="break-all text-bad-accent">
							{errorMessage}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
