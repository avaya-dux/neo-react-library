import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { Drawer } from ".";
import * as DrawerStories from "./Drawer.stories";

const { BasicDrawer, WithNote } = composeStories(DrawerStories);

describe("Drawer", () => {
	it("fully renders without exploding", () => {
		render(<Drawer aria-label="example drawer">content</Drawer>);

		const rootElement = screen.getByRole("dialog");
		expect(rootElement).toBeInTheDocument();
	});

	it("fully renders with a title without exploding", () => {
		const { getByRole } = render(<Drawer title="example title" />);

		const rootElement = getByRole("dialog");
		expect(rootElement).toBeTruthy();
	});

	it("fully renders with a JSX title without exploding", () => {
		const { getByRole } = render(
			<Drawer title={<span>example JSX title</span>} />,
		);

		const rootElement = getByRole("dialog");
		expect(rootElement).toBeTruthy();
	});

	it("allows the passing of `<div>` props", () => {
		render(<Drawer aria-label="basic drawer example" style={{ width: 100 }} />);
		render(<Drawer title="full drawer" style={{ width: 100 }} />);

		const [basicSheetRootElement, sheetRootElement] =
			screen.getAllByRole("dialog");

		expect(basicSheetRootElement).toHaveStyle("width: 100px");
		expect(sheetRootElement).toHaveStyle("width: 100px");
	});

	it("throws error if there is no `aria-label` or `title` passed", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => null);
		expect(() => render(<Drawer />)).toThrow();
		expect(spy).toHaveBeenCalled();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<Drawer title="drawer title" />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	describe("`open` functionality", () => {
		it("when `open={true}`, a Drawer's contents _are_ visible", async () => {
			render(<Drawer open={true} title="drawer title" />);

			const drawer = screen.getByRole("dialog");
			expect(drawer).toHaveClass("neo-drawer--isOpen");
		});

		it("when `open={false}`, a Drawer's contents are _not_ visible", () => {
			render(<Drawer open={false} title="drawer title" />);

			const drawer = screen.getByRole("dialog");
			expect(drawer).not.toHaveClass("neo-drawer--isOpen");
		});
	});

	describe("storybook tests", () => {
		describe("BasicDrawer", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<BasicDrawer />);
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

		describe("WithNote", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<WithNote />);
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
