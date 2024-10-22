import { toHaveNoViolations } from "jest-axe";

import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);

type ResizeObserverCallback = (
	entries: ResizeObserverEntry[],
	observer: ResizeObserver,
) => void;

class ResizeObserver {
	private callback: ResizeObserverCallback;

	constructor(callback: ResizeObserverCallback) {
		this.callback = callback;
	}
	observe() {
		// Mock implementation
	}
	unobserve() {
		// Mock implementation
	}
	disconnect() {
		// Mock implementation
	}
}

global.ResizeObserver = ResizeObserver;
