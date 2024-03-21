import { act, render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import log from "loglevel";
import { vi } from "vitest";

import { Button } from "components";
import { UserEventKeys } from "utils";

import { Menu, MenuButton, MenuItem } from ".";
import { getClassNames } from "./Menu";
import {
  FunctionalMenu,
  MenuSeperator,
  MultiLevelSubMenu,
  SimpleMenu,
  SimpleMenuRightAlignedTemplated,
  SimpleMenuTemplated,
  TwoMenus,
  UpGoingMenus,
} from "./Menu.stories";

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

describe("Menu", () => {
  const defaultChildren = [
    <MenuItem key="1">Item1</MenuItem>,
    <MenuItem key="2">Item2</MenuItem>,
    <MenuItem key="3">Item3</MenuItem>,
  ];
  const defaultRootElement = <Button>Open Menu</Button>;

  const user = userEvent.setup();

  describe("Base tests", () => {
    it("retains passed `onMenuClose` functionality", async () => {
      const onMenuCloseSpy = vi.fn();
      const { getByRole } = render(
        <Menu
          defaultIsOpen // not ideal
          onMenuClose={onMenuCloseSpy}
          menuRootElement={<MenuButton>button</MenuButton>}
        >
          <MenuItem>placeholder one</MenuItem>
          <MenuItem>placeholder two</MenuItem>
        </Menu>,
      );

      const button = getByRole("button");
      expect(onMenuCloseSpy).not.toHaveBeenCalled();

      await user.hover(button);
      expect(onMenuCloseSpy).not.toHaveBeenCalled();

      await user.click(button);
      expect(onMenuCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("keyboard and mouse tests", () => {
    let renderResult: RenderResult;
    beforeEach(() => {
      renderResult = render(<MultiLevelSubMenu />);
    });

    it("menu can be opened and closed via keyboard functionality", async () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");

      // menu is hidden before tabbing to menu button and pressing key "space"
      expect(getByRole("group")).not.toBeNull();
      expect(button).not.toBeNull();
      expect(() => getByRole("menu")).toThrow();

      // tab to menu button, press spacebar, and menu is visible
      await user.tab();
      expect(button).toHaveFocus();
      await user.keyboard(UserEventKeys.SPACE);
      expect(() => getByRole("menu")).not.toThrow();

      // press esc should hide menu
      await user.keyboard(UserEventKeys.ESC);
      expect(() => getByRole("menu")).toThrow();
    });

    it("menu can be opened and closed via mouse functionality", async () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");

      // menu is hidden before clicking menu button
      expect(getByRole("group")).not.toBeNull();
      expect(button).not.toBeNull();
      expect(() => getByRole("menu")).toThrow();

      // tab to menu button, press spacebar, and menu is visible
      await user.tab();
      expect(button).toHaveFocus();
      await user.click(button);
      expect(() => getByRole("menu")).not.toThrow();

      // click again to hide menu
      await user.click(button);
      expect(() => getByRole("menu")).toThrow();
    });

    it("menu can be navigated via keyboard functionality.", async () => {
      const { getByRole, queryAllByRole } = renderResult;
      const button = getByRole("button");
      expect(() => getByRole("menu")).toThrow();

      await user.tab();
      expect(button).toHaveFocus();

      // button arrowdown will open menu and move focus to first menu item
      await user.keyboard(UserEventKeys.DOWN);
      expect(() => getByRole("menu")).not.toThrow();
      const menuItems = queryAllByRole("menuitem");
      expect(menuItems[0]).toHaveAttribute("tabindex", "0");
      expect(menuItems[1]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");

      // arrowdown again to navigate to next menu item
      await user.keyboard(UserEventKeys.DOWN);
      expect(menuItems[0]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[1]).toHaveAttribute("tabindex", "0");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("focus testing", () => {
    it("menu button should have focus after menu is closed via item selection by keyboard ENTER", async () => {
      render(
        <Menu menuRootElement={defaultRootElement}>{defaultChildren}</Menu>,
      );
      const button = screen.getByRole("button");
      await user.click(button);

      const menuItems = screen.getAllByRole("menuitem");
      expect(menuItems[0]).toHaveFocus();

      await user.keyboard(UserEventKeys.ENTER);
      expect(button).toHaveFocus();
    });

    it("menu button should have focus after menu is closed via item selection by keyboard ESC", async () => {
      render(
        <Menu menuRootElement={defaultRootElement}>{defaultChildren}</Menu>,
      );
      const button = screen.getByRole("button");
      await user.click(button);

      const menuItems = screen.getAllByRole("menuitem");
      expect(menuItems[0]).toHaveFocus();

      await user.keyboard(UserEventKeys.ESC);
      expect(button).toHaveFocus();
    });

    it("menu button should have focus after menu is closed via item selection by mouse click", async () => {
      render(
        <Menu menuRootElement={defaultRootElement}>{defaultChildren}</Menu>,
      );
      const button = screen.getByRole("button");
      await user.click(button);

      const menuItems = screen.getAllByRole("menuitem");
      expect(menuItems[0]).toHaveFocus();

      await user.click(menuItems[1]);
      expect(button).toHaveFocus();
    });
  });

  describe("MenuButton retains any passed functionality", () => {
    const onClickSpy = vi.fn();
    const onKeyDownSpy = vi.fn();
    const onMouseEnterSpy = vi.fn();
    let renderResult: RenderResult;

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
        </Menu>,
      );
    });

    it("retains passed `onClick` functionality", async () => {
      onClickSpy.mockClear();
      expect(onClickSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      expect(onClickSpy).not.toHaveBeenCalled();
      await user.click(button);
      expect(onClickSpy).toHaveBeenCalled();
    });

    it("retains passed `onKeyDown` functionality", async () => {
      onKeyDownSpy.mockClear();
      expect(onKeyDownSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      await user.tab();
      expect(button).toHaveFocus();

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      await user.keyboard(UserEventKeys.SPACE);
      expect(onKeyDownSpy).toHaveBeenCalled();
    });

    it("retains passed `onMouseEnter` functionality", async () => {
      onMouseEnterSpy.mockClear();
      expect(onMouseEnterSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      expect(onMouseEnterSpy).not.toHaveBeenCalled();
      await user.hover(button);
      expect(onMouseEnterSpy).toHaveBeenCalled();
    });
  });

  describe("MenuButton respects the prop `openOnHover`", () => {
    const activeClassName = "neo-dropdown--active";
    const onHoverClassName = "neo-dropdown--onhover";

    it("if `openOnHover` is set to `true`, menu shows when root element is hovered", async () => {
      render(
        <SimpleMenuTemplated
          defaultIsOpen={false}
          openOnHover={true}
          menuRootElement={defaultRootElement}
        >
          {defaultChildren}
        </SimpleMenuTemplated>,
      );
      const menuRoot = screen.getByRole("group");
      const menuButton = screen.getByRole("button");

      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).toHaveClass(onHoverClassName);
      await act(async () => {
        await user.hover(menuButton);
      });
      expect(menuRoot).toHaveClass(activeClassName);
    });

    it("if `openOnHover` is set to `false`, menu is not shown when root element is hovered", async () => {
      render(
        <SimpleMenuTemplated
          defaultIsOpen={false}
          openOnHover={false}
          menuRootElement={defaultRootElement}
        >
          {defaultChildren}
        </SimpleMenuTemplated>,
      );
      const menuRoot = screen.getByRole("group");
      const menuButton = screen.getByRole("button");

      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).not.toHaveClass(onHoverClassName);
      await act(async () => {
        await user.hover(menuButton);
      });
      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).not.toHaveClass(onHoverClassName);
    });
  });

  describe("getClassNames", () => {
    it("should return correct classes when isOpen = false and itemAlignment = false", () => {
      expect(getClassNames(false, "left")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--right"`,
      );
    });

    it("should return correct classes when isOpen = false and itemAlignment = true", () => {
      expect(getClassNames(false, "right")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left"`,
      );
    });

    it("should return correct classes when isOpen = true and itemAlignment = false", () => {
      expect(getClassNames(true, "left")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--right neo-dropdown--active"`,
      );
    });

    it("should return correct classes when isOpen = true and itemAlignment = true", () => {
      expect(getClassNames(true, "right")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left neo-dropdown--active"`,
      );
    });

    it("should return correct classes when className is passed", () => {
      expect(getClassNames(true, "right", "extraclass")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left neo-dropdown--active extraclass"`,
      );
    });
  });

  describe("Storybook tests", () => {
    describe("SimpleMenu", () => {
      let renderResult: RenderResult;
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
      let renderResult: RenderResult;
      beforeEach(() => {
        renderResult = render(
          <SimpleMenuTemplated menuRootElement={defaultRootElement}>
            {defaultChildren}
          </SimpleMenuTemplated>,
        );
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
      let renderResult: RenderResult;
      beforeEach(() => {
        renderResult = render(
          <SimpleMenuRightAlignedTemplated menuRootElement={defaultRootElement}>
            {defaultChildren}
          </SimpleMenuRightAlignedTemplated>,
        );
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
      let renderResult: RenderResult;
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
      let renderResult: RenderResult;
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
      let renderResult: RenderResult;
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
      let renderResult: RenderResult;
      beforeEach(() => {
        renderResult = render(
          <TwoMenus
            closeOnBlur
            onLeftMenuClose={() => null}
            onRightMenuClose={() => null}
          />,
        );
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
    describe("UpGoingMenus", () => {
      let renderResult: RenderResult;
      beforeEach(() => {
        renderResult = render(<UpGoingMenus />);
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
