import React from "react";

import { ITextLink } from "../../interfaces";

function TextLink({ text, url }: ITextLink) {
	return (
		<a
			className="p-3 text-center outline-none hover:text-primary-100"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
		>
			<span>{text}</span>
		</a>
	);
}

export default TextLink;
