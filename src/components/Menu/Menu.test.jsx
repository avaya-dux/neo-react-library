import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import log from "loglevel";
import { vi } from "vitest";

import { Menu, MenuButton, MenuItem } from "./";
import { getClassNames } from "./Menu";
import * as MenuStories from "./Menu.stories";

const menuLogger = log.getLogger("menu");
menuLogger.disableAll();
const subMenuLogger = log.getLogger("submenu");
subMenuLogger.disableAll();
const keyboardLogger = log.getLogger("menu-keyboard-event-handler");
keyboardLogger.disableAll();
const mouseLogger = log.getLogger("menu-mouse-event-handler");
mouseLogger.disableAll();
const menuHelpersLogger = log.getLogger("menu-helpers");
menuHelpersLogger.disableAll();

const {
  SimpleMenu,
  SimpleMenuTemplated,
  SimpleMenuRightAlignedTemplated,
  FunctionalMenu,
  MenuSeperator,
  MultiLevelSubMenu,
  TwoMenus,
} = composeStories(MenuStories);

describe("Menu", () => {
  describe("Base tests", () => {
    it("retains passed `onMenuClose` functionality", () => {
      const onMenuCloseSpy = vi.fn();
      const { getByRole } = render(
        <Menu
          defaultIsOpen // not ideal
          onMenuClose={onMenuCloseSpy}
          menuRootElement={<MenuButton>button</MenuButton>}
        >
          <MenuItem>placeholder one</MenuItem>
          <MenuItem>placeholder two</MenuItem>
        </Menu>
      );

      const button = getByRole("button");

      userEvent.click(button);
      expect(onMenuCloseSpy).not.toHaveBeenCalled();

      userEvent.keyboard("{esc}");
      expect(onMenuCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("keyboard and mouse tests", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<MultiLevelSubMenu />);
    });

    it("menu can be opened and closed via keyboard functionality", () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");

      // menu is hidden before tabbing to menu button and pressing key "space"
      expect(getByRole("group")).not.toBeNull();
      expect(button).not.toBeNull();
      expect(() => getByRole("menu")).toThrow();

      // tab to menu button, press spacebar, and menu is visible
      userEvent.tab();
      expect(button).toHaveFocus();
      userEvent.keyboard("{space}");
      expect(() => getByRole("menu")).not.toThrow();

      // press esc should hide menu
      userEvent.keyboard("{esc}");
      expect(() => getByRole("menu")).toThrow();
    });

    it("menu can be opened and closed via mouse functionality", () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");

      // menu is hidden before clicking menu button
      expect(getByRole("group")).not.toBeNull();
      expect(button).not.toBeNull();
      expect(() => getByRole("menu")).toThrow();

      // tab to menu button, press spacebar, and menu is visible
      userEvent.tab();
      expect(button).toHaveFocus();
      userEvent.click(button);
      expect(() => getByRole("menu")).not.toThrow();

      // click again to hide menu
      userEvent.click(button);
      expect(() => getByRole("menu")).toThrow();
    });

    it("menu can be navigated via keyboard functionality.", () => {
      const { getByRole, queryAllByRole } = renderResult;
      const button = getByRole("button");
      expect(() => getByRole("menu")).toThrow();

      userEvent.tab();
      expect(button).toHaveFocus();

      // button arrowdown will open menu and move focus to first menu item
      userEvent.keyboard("{ArrowDown}");
      expect(() => getByRole("menu")).not.toThrow();
      const menuItems = queryAllByRole("menuitem");
      expect(menuItems[0]).toHaveAttribute("tabindex", "0");
      expect(menuItems[1]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");

      // arrowdown again to navigate to next menu item
      userEvent.keyboard("{ArrowDown}");
      expect(menuItems[0]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[1]).toHaveAttribute("tabindex", "0");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("MenuButton retains any passed functionality", () => {
    const onClickSpy = vi.fn();
    const onKeyDownSpy = vi.fn();
    const onMouseEnterSpy = vi.fn();
    let renderResult;

    beforeEach(() => {
      renderResult = render(
        <Menu
          menuRootElement={
            <MenuButton
              onClick={onClickSpy}
              onKeyDown={onKeyDownSpy}
              onMouseEnter={onMouseEnterSpy}
            >
              button
            </MenuButton>
          }
        >
          <MenuItem>one</MenuItem>
          <MenuItem>two</MenuItem>
          <MenuItem>three</MenuItem>
        </Menu>
      );
    });

    it("retains passed `onClick` functionality", () => {
      onClickSpy.mockClear();
      expect(onClickSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      expect(onClickSpy).not.toHaveBeenCalled();
      userEvent.click(button);
      expect(onClickSpy).toHaveBeenCalled();
    });

    it("retains passed `onKeyDown` functionality", () => {
      onKeyDownSpy.mockClear();
      expect(onKeyDownSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      userEvent.tab();
      expect(button).toHaveFocus();

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      userEvent.keyboard("{space}");
      expect(onKeyDownSpy).toHaveBeenCalled();
    });

    it("retains passed `onMouseEnter` functionality", () => {
      onMouseEnterSpy.mockClear();
      expect(onMouseEnterSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      expect(onMouseEnterSpy).not.toHaveBeenCalled();
      userEvent.hover(button);
      expect(onMouseEnterSpy).toHaveBeenCalled();
    });
  });

  describe("MenuButton respects the prop `openOnHover`", () => {
    const activeClassName = "neo-dropdown--active";
    const onHoverClassName = "neo-dropdown--onhover";

    it("if `openOnHover` is set to `true`, menu shows when root element is hovered", () => {
      const { getByRole } = render(
        <SimpleMenuTemplated defaultIsOpen={false} openOnHover />
      );
      const menuRoot = getByRole("group");
      const menuButton = getByRole("button");

      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).toHaveClass(onHoverClassName);
      userEvent.hover(menuButton);
      expect(menuRoot).toHaveClass(activeClassName);
    });

    it("if `openOnHover` is set to `false`, menu is not shown when root element is hovered", () => {
      const { getByRole } = render(
        <SimpleMenuTemplated defaultIsOpen={false} openOnHover={false} />
      );
      const menuRoot = getByRole("group");
      const menuButton = getByRole("button");

      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).not.toHaveClass(onHoverClassName);
      userEvent.hover(menuButton);
      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).not.toHaveClass(onHoverClassName);
    });
  });

  describe(getClassNames, () => {
    it("should return correct classes when isOpen = false and itemAlignment = false", () => {
      expect(getClassNames(false, "left")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--right"`
      );
    });

    it("should return correct classes when isOpen = false and itemAlignment = true", () => {
      expect(getClassNames(false, "right")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left"`
      );
    });

    it("should return correct classes when isOpen = true and itemAlignment = false", () => {
      expect(getClassNames(true, "left")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--right neo-dropdown--active"`
      );
    });

    it("should return correct classes when isOpen = true and itemAlignment = true", () => {
      expect(getClassNames(true, "right")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left neo-dropdown--active"`
      );
    });

    it("should return correct classes when className is passed", () => {
      expect(getClassNames(true, "right", "extraclass")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left neo-dropdown--active extraclass"`
      );
    });
  });

  describe("Storybook tests", () => {
    describe("SimpleMenu", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<SimpleMenu />);
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

    describe("SimpleMenuTemplated", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<SimpleMenuTemplated />);
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

    describe("SimpleMenuRightAlignedTemplated", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<SimpleMenuRightAlignedTemplated />);
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

    describe("FunctionalMenu", () => {
      let renderResult;
      beforeEach(() => {
        // ignore example `console.log` calls
        vi.spyOn(console, "log").mockImplementation(() => null);

        renderResult = render(<FunctionalMenu />);
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

    describe("MenuSeperator", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<MenuSeperator />);
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

    describe("MultiLevelSubMenu", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<MultiLevelSubMenu />);
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

    describe("TwoMenus", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<TwoMenus />);
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
