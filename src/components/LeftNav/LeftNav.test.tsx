import { render, RenderResult, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { LeftNav } from "./";
import {
  CategoryGroups,
  CategoryGroupsWithIcons,
  Default,
  DoesNotConflictWithOtherNavs,
} from "./LeftNav.stories";

describe("LeftNav", () => {
  describe("base tests", () => {
    const examplechildren = (
      <>
        <LeftNav.TopLinkItem label="Active by default" href="#active" />

        <LeftNav.TopLinkItem label="Link 2" href="#test2" disabled />

        <LeftNav.NavCategory expanded={true} label="Text Only Category">
          <LeftNav.LinkItem href="http://first.com">
            First Item
          </LeftNav.LinkItem>
          <LeftNav.LinkItem href="http://avaya.com" disabled>
            Disabled Item
          </LeftNav.LinkItem>
        </LeftNav.NavCategory>
      </>
    );

    it("render without exploding", () => {
      render(<LeftNav aria-label="Main Navigation">{examplechildren}</LeftNav>);

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("throws an error if no 'aria-label*` is passed", () => {
      vi.spyOn(console, "error").mockImplementation(() => null);

      expect(() =>
        render(<LeftNav aria-label="">{examplechildren}</LeftNav>)
      ).toThrowError();
    });
  });

  describe("storybook tests", () => {
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
});
