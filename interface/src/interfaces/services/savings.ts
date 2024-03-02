export abstract class ISavingsService {
	abstract getSavingsContract(): Promise<`0x${string}`>;

	abstract createSavingsContract(
		savingsAmount: bigint,
		timelockSecs: bigint,
		setErrorMessage: (value: string) => void,
		setSuccessMessage: (value: string) => void,
		setSavingsContract: (value: string) => void
	): Promise<void>;

	abstract getSaveAmount(
		savingsContract: `0x${string}`,
		setSaveAmount: (value: string) => void
	): Promise<void>;

	abstract getTotalSaved(
		savingsContract: `0x${string}`,
		setTotalSaved: (value: string) => void
	): Promise<void>;

	abstract getTimeLock(
		savingsContract: `0x${string}`,
		setDaysUntilUnlock: (value: string) => void
	): Promise<void>;

	abstract entryPoint(
		savingsContract: `0x${string}`,
		setErrorMessage: (value: string) => void,
		setSuccessMessage: (value: string) => void,
		setCount: (value: bigint) => void
	): Promise<void>;

	abstract getCount(): Promise<bigint>;

	abstract withdraw(setErrorMessage: (value: string) => void): Promise<void>;

	abstract changeOwner(
		setErrorMessage: (value: string) => void
	): Promise<void>;
}
