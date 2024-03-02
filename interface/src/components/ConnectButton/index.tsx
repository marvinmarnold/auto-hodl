import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { IConnectButton } from "../../interfaces";

function ConnectButton({ isLoading }: IConnectButton) {
	return (
		<span
			style={
				{
					"--offset-border-color": "#addad5", // light-200
				} as React.CSSProperties
			}
			className="offset-border z-10 flex h-10 w-28 items-center justify-center bg-primary-200 font-bold text-dark-600 outline-none hover:bg-primary-100"
		>
			{isLoading ? (
				<AiOutlineLoading3Quarters
					className="animate-spin"
					size="22px"
				/>
			) : (
				"Connect"
			)}
		</span>
	);
}

export default ConnectButton;
