import React from "react";
import Blockies from "react-blockies";
import { AiFillCaretDown } from "react-icons/ai";

import { IWalletMenuButton } from "../../interfaces";
import { truncateAddress } from "../../utils";

function FullButton({ ens, address }: IWalletMenuButton) {
	return (
		<div className="flex items-center justify-center">
			{ens.name ? (
				<div className="flex items-center justify-center">
					{ens.avatar ? (
						<div className="mr-2 flex w-7 items-center justify-center">
							<img
								className="rounded-full"
								alt="ensAvatar"
								src={ens.avatar}
							/>
						</div>
					) : (
						<div className="mr-2 flex w-7 items-center justify-center">
							<Blockies
								className="rounded-full"
								seed={address.toLowerCase()}
							/>
						</div>
					)}
					<span>{ens.name}</span>
				</div>
			) : (
				<div className="flex items-center justify-center">
					<div className="mr-2 flex w-7 items-center justify-center">
						<Blockies
							className="rounded-full"
							seed={address.toLowerCase()}
						/>
					</div>
					<span>{truncateAddress(address)}</span>
				</div>
			)}
			<AiFillCaretDown className="ml-2" />
		</div>
	);
}

export default FullButton;
