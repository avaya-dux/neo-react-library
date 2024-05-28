import { render } from "@testing-library/react";
import log from "loglevel";
import { vi } from "vitest";

import { MenuItem } from "../MenuItem";
import { MenuSeparator } from "../MenuSeparator";
import { SubMenu } from "../SubMenu";
import {
	addIdToChildren,
	buildMenuIndexes,
	layoutChildren,
	getContentCss,
} from "./";

const menuHelpersLogger = log.getLogger("menu-helpers");
menuHelpersLogger.disableAll();

describe("Menu helper methods", () => {
	describe("addIdToChildren", () => {
		it("should do nothing when child is not menu item or sub menu", () => {
			const children = [<MenuSeparator key="separator" />];
			expect(addIdToChildren(children)).toEqual(children);
		});

		it("should add id when menu item does not have id", () => {
			const menuItem = <MenuItem>View</MenuItem>;
			expect(addIdToChildren([menuItem])[0].props.id).not.toBeNull();
		});

		it("should keep the id when menu item has id", () => {
			const menuItem = <MenuItem id="id">View</MenuItem>;
			expect(addIdToChildren([menuItem])[0].props.id).toBe("id");
		});

		it("should add id to button when submenu button does not have id", () => {
			const subMenu = <SubMenu menuRootElement={<MenuItem>File</MenuItem>} />;
			expect(
				addIdToChildren([subMenu])[0].props.menuRootElement.props.id,
			).not.toBeNull();
		});

		it("should keep the button id when submenu button has id", () => {
			const subMenu = (
				<SubMenu menuRootElement={<MenuItem id="id">File</MenuItem>} />
			);
			expect(addIdToChildren([subMenu])[0].props.menuRootElement.props.id).toBe(
				"id",
			);
		});
	});

	describe("buildMenuIndexes", () => {
		it("should return empty array with empty children", () => {
			const children = [];
			expect(buildMenuIndexes(children)).toEqual([]);
		});

		it("should return empty array with just MenuSeparator", () => {
			const children = [<MenuSeparator key="separator" />];
			expect(buildMenuIndexes(children)).toEqual([]);
		});

		it("should return correct result with one MenuItem", () => {
			const children = [<MenuItem key="menuitem">View</MenuItem>];
			expect(buildMenuIndexes(children)).toMatchInlineSnapshot(`
        [
          {
            "id": undefined,
            "index": 0,
          },
        ]
      `);
		});

		it("should return correct result with one SubMenu", () => {
			const children = [
				<SubMenu
					id="sub"
					key="sub"
					menuRootElement={<MenuItem id="button">File</MenuItem>}
				>
					<MenuItem>View</MenuItem>
					<MenuItem>Edit</MenuItem>
					<MenuItem>Delete</MenuItem>
				</SubMenu>,
			];
			expect(buildMenuIndexes(children)).toMatchInlineSnapshot(`
        [
          {
            "id": "button",
            "index": 0,
            "length": 3,
          },
        ]
      `);
		});

		it("should return correct result with one MenuItem and one SubMenu", () => {
			const children = [
				<SubMenu
					id="sub"
					key="sub"
					menuRootElement={<MenuItem id="button">File</MenuItem>}
				>
					<MenuItem>View</MenuItem>
					<MenuItem>Edit</MenuItem>
					<MenuItem>Delete</MenuItem>
				</SubMenu>,
				<MenuItem id="help" key="menuitem-help">
					Help
				</MenuItem>,
			];
			expect(buildMenuIndexes(children)).toMatchInlineSnapshot(`
        [
          {
            "id": "button",
            "index": 0,
            "length": 3,
          },
          {
            "id": "help",
            "index": 1,
          },
        ]
      `);
		});
	});

	describe("layoutChildren", () => {
		let handleMenuKeyDown;
		let handleMenuMouseMove;
		let handleMenuBlur;
		beforeEach(() => {
			handleMenuKeyDown = vi.fn();
			handleMenuMouseMove = vi.fn();
			handleMenuBlur = vi.fn();
		});

		it("should render active menu item correctly", () => {
			const menuIndexes = [{ index: 1 }];
			const cursor = 0;
			const children = [
				<MenuSeparator key="separator" />,
				<MenuItem id="1" key="menuitem-1">
					View
				</MenuItem>,
			];
			const result = layoutChildren(
				children,
				handleMenuKeyDown,
				handleMenuMouseMove,
				handleMenuBlur,
				menuIndexes,
				cursor,
				"",
				1,
			);
			const { getByRole } = render(result);
			const menuItem = getByRole("menuitem");
			expect(menuItem).toMatchInlineSnapshot(`
        <div
          class="neo-dropdown__link neo-dropdown__link-active"
          id="1"
          role="menuitem"
          tabindex="0"
        >
          View
        </div>
      `);
		});

		it("should render active sub menu correctly", () => {
			const menuIndexes = [{ index: 0 }, { index: 1, length: 2 }];
			const cursor = 1;
			const testId = "submenu-test-id";
			const children = [
				<MenuItem id="1" key="menuitem-1">
					View
				</MenuItem>,
				<SubMenu
					key="sub-2"
					id="2"
					menuRootElement={
						<MenuItem id="20" data-testid={testId}>
							SubMenu
						</MenuItem>
					}
				>
					<MenuItem id="21">SubMenu-1</MenuItem>
					<MenuItem id="22">SubMenu-2</MenuItem>
					<MenuItem id="23">SubMenu-3</MenuItem>
				</SubMenu>,
			];
			const result = layoutChildren(
				children,
				handleMenuKeyDown,
				handleMenuMouseMove,
				handleMenuBlur,
				menuIndexes,
				cursor,
				"ENTER_SUB_MENU",
				10,
			);
			const { getByTestId, container } = render(result);
			const subMenu = getByTestId(testId);
			expect(subMenu).toMatchInlineSnapshot(`
        <div
          class="neo-dropdown__link neo-dropdown__link-active"
          data-testid="submenu-test-id"
          id="20"
          role="menuitem"
          tabindex="0"
        >
          SubMenu
        </div>
      `);
			expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="neo-dropdown__content"
            role="menu"
            tabindex="-1"
          >
            <div
              class="neo-dropdown__link"
              id="1"
              role="menuitem"
              tabindex="-1"
            >
              View
            </div>
            <div
              class="neo-dropdown__item neo-dropdown--active"
              id="2"
            >
              <div
                class="neo-dropdown__link neo-dropdown__link-active"
                data-testid="submenu-test-id"
                id="20"
                role="menuitem"
                tabindex="0"
              >
                SubMenu
              </div>
              <div
                class="neo-dropdown__content"
                role="menu"
                tabindex="-1"
              >
                <div
                  class="neo-dropdown__link neo-dropdown__link-active"
                  id="21"
                  role="menuitem"
                  tabindex="0"
                >
                  SubMenu-1
                </div>
                <div
                  class="neo-dropdown__link"
                  id="22"
                  role="menuitem"
                  tabindex="-1"
                >
                  SubMenu-2
                </div>
                <div
                  class="neo-dropdown__link"
                  id="23"
                  role="menuitem"
                  tabindex="-1"
                >
                  SubMenu-3
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
		});

		it("should render inactive menu item correctly", () => {
			const menuIndexes = [{ index: 1 }];
			const cursor = 2;
			const children = [
				<MenuSeparator key="separator" />,
				<MenuItem id="1" data-testid="inactive" key="menuitem-1">
					View
				</MenuItem>,
			];
			const result = layoutChildren(
				children,
				handleMenuKeyDown,
				handleMenuMouseMove,
				handleMenuBlur,
				menuIndexes,
				cursor,
				"",
				1,
			);
			const { getByTestId } = render(result);
			const menuItem = getByTestId("inactive");
			expect(menuItem).toMatchInlineSnapshot(`
        <div
          class="neo-dropdown__link"
          data-testid="inactive"
          id="1"
          role="menuitem"
          tabindex="-1"
        >
          View
        </div>
      `);
		});

		it("should render inactive sub menu correctly", () => {
			const menuIndexes = [{ index: 0 }, { index: 1, length: 2 }];
			const cursor = 0;
			const testId = "submenu-test-id";
			const children = [
				<MenuItem id="1" key="menuitem-1">
					View
				</MenuItem>,
				<SubMenu
					key="sub-2"
					id="2"
					menuRootElement={
						<MenuItem id="20" data-testid={testId}>
							SubMenu
						</MenuItem>
					}
				>
					<MenuItem id="21">SubMenu-1</MenuItem>
					<MenuItem id="22">SubMenu-2</MenuItem>
					<MenuItem id="23">SubMenu-3</MenuItem>
				</SubMenu>,
			];
			const result = layoutChildren(
				children,
				handleMenuKeyDown,
				handleMenuMouseMove,
				handleMenuBlur,
				menuIndexes,
				cursor,
				"ENTER_SUB_MENU",
				10,
			);
			const { getByTestId } = render(result);
			const subMenu = getByTestId(testId);
			expect(subMenu).toMatchInlineSnapshot(`
        <div
          class="neo-dropdown__link"
          data-testid="submenu-test-id"
          id="20"
          role="menuitem"
          tabindex="-1"
        >
          SubMenu
        </div>
      `);
		});

		it("should render menu separator correctly", () => {
			const menuIndexes = [{ index: 1 }];
			const cursor = 0;
			const children = [
				<MenuSeparator data-testid="separator" key="separator" />,
				<MenuItem id="1" key="menuitem-1">
					View
				</MenuItem>,
			];
			const result = layoutChildren(
				children,
				handleMenuKeyDown,
				handleMenuMouseMove,
				handleMenuBlur,
				menuIndexes,
				cursor,
				"",
				1,
			);
			const { getByTestId } = render(result);
			const menuItem = getByTestId("separator");
			expect(menuItem).toMatchInlineSnapshot(`
        <hr
          class="neo-dropdown__separator"
          data-testid="separator"
        />
      `);
		});
	});
	describe("getContentCss", () => {
		it("returns correct results when input=below and up is undefined", () => {
			const result = getContentCss("below");
			expect(result).toEqual("neo-dropdown__content");
			expect(result).not.toContain("neo-dropdown__content--aside-upwards");
			expect(result).not.toContain("neo-dropdown__content--below-upwards");
		});
		it("returns correct results when input=below and up=true", () => {
			const result = getContentCss("below", true);
			expect(result).toContain("neo-dropdown__content");
			expect(result).not.toContain("neo-dropdown__content--aside-upwards");
			expect(result).toContain("neo-dropdown__content--below-upwards");
		});

		it("returns correct results when input=right and up=false", () => {
			const result = getContentCss("right", false);
			expect(result).toContain("neo-dropdown__content");
			expect(result).not.toContain("neo-dropdown__content--aside-upwards");
			expect(result).toContain("neo-dropdown__content--toggle-right");
		});
		it("returns correct results when input=right and up=true", () => {
			const result = getContentCss("right", true);
			expect(result).toContain("neo-dropdown__content");
			expect(result).toContain("neo-dropdown__content--aside-upwards");
			expect(result).toContain("neo-dropdown__content--toggle-right");
		});

		it("returns correct results when input=left and up=false", () => {
			const result = getContentCss("left", false);
			expect(result).toContain("neo-dropdown__content");
			expect(result).not.toContain("neo-dropdown__content--aside-upwards");
			expect(result).toContain("neo-dropdown__content--toggle-left");
		});
		it("returns correct results when input=left and up=true", () => {
			const result = getContentCss("left", true);
			expect(result).toContain("neo-dropdown__content");
			expect(result).toContain("neo-dropdown__content--aside-upwards");
			expect(result).toContain("neo-dropdown__content--toggle-left");
		});
	});
});
