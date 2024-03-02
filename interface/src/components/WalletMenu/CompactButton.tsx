import React from "react";
import Blockies from "react-blockies";
import { AiFillCaretDown } from "react-icons/ai";

import { IWalletMenuButton } from "../../interfaces";

function CompactButton({ ens, address }: IWalletMenuButton) {
	return (
		<div className="flex items-center justify-center">
			{ens.name ? (
				<div className="flex items-center justify-center">
					{ens.avatar ? (
						<div className="flex w-7 items-center justify-center">
							<img
								className="rounded-full"
								alt="ensAvatar"
								src={ens.avatar}
							/>
						</div>
					) : (
						<div className="flex w-7 items-center justify-center">
							<Blockies
								className="rounded-full"
								seed={address.toLowerCase()}
							/>
						</div>
					)}
				</div>
			) : (
				<div className="flex items-center justify-center">
					<div className="flex w-7 items-center justify-center">
						<Blockies
							className="rounded-full"
							seed={address.toLowerCase()}
						/>
					</div>
				</div>
			)}
			<AiFillCaretDown className="ml-2" />
		</div>
	);
}

export default CompactButton;
