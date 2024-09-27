import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { Drawer } from ".";

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

	it("extends `<dialog>` props", () => {
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
		it("when `open={true}`, a Drawer's contents _are_ visible", () => {
			render(<Drawer open={true} title="drawer title" />);

			const drawer = screen.getByRole("dialog");
			expect(drawer).toHaveClass("neo-drawer neo-drawer--open");
		});

		it("when `open={false}`, a Drawer's contents are _not_ visible", () => {
			render(<Drawer open={false} title="drawer title" />);

			const drawer = screen.getByRole("dialog");
			expect(drawer).not.toHaveClass("neo-drawer--open");
		});
	});
});
