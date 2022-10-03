import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { jest } from "jest";
import { vi } from "vitest";

import * as AppLayoutStories from "./AppLayout.stories";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
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
