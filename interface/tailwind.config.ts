const config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			xxs: "300px",
			xs: "365px",
			sm: "440px",
			smd: "552px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			colors: {
				"dark-600": "#000000",
				"dark-500": "#171a19",
				"dark-400": "#2a3332",
				"dark-300": "#28403d",
				"dark-200": "#395754",
				"dark-100": "#4b7571",
				"light-400": "#60a69e",
				"light-300": "#8bc9c3",
				"light-200": "#addad5",
				"light-100": "#ffffff",
				"primary-200": "#fd6794df",
				"primary-100": "#fd6793",
				"bad-accent": "#ff004c",
				"good-accent": "#00ffe3",
			},
		},
	},
	plugins: [],
};
export default config;
