import factoryAbi from "../abis/factory.json";
import savingsAbi from "../abis/savings.json";
import counterAbi from "../abis/counter.json";
import { ISavingsService } from "../interfaces";
import { factory_contract, counter_contract } from "../data/constants";
import {
	readContract,
	waitForTransaction,
	writeContract,
	zeroAddress,
	encodeFunctionData,
	parseEther,
} from "../resources";
import store from "../state/store";
import { getTokenDisplayUnits } from "../utils";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class SavingsService extends ISavingsService {
	private static instance: SavingsService;

	private constructor() {
		super();
	}

	public static getInstance(): SavingsService {
		if (!SavingsService.instance) {
			SavingsService.instance = new SavingsService();
		}
		return SavingsService.instance;
	}

	// ***************************************** Methods ***************************************** //
	public async getSavingsContract(): Promise<`0x${string}`> {
		const user = store.getState().wallet.address;
		const chainId = store.getState().wallet.currentNetwork?.chainId;
		const factory = factory_contract[chainId as number];

		const savingsContract = (await readContract({
			address: factory as `0x${string}`,
			abi: factoryAbi,
			functionName: "accountLookup",
			args: [user],
		})) as `0x${string}`;

		if (savingsContract && savingsContract != zeroAddress) {
			return savingsContract;
		}

		return zeroAddress;
	}

	public async createSavingsContract(
		savingsAmount: bigint,
		timelockSecs: bigint,
		setErrorMessage: (value: string) => void,
		setSuccessMessage: (value: string) => void,
		setSavingsContract: (value: string) => void
	): Promise<void> {
		setErrorMessage("");
		setSuccessMessage("");
		const user = store.getState().wallet.address;
		const chainId = store.getState().wallet.currentNetwork?.chainId;
		const factory = factory_contract[chainId as number];

		try {
			const { hash } = await writeContract({
				address: factory as `0x${string}`,
				abi: factoryAbi,
				functionName: "createAccount",
				args: [savingsAmount, timelockSecs],
			});

			const txReceipt = await waitForTransaction({
				hash,
			});

			if (txReceipt.status === "success") {
				const savingsContract = (await readContract({
					address: factory as `0x${string}`,
					abi: factoryAbi,
					functionName: "accountLookup",
					args: [user],
				})) as `0x${string}`;
				setSavingsContract(savingsContract);
				setSuccessMessage("Savings contract deployed successfully.");
			} else {
				setErrorMessage("Something went wrong trying to deploy.");
			}
		} catch (error: any) {
			const acceptableErrorMessages = [
				"rejected",
				"request reset",
				"denied",
			];

			if (
				!acceptableErrorMessages.some((msg) =>
					error.message.includes(msg)
				)
			) {
				setErrorMessage(error.message);
			}
		}
	}

	public async getSaveAmount(
		savingsContract: `0x${string}`,
		setSaveAmount: (value: string) => void
	): Promise<void> {
		const saveAmount = (await readContract({
			address: savingsContract,
			abi: savingsAbi,
			functionName: "savingsAmt",
		})) as bigint;

		setSaveAmount(getTokenDisplayUnits(saveAmount, 18));
	}

	public async getTotalSaved(
		savingsContract: `0x${string}`,
		setTotalSaved: (value: string) => void
	): Promise<void> {
		const totalSaved = (await readContract({
			address: savingsContract,
			abi: savingsAbi,
			functionName: "totalSaved",
		})) as bigint;

		setTotalSaved(getTokenDisplayUnits(totalSaved, 18));
	}

	public async getTimeLock(
		savingsContract: `0x${string}`,
		setDaysUntilUnlock: (value: string) => void
	): Promise<void> {
		const timeLockSecs = (await readContract({
			address: savingsContract,
			abi: savingsAbi,
			functionName: "timelock",
		})) as bigint;

		const timelockDays =
			(timeLockSecs + BigInt(86400) - BigInt(1)) / BigInt(86400);

		setDaysUntilUnlock(timelockDays.toString());
	}

	public async entryPoint(
		savingsContract: `0x${string}`,
		setErrorMessage: (value: string) => void,
		setSuccessMessage: (value: string) => void,
		setCount: (value: bigint) => void
	): Promise<void> {
		setErrorMessage("");
		setSuccessMessage("");

		const chainId = store.getState().wallet.currentNetwork?.chainId;
		const counter = counter_contract[chainId as number];

		const callData = encodeFunctionData({
			abi: counterAbi,
			functionName: "increment",
		});

		try {
			const { hash } = await writeContract({
				address: savingsContract,
				abi: savingsAbi,
				functionName: "entryPoint",
				args: [counter as `0x${string}`, callData],
				value: parseEther("0.0001"),
			});

			const txReceipt = await waitForTransaction({
				hash,
			});

			if (txReceipt.status === "success") {
				setCount(await this.getCount());
				setSuccessMessage(
					"Successfully incremented count and saved some money!"
				);
			} else {
				setErrorMessage("Something went wrong trying to deploy.");
			}
		} catch (error: any) {
			const acceptableErrorMessages = [
				"rejected",
				"request reset",
				"denied",
			];

			if (
				!acceptableErrorMessages.some((msg) =>
					error.message.includes(msg)
				)
			) {
				setErrorMessage(error.message);
			}
		}
	}

	public async getCount(): Promise<bigint> {
		const chainId = store.getState().wallet.currentNetwork?.chainId;
		const counter = counter_contract[chainId as number];

		const count = (await readContract({
			address: counter as `0x${string}`,
			abi: counterAbi,
			functionName: "number",
		})) as bigint;

		return count;
	}

	public async withdraw(
		setErrorMessage: (value: string) => void
	): Promise<void> {
		// stuff
	}

	public async changeOwner(
		setErrorMessage: (value: string) => void
	): Promise<void> {
		// stuff
	}
	// ******************************************************************************************* //
}

export default SavingsService;
