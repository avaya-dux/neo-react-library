import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Image } from "components/Image";

import { TopNav } from ".";
import * as TopNavStories from "./TopNav.stories";

const {
  AgentCardExample,
  AvatarExample,
  NavigationToggle,
  SearchExample,
  StickyTopNav,
  TabsExample,
  TitleExample,
} = composeStories(TopNavStories);

describe("TopNav", () => {
  const user = userEvent.setup();

  describe("basic unit tests", () => {
    let renderResult;
    beforeEach(() => {
      const logo = (
        <Image
          src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png"
          isDecorativeOrBranding
        />
      );
      const skipNav = (
        <TopNav.SkipNav href="#main-content">
          Skip to main content
        </TopNav.SkipNav>
      );

      renderResult = render(<TopNav logo={logo} skipNav={skipNav} />);
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("renders with the correct class heirarchy", () => {
      const { container } = renderResult;
      const navElement = container.firstChild;
      expect(navElement.firstChild).toHaveClass("neo-nav--left");
      expect(navElement.lastChild).toHaveClass("neo-nav--right");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("'Skip Nav' is the first element to be hit when 'tab' is pressed", async () => {
      const skipNav = screen.getByRole("link");
      expect(skipNav).toBeDefined();
      expect(skipNav).not.toHaveFocus();

      await user.tab();
      expect(skipNav).toHaveFocus();
    });

    // TODO: `.isVisible` is not working as expected, should add this test when possible
    // it("should not show the 'Skip Nav' unless tabbed to", async () => {});
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

    describe("TopNav With Title", () => {
      it("renders text passed as title prop", () => {
        const { getByText } = render(<TitleExample />);
        const titleElement = getByText("Product Name");
        expect(titleElement).toBeTruthy();
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<TitleExample />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Navigation Toggle", () => {
      it("correctly executes button onClick handler when passed as props", async () => {
        const { getByRole, getAllByRole } = render(<NavigationToggle />);
        const navElementsBeforeToggle = getAllByRole("navigation");
        expect(navElementsBeforeToggle).toHaveLength(1);
        const leftNavToggleButton = getByRole("button");
        await user.click(leftNavToggleButton);
        const navElementsAfterToggle = getAllByRole("navigation");
        expect(navElementsAfterToggle).toHaveLength(2);
      });

      it("passes basic axe compliance", async () => {
        const { container } = render(<NavigationToggle />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Avatar and Dropdown", () => {
      it("adds appropriate class to toggle Dropdown when clicked", async () => {
        const { getByRole } = render(<AvatarExample />);
        const avatar = getByRole("figure");
        const avatarDropdown = getByRole("figure").closest("div");
        expect(avatarDropdown).not.toHaveClass("neo-dropdown--active");
        await user.click(avatar);
        expect(avatarDropdown).toHaveClass("neo-dropdown--active");
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<AvatarExample />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Tabs", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<TabsExample />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TopNav With Agent Card", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<AgentCardExample />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("SearchExample", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<SearchExample />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
