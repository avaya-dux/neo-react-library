import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Navbar } from ".";
import { Logo } from "./LeftContent/Logo";
import * as NavbarStories from "./Navbar.stories";

const {
  NavbarWithNavigationToggle,
  NavbarWithTitle,
  NavbarWithNavButtons,
  NavbarWithAvatarAndDropdown,
  StickyNavbar,
  NavbarWithTabs,
  NavbarWithAgentCard,
} = composeStories(NavbarStories);

describe("Navbar", () => {
  describe("basic unit tests", () => {
    let renderResult;
    beforeEach(() => {
      const logo = (
        <Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png" />
      );

      renderResult = render(<Navbar logo={logo} />);
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
    describe("Sticky Navbar", () => {
      it("has the correct class name with sticky prop passed", () => {
        const { getByRole } = render(<StickyNavbar />);
        const navBarParent = getByRole("navigation");
        expect(navBarParent).toHaveClass("neo-navbar--sticky");
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<StickyNavbar />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Navbar With NavButtons", () => {
      it("toggles active states correctly", () => {
        const { getAllByRole } = render(<NavbarWithNavButtons />);
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
        const { container } = render(<NavbarWithNavButtons />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Navbar With Title", () => {
      it("renders text passed as title prop", () => {
        const { getByText } = render(<NavbarWithTitle />);
        const titleElement = getByText("Product Name");
        expect(titleElement).toBeTruthy();
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<NavbarWithTitle />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Navbar With Navigation Toggle", () => {
      it("correctly executes button onClick handler when passed as props", () => {
        const { getByRole, getAllByRole } = render(
          <NavbarWithNavigationToggle />
        );
        const navElementsBeforeToggle = getAllByRole("navigation");
        expect(navElementsBeforeToggle).toHaveLength(1);
        const leftNavToggleButton = getByRole("button");
        fireEvent.click(leftNavToggleButton);
        const navElementsAfterToggle = getAllByRole("navigation");
        expect(navElementsAfterToggle).toHaveLength(2);
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<NavbarWithNavigationToggle />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Navbar With Avatar and Dropdown", () => {
      it("adds appropriate class to toggle Dropdown when clicked", () => {
        const { getByRole } = render(<NavbarWithAvatarAndDropdown />);
        const avatar = getByRole("figure");
        const avatarDropdown = getByRole("figure").closest("div");
        expect(avatarDropdown).not.toHaveClass("neo-dropdown--active");
        fireEvent.click(avatar);
        expect(avatarDropdown).toHaveClass("neo-dropdown--active");
      });
      it("passes basic axe compliance", async () => {
        const { container } = render(<NavbarWithAvatarAndDropdown />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("Navbar With Tabs", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<NavbarWithTabs />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("Navbar With Agent Card", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<NavbarWithAgentCard />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
