import { writable } from 'svelte/store';

export const currentTime = writable(Date.now());

export function start() {
	currentTime.set(Date.now());
	requestAnimationFrame(start);
}

export const second = 1000;
export const minute = 60 * second;
export const hour = 60 * minute;
export const day = 24 * hour;
