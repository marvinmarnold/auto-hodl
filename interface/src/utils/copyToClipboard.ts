export const copyToClipboard = (
	text: string,
	setCopied: (value: boolean) => void
) => {
	navigator.clipboard.writeText(text).then(
		() => {
			setCopied(true);
			// Change back to default state after 2 seconds.
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		},
		(err) => {
			// eslint-disable-next-line no-console
			console.error("Failed to Copy", err.message);
		}
	);
};
