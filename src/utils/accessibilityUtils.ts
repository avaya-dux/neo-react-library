/**
 * The source of truth for handling accessbility errors.
 * The logic within may change at some point in the future.
 *
 * @param message
 */
export function handleAccessbilityError(message: string) {
	throw new Error(message);
}

export function isAriaDisabled(target: HTMLElement): boolean {
	return target.getAttribute("aria-disabled") === "true";
}

/**
 * Generates a unique string in the UUID format.
 *
 * @example
 * const internalId = useMemo(() => props.id || genId(), [props.id]);
 *
 * @returns uuid
 */
export const genId = () => {
	// most browsers+servers support self.crypto.getRandomValues, so use it if we can
	if (
		typeof self !== "undefined" &&
		typeof self.crypto !== "undefined" &&
		typeof self.crypto.randomUUID !== "undefined"
	) {
		return self.crypto.randomUUID();
	}

	// else, adapt this answer: https://stackoverflow.com/a/8809472/1022765
	let d = new Date().getTime();
	let d2 =
		(typeof performance !== "undefined" &&
			performance.now &&
			performance.now() * 1000) ||
		0;
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		let r = Math.random() * 16; //random number between 0 and 16
		if (d > 0) {
			r = ((d + r) % 16) | 0;
			d = Math.floor(d / 16);
		} else {
			r = ((d2 + r) % 16) | 0;
			d2 = Math.floor(d2 / 16);
		}
		return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
	});
};
