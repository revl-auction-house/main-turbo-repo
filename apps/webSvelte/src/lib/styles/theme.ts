import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export const themeConfig = {
	fontFamily: {
		DEFAULT: ['Poppins', ...fontFamily.sans]
	},
	screens: {
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1720px',
		'3xl': '2560px'
	},
	colors: {
		transparent: 'transparent',
		primary: '#00b2ff', //blue
		secondary: '#00d728', //lime
		accent: '#ff6a00', //orange
		red: '#ff0000', //red
		white: '#ffffff', //white
		black: '#000000', //black
		neutral: {
			DEFAULT: '#bababa',
			lighter: '#d3d2d2',
			darker: '#6a6a6a',
			darkest: '#3a3a3a'
		},
		background: {
			DEFAULT: '#25282a',
			lighter: '#353738',
			darker: '#101112'
		},
		card: {
			DEFAULT: '#0f0f13',
			lighter: '#36363f',
			darker: '#040404',
			foreground: {
				DEFAULT: '#d4d4d8',
				lighter: '#fafafa',
				darker: '#a1a1aa'
			}
		}
	}
};

export const themePlugin = plugin(function ({ addVariant, matchUtilities, addComponents }) {
	matchUtilities(
		{
			mask: (origin) => ({
				mask: `radial-gradient(circle at ${origin}, #fff 80%, transparent)`
			})
		},
		{
			values: {
				top: '50% 0%',
				right: '0% 50%',
				left: '100% 50%',
				bottom: '50% 100%'
			}
		}
	);
	addComponents({
		'.colored-primary': {
			color: '#ffffff',
			background: 'linear-gradient(90deg, #00b2ff 0%, #005ec9 100%)'
		},
		'.colored-secondary': {
			color: '#ffffff',
			background: 'linear-gradient(90deg, #00d728 0%, #01cd63 100%)'
		},
		'.colored-accent': {
			color: '#ffffff',
			background: 'linear-gradient(90deg, #ff6a00 0%, #d33f00 100%)'
		},
		'.colored-glass': {
			backgroundColor: 'transparent',
			color: '#ffffff',
			stroke: '#ffffff',
			backdropFilter: 'blur(16px) saturate(200%) contrast(50%) brightness(90%)',
			'&:hover': {
				backgroundColor: '#ffffff22'
			},
			'&:focus': {
				backgroundColor: '#ffffff33'
			}
		}
	});
	addVariant('overflowing', '.overflowing&');
	addVariant('in-view', '.in-view&');
});
