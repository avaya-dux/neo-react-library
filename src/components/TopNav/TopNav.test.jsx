import { composeStories } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Image } from "components/Image";

import { TopNav } from ".";
import * as TopNavStories from "./TopNav.stories";

const {
  TopNavWithNavigationToggle,
  TopNavWithTitle,
  TopNavWithButtons,
  TopNavWithAvatarAndDropdown,
  StickyTopNav,
  TopNavWithTabs,
  TopNavWithAgentCard,
} = composeStories(TopNavStories);

describe("TopNav", () => {
  describe("basic unit tests", () => {
    let renderResult;
    beforeEach(() => {
      const logo = (
        <Image
          src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png"
          isDecorativeOrBranding
        />
      );

      renderResult = render(<TopNav logo={logo} />);
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("renders with the correct class heirarchy", () => {
      const { container } = renderResult;
      const navElement = container.firstChild;
      expect(navElement.firstChild).toHaveClass("neo-nav--left");
      expect(navElement.lastChild).toHaveClass("neo-nav");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("storybook tests", () => {
    describe("Sticky TopNav", () => {
      it("has the correct class name with sticky prop passed", () => {
        render(<StickyTopNav />);
        expect(screen.getByRole("navigation")).toHaveClass(
          "neo-navbar--sticky"
        );
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<StickyTopNav />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With buttons", () => {
      it("toggles active states correctly", () => {
        const { getAllByRole } = render(<TopNavWithButtons />);
        const buttonElements = getAllByRole("button");
        fireEvent.click(buttonElements[0]);
        expect(buttonElements[0].closest("div")).toHaveClass(
          "neo-badge__navbutton--active"
        );
        fireEvent.click(buttonElements[1]);
        expect(buttonElements[0].closest("div")).not.toHaveClass(
          "neo-badge__navbutton--active"
        );
      });

      it("passes basic axe compliance", async () => {
        const { container } = render(<TopNavWithButtons />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Title", () => {
      it("renders text passed as title prop", () => {
        const { getByText } = render(<TopNavWithTitle />);
        const titleElement = getByText("Product Name");
        expect(titleElement).toBeTruthy();
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<TopNavWithTitle />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Navigation Toggle", () => {
      // BUG: is throwing: "Warning: Received `true` for a non-boolean attribute `active`."
      it("correctly executes button onClick handler when passed as props", () => {
        const { getByRole, getAllByRole } = render(
          <TopNavWithNavigationToggle />
        );
        const navElementsBeforeToggle = getAllByRole("navigation");
        expect(navElementsBeforeToggle).toHaveLength(1);
        const leftNavToggleButton = getByRole("button");
        fireEvent.click(leftNavToggleButton);
        const navElementsAfterToggle = getAllByRole("navigation");
        expect(navElementsAfterToggle).toHaveLength(2);
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<TopNavWithNavigationToggle />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Avatar and Dropdown", () => {
      it("adds appropriate class to toggle Dropdown when clicked", () => {
        const { getByRole } = render(<TopNavWithAvatarAndDropdown />);
        const avatar = getByRole("figure");
        const avatarDropdown = getByRole("figure").closest("div");
        expect(avatarDropdown).not.toHaveClass("neo-dropdown--active");
        fireEvent.click(avatar);
        expect(avatarDropdown).toHaveClass("neo-dropdown--active");
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<TopNavWithAvatarAndDropdown />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Tabs", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<TopNavWithTabs />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Agent Card", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<TopNavWithAgentCard />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
