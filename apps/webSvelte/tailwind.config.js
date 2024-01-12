import {themeConfig,themePlugin} from './src/lib/styles/theme';
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: themeConfig,
	plugins: [
		themePlugin,
	]
};
