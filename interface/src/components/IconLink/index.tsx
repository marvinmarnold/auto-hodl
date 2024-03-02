import React from "react";

import { IIconLink } from "../../interfaces";

function IconLink({ Icon, url, size }: IIconLink) {
	return (
		<a
			className="flex flex-shrink-0 flex-col items-center justify-center p-3 outline-none hover:text-primary-100"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
		>
			<Icon size={size} />
		</a>
	);
}

export default IconLink;
