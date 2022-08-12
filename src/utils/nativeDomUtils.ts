/**
 * Properly dispatch an `onchange` bubbling event using native DOM setters
 * for a given HTMLInputElement and provided value.
 *
 * @param inputEl
 * @param value
 */
export function dispatchInputOnChangeEvent(
  inputEl: HTMLInputElement,
  value: string
) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;

  if (setter) {
    // natively set the value to empty string
    setter.call(inputEl, value);

    // natively dispatch onChange event
    inputEl.dispatchEvent(new Event("input", { bubbles: true }));
  }
}
