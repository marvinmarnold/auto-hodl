"use client";

import React, { useEffect, useState } from "react";
import { PiCheckSquareOffset, PiCopy } from "react-icons/pi";
import { useSelector } from "react-redux";

import { chainList } from "../data/chains";
import { SupportedChain } from "../interfaces";
import { getChain, zeroAddress } from "../resources";
import { RootState } from "../state/store";
import { getTokenBaseUnits } from "../utils";
import SavingsService from "../services/savings";

export default function Home() {
	const { isWalletConnected, currentNetwork, nativeBalance } = useSelector(
		(state: RootState) => state.wallet
	);
	const [amountInput, setAmountInput] = useState<string>("");
	const [timelockDaysInput, setTimelockDaysInput] = useState<string>("");
	const [timelockSec, setTimelockSec] = useState<bigint>(BigInt(0));
	const [amount, setAmount] = useState<bigint>(BigInt(0));
	const [saveAmount, setSaveAmount] = useState<string>("");
	const [totalSaved, setTotalSaved] = useState<string>("");
	const [targetContract, setTargetContract] = useState<string>("");
	const [savingsContract, setSavingsContract] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const getSavingsContract = async () => {
		console.log("getSavingsContract called");
		const address = await SavingsService.getInstance().getSavingsContract();
		if (address !== zeroAddress) {
			setSavingsContract(address);
		}
	};

	const deploySavingsContract = async () => {
		await SavingsService.getInstance().createSavingsContract(
			amount,
			timelockSec,
			setErrorMessage,
			setSuccessMessage,
			setSavingsContract
		);
	};

	const getSaveAmount = async () => {
		await SavingsService.getInstance().getSaveAmount(
			savingsContract as `0x${string}`,
			setSaveAmount
		);
	};

	const getTotalSaved = async () => {
		await SavingsService.getInstance().getTotalSaved(
			savingsContract as `0x${string}`,
			setTotalSaved
		);
	};

	const handleAmountChange = (event: React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		let amountString = target.validity.valid ? target.value : amountInput;

		if (amountString === "") {
			setAmount(BigInt(0));
		} else if (amountString !== ".") {
			if (amountString[0] === ".") {
				amountString = `0${amountString}`;
			}

			const tokenDecimals = 18;
			const components = amountString.split(".");
			const decimals = components[1];

			if (decimals && decimals.length > tokenDecimals) {
				setErrorMessage("Too many decimal places.");
			} else {
				setErrorMessage("");
				setAmount(getTokenBaseUnits(amountString, tokenDecimals));
			}
		}
		setAmountInput(amountString);
	};

	const handleTimelockChange = (event: React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		let timelockDaysString = target.validity.valid
			? target.value
			: timelockDaysInput;

		if (timelockDaysString === "") {
			setAmount(BigInt(0));
		} else if (timelockDaysString !== ".") {
			const tokenDecimals = 18;
			const components = timelockDaysString.split(".");
			const decimals = components[1];

			if (decimals && decimals.length > tokenDecimals) {
				setErrorMessage("Too many decimal places.");
			} else {
				setErrorMessage("");
				setAmount(getTokenBaseUnits(timelockDaysString, tokenDecimals));
			}
		}

		const timelockDays = BigInt(timelockDaysString);
		const timelockSeconds = timelockDays * BigInt(86400);

		setTimelockSec(BigInt(timelockSeconds));
		setTimelockDaysInput(timelockDaysString);
	};

	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			getSavingsContract();
		}
	}, [isWalletConnected, currentNetwork]);

	useEffect(() => {
		if (savingsContract) {
			getSaveAmount();
			getTotalSaved();
		}
	}, [savingsContract]);

	return (
		<div className="flex w-full flex-1 flex-col items-center justify-start py-10">
			<div className="flex min-h-fit w-full max-w-3xl flex-col px-4">
				<h1 className="mb-5 w-fit border-b border-b-primary-100 pb-1 text-2xl font-bold">
					Auto Hodl
				</h1>
				{isWalletConnected &&
				currentNetwork?.isSupported &&
				savingsContract ? (
					<>
						<span>Savings Contract Address: {savingsContract}</span>
						<span>Savings Amount: {saveAmount}</span>
						<span>Total Saved: {totalSaved}</span>
					</>
				) : (
					<>
						<span className="mt-3 self-start">
							Savings Amount Per Transaction
						</span>
						<input
							className="h-10 w-full bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
							type="text"
							pattern="[0-9]*\.?[0-9]*"
							inputMode="decimal"
							placeholder="0.00"
							onWheel={(event) =>
								(event.target as HTMLInputElement).blur()
							}
							autoComplete="off"
							value={amountInput}
							onInput={(event) => handleAmountChange(event)}
						/>
						<span className="mt-3 self-start">Timelock (Days)</span>
						<input
							className="h-10 w-full bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
							type="text"
							pattern="[0-9]*"
							inputMode="numeric"
							placeholder="0"
							onWheel={(event) =>
								(event.target as HTMLInputElement).blur()
							}
							autoComplete="off"
							value={timelockDaysInput}
							onInput={(event) => handleTimelockChange(event)}
						/>
						<span className="mt-3 self-start">Target Contract</span>
						<input
							className="h-10 w-full bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
							type="text"
							placeholder="0x..."
							value={targetContract}
							onChange={(event) =>
								setTargetContract(event.target.value)
							}
							autoComplete="off"
						/>
						<button
							style={
								{
									"--offset-border-color": "#395754", // dark-200
								} as React.CSSProperties
							}
							className="mt-3 *:offset-border flex h-10 w-20 shrink-0 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
							onClick={() => deploySavingsContract()}
						>
							Deploy
						</button>
					</>
				)}
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
