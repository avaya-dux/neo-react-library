export const getLocale: (navigator: Navigator) => string = (
  navigator: Navigator,
) =>
  navigator !== undefined && navigator.languages.length > 0
    ? navigator.languages[0]
    : "en-US";
