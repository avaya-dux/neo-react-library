import { composeStories } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import log from "loglevel";
import { vi } from "vitest";
import { MenuItem } from "./MenuItem";
import * as MenuItemStories from "./MenuItem.stories";

log.disableAll();

const { Default, ItemTemplate } = composeStories(MenuItemStories);

describe("Menu Item Storybook tests", () => {
	describe("Event handlers", () => {
		it("onClick is called on mouse click", () => {
			const onClick = vi.fn();
			const renderResult = render(
				<MenuItem onClick={onClick}>Click Me</MenuItem>,
			);
			const { container } = renderResult;
			expect(container).toBeDefined();
			fireEvent.click(screen.getByRole("menuitem"));
			expect(onClick).toHaveBeenCalled();
		});
		it("onClick is called on enter press", () => {
			const onClick = vi.fn();
			const renderResult = render(
				<MenuItem onClick={onClick}>Click Me</MenuItem>,
			);
			const { container } = renderResult;
			expect(container).toBeDefined();
			fireEvent.keyDown(screen.getByRole("menuitem"), {
				key: "Enter",
				code: "Enter",
				keyCode: 13,
			});
			expect(onClick).toHaveBeenCalled();
		});
		it("onClick is called on space press", () => {
			const onClick = vi.fn();
			const renderResult = render(
				<MenuItem onClick={onClick}>Click Me</MenuItem>,
			);
			const { container } = renderResult;
			expect(container).toBeDefined();
			fireEvent.keyDown(screen.getByRole("menuitem"), {
				key: " ",
				code: "Space",
				keyCode: 32,
			});
			expect(onClick).toHaveBeenCalled();
		});
		it("onKeyDown is called on key down and onClick is not called", () => {
			const onKeyDown = vi.fn();
			const onClick = vi.fn();
			const renderResult = render(
				<MenuItem onKeyDown={onKeyDown} onClick={onClick}>
					Click Me
				</MenuItem>,
			);
			const { container } = renderResult;
			expect(container).toBeDefined();
			fireEvent.keyDown(screen.getByRole("menuitem"), {
				key: " ",
				code: "Space",
				keyCode: 32,
			});
			expect(onKeyDown).toHaveBeenCalled();
			expect(onClick).not.toHaveBeenCalled();
		});
	});
	describe("Default", () => {
		let renderResult;
		beforeEach(() => {
			renderResult = render(<Default />);
		});

		it("should render ok", () => {
			const { container } = renderResult;
			expect(container).toBeDefined();
		});

		it("passes basic axe compliance", async () => {
			const { container } = renderResult;
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});

	describe("ItemTemplate", () => {
		let renderResult;
		beforeEach(() => {
			renderResult = render(<ItemTemplate />);
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
