import { cubicInOut, expoIn, expoOut } from 'svelte/easing';
import { spring, tweened } from 'svelte/motion';
import { blur } from 'svelte/transition';

export function press(
	el: HTMLElement,
	config: {
		press: (el: HTMLElement, t: number) => void;
	} = {
		press: (el, t) => {
			const w = el.getBoundingClientRect().width;
			const pressDist = 1.2 * Math.log(w);
			const x = w / (w + t * pressDist);
			el.style.transform = `scale(${x})`;
		}
	}
) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { destroy: () => {} };

	let pressSpring = spring(0, { stiffness: 0.5, damping: 0.5 });
	let unsubscriber = pressSpring.subscribe((t) => config.press(el, t));

	const onpress = (ev: unknown) => {
		if (ev instanceof KeyboardEvent && ev.code !== 'Enter' && ev.code !== 'Space') return;
		pressSpring.stiffness = 0.2;
		pressSpring.damping = 0.8;
		pressSpring.set(1);
		if (ev instanceof PointerEvent) window.addEventListener('pointerup', onrelease, { once: true });
	};
	const onrelease = () => {
		pressSpring.damping = 0.25;
		pressSpring.set(0);
	};
	const handleVisibilityChange = () => {
		if (document.hidden) {
			// stop spring
			unsubscriber();
		} else {
			// reinitialize a new spring
			pressSpring = spring(0, { stiffness: 0.5, damping: 0.5 });
			unsubscriber = pressSpring.subscribe((t) => config.press(el, t));
		}
	};
	el.style.userSelect = 'none';
	el.style.cursor = 'pointer';
	document.addEventListener('visibilitychange', handleVisibilityChange);
	el.addEventListener('keydown', onpress);
	el.addEventListener('keyup', onrelease);
	el.addEventListener('dragend', onrelease);
	el.addEventListener('pointerdown', onpress);
	return {
		destroy: () => {
			el.style.transform = '';
			unsubscriber();
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			el.removeEventListener('keydown', onpress);
			el.removeEventListener('keyup', onrelease);
			el.removeEventListener('dragend', onrelease);
			el.removeEventListener('pointerdown', onpress);
		}
	};
}

export function focus(
	el: HTMLElement,
	config: {
		in: (el: HTMLElement, t: number) => void;
		out: (el: HTMLElement, t: number) => void;
	} = {
		in: (el, t) => {
			const easing = expoOut;
			const e = easing(t);
			const bg = el.getElementsByTagName('background')[0] as HTMLElement;
			if (!bg) return;
			const x1 = e * 100;
			const x2 = e * 105;

			const computedStyle = getComputedStyle(bg);
			const A = computedStyle.accentColor;
			const B = computedStyle.backgroundColor;

			bg.style.opacity = `${x1 / 100}`;
			bg.style.backgroundImage = `linear-gradient(to top, ${A} ${x1}%, ${B} ${x2}%, ${B})`;
			// bg.style.backgroundImage = `conic-gradient(from 0deg, ${A} ${x1}%, ${B} ${x2}%, ${B})`;
			// bg.style.backgroundImage = `radial-gradient(circle at 50% 50%, ${A} ${x1}%, ${B} ${x2}%, ${B})`;
			bg.style.color = x1 < 50 ? A : B;
		},
		out: (el, t) => {
			const easing = expoIn;
			const e = easing(t);
			const bg = el.getElementsByTagName('background')[0] as HTMLElement;
			if (!bg) return;
			const x1 = e * 100;
			const x2 = e * 105;

			const computedStyle = getComputedStyle(bg);
			const A = computedStyle.accentColor;
			const B = computedStyle.backgroundColor;

			bg.style.opacity = `${x1 / 100}`;
			bg.style.backgroundImage = `linear-gradient(to top, ${A} ${x1}%, ${B} ${x2}%, ${B})`;
			// bg.style.backgroundImage = `conic-gradient(from 0deg, ${A} ${x1}%, ${B} ${x2}%, ${B})`;
			// bg.style.backgroundImage = `radial-gradient(circle at 50% 50%, ${A} ${x1}%, ${B} ${x2}%, ${B})`;
			bg.style.color = x1 < 50 ? A : B;
		}
	}
) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { destroy: () => {} };
	const focusTween = tweened(0, { duration: 300 });
	let animation = config.in;
	const onfocusin = () => {
		animation = config.in;
		focusTween.set(1);
	};
	const onfocusout = () => {
		animation = config.out;
		focusTween.set(0);
	};

	focusTween.subscribe((t) => {
		animation(el, t);
	});

	el.addEventListener('focusin', onfocusin);
	el.addEventListener('focusout', onfocusout);

	return {
		destroy: () => {
			el.removeEventListener('focusin', onfocusin);
			el.removeEventListener('focusout', onfocusout);
		}
	};
}

export const flash = (node: Element) => {
	return blur(node, { duration: 1000, easing: cubicInOut });
};
