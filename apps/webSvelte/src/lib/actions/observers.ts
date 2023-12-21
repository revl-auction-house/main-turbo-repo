import { get, writable, type Writable } from 'svelte/store';

export const _io: Writable<IntersectionObserver> = writable();
export const setupIO = () => {
	_io.set(
		new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				entry.isIntersecting
					? entry.target.classList.add('in-view')
					: entry.target.classList.remove('in-view');
			});
		})
	);
};

export function inViewClass(el: HTMLElement) {
	_io.subscribe((observer) => {
		observer?.observe(el);
		return observer;
	});
	return {
		destroy() {
			get(_io).unobserve(el);
		}
	};
}

export const _mo: Writable<MutationObserver> = writable();
export const setupMO = () => {
	_mo.set(
		new MutationObserver((entries) => {
			entries.forEach((entry) => {
				const el = entry.target as HTMLElement;
				const domRect = el.getBoundingClientRect();
				el.style.maxWidth = domRect.width + 'px';
				el.style.minWidth = domRect.width + 'px';
				console.log(el.style.width);
			});
		})
	);
};

export function mo(el: HTMLElement, config: MutationObserverInit) {
	_mo.subscribe((observer) => {
		observer?.observe(el, config);
		return observer;
	});
	return {
		destroy() {
			// get(_mo).disconnect();
		}
	};
}
