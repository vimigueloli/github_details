module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				zinc: {
					300: '#DAE0E4',
					800: '#1E282C',
				},
				rose: {
					300: '#F5A27E',
				}
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
}
