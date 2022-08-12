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
