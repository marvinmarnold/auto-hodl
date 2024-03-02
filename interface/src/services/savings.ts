import factoryAbi from "../abis/factory.json";
import savingsAbi from "../abis/savings.json";
import counterAbi from "../abis/counter.json";
import { ISavingsService } from "../interfaces";
import { FACTORY_CONTRACT, COUNTER_CONTRACT } from "../data/constants";
import {
	readContract,
	waitForTransaction,
	writeContract,
	zeroAddress,
	encodeFunctionData,
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

		const savingsContract = (await readContract({
			address: FACTORY_CONTRACT,
			abi: factoryAbi,
			functionName: "accountLookup",
			args: [user],
		})) as `0x${string}`;

		if (savingsContract != zeroAddress) {
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
		const user = store.getState().wallet.address;

		try {
			const { hash } = await writeContract({
				address: FACTORY_CONTRACT,
				abi: factoryAbi,
				functionName: "createAccount",
				args: [savingsAmount, timelockSecs],
			});

			const txReceipt = await waitForTransaction({
				hash,
			});

			if (txReceipt.status === "success") {
				const savingsContract = (await readContract({
					address: FACTORY_CONTRACT,
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
			setErrorMessage(error);
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

	public async entryPoint(
		savingsContract: `0x${string}`,
		setErrorMessage: (value: string) => void
	): Promise<void> {
		// stuff
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
