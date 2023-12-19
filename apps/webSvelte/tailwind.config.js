import theme from './src/lib/styles/theme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: theme,
	plugins: [
		plugin(function ({ addVariant,matchUtilities }) {
			matchUtilities(
				{
				  mask: (direction) => ({
					"mask":`linear-gradient(to ${direction}, #000 80%, transparent)`
				  }),
				},
				{ 
					values: {
						top:'top',
						right:'right',
						left:'left',
						bottom:'bottom'
					} 
				}
			  );
			addVariant('in-view', '.in-view&');
		})
	]
};
