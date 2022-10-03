import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import * as AppLayoutStories from "./AppLayout.stories";

// the following defineProperty call is needed to workaround an issue with the test library.
// See article: https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("AppLayout: ", () => {
  describe("Render Default AppLayout Example", () => {
    const { Default } = composeStories(AppLayoutStories);
    let renderResult;

    beforeEach(() => {
      vi.spyOn(console, "warn").mockImplementation(() => null);
      renderResult = render(<Default />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render Header and Content only example ", () => {
    const { HeaderAndContent } = composeStories(AppLayoutStories);
    let renderResult;

    beforeEach(() => {
      vi.spyOn(console, "warn").mockImplementation(() => null);
      renderResult = render(<HeaderAndContent />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render LeftPane and Content only example ", () => {
    const { LeftPanelAndContent } = composeStories(AppLayoutStories);
    let renderResult;

    beforeEach(() => {
      vi.spyOn(console, "warn").mockImplementation(() => null);
      renderResult = render(<LeftPanelAndContent />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });
});

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
