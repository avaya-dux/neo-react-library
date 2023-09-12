import { vi } from "vitest";

import { getLocale } from "./getLocale";

describe("getLocale", () => {
  it("returns 'en-US' when navigator object is undefined", () => {
    const localeString = getLocale();

    expect(localeString).toEqual("en-US");
  });

  it("returns value provided by navigator object when navigator object is defined", () => {
    Object.defineProperty(navigator, "languages", {
      get: vi.fn().mockImplementation(() => ["fr-FR", "en-US"]),
    });

    const localeString = getLocale();

    expect(localeString).toEqual("fr-FR");
  });
});
