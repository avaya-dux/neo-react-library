import { getLocale } from "./getLocale";

describe("getLocale", () => {
  it("returns 'en-US' when navigator object is undefined", () => {
    const localeString = getLocale(undefined as unknown as Navigator);

    expect(localeString).toEqual("en-US");
  });

  it("returns 'en-US' when languages array is empty", () => {
    const localeString = getLocale({ languages: [] } as unknown as Navigator);

    expect(localeString).toEqual("en-US");
  });

  it("returns value provided by navigator object when navigator object is defined", () => {
    const localeString = getLocale({
      languages: ["fr-FR", "en-US"],
    } as unknown as Navigator);

    expect(localeString).toEqual("fr-FR");
  });
});
