export const getLocale: () => string = () =>
  typeof navigator !== "undefined" ? navigator.languages[0] : "en-US";
