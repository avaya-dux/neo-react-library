import { render, RenderResult } from "@testing-library/react";
import { axe } from "jest-axe";

import {
  CategoryGroups,
  CategoryGroupsWithIcons,
  Default,
  DoesNotConflictWithOtherNavs,
} from "./LeftNav.stories";

describe("LeftNav storybook tests", () => {
  describe("Default", () => {
    let renderResult: RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;

    beforeEach(() => {
      renderResult = render(<Default />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("CategoryGroups", () => {
    let renderResult: RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;

    beforeEach(() => {
      renderResult = render(<CategoryGroups />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("CategoryGroupsWithIcons", () => {
    let renderResult: RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;

    beforeEach(() => {
      renderResult = render(<CategoryGroupsWithIcons />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("DoesNotConflictWithOtherNavs", () => {
    let renderResult: RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;

    beforeEach(() => {
      renderResult = render(<DoesNotConflictWithOtherNavs />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
