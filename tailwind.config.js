module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				gray: {
					400: '#2E2E2E',
					800: '#141414',
				},
				orange: {
					500: '#ee7623',
				},
				red: {
					500: '#e53935',
				},
			},
		},
		screens: {
			'st': '400px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			'3xl': '1920px',
		},
	},
	plugins: [],
	experimental: {
		applyComplexClasses: true,
	},
	daisyui: {
		themes: [{
			stylenow: {
				primary: "#ee7623",
				secondary: "#ffffff",
				accent: "#ffffff",
				neutral: "#ffffff",
				"base-100": "#ffffff",
				"--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
				"--rounded-btn": "1rem", // border radius rounded-btn utility class, used in buttons and similar element
				"--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
				"--animation-btn": "0.25s", // duration of animation when you click on button
				"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
				"--btn-text-case": "uppercase", // set default text transform for buttons
				"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
				"--border-btn": "1px", // border width of buttons
				"--tab-border": "1px", // border width of tabs
				"--tab-radius": "0.5rem", // border radius of tabs
			},
      	}],
	}
};
