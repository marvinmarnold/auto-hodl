import React from "react";

import { ITooltip } from "../../interfaces";

function Tooltip({ children, tip }: ITooltip) {
	return (
		<div className="group relative inline-block w-full text-light-100">
			{children}
			<span className="invisible absolute -right-20 mt-4 w-48 rounded-xl bg-dark-600 py-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
				{tip}
			</span>
		</div>
	);
}

export default Tooltip;
