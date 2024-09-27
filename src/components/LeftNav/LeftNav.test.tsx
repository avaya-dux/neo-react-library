import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { LeftNav } from "./";

describe("LeftNav", () => {
	window.HTMLElement.prototype.scrollIntoView = vi.fn();
	describe("a11y tests", () => {
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

		it("renders properly when `aria-label` is passed", () => {
			render(<LeftNav aria-label="Main Navigation">{examplechildren}</LeftNav>);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
		});

		it("renders properly when `aria-labelledby` is passed", () => {
			const id = "left-nav-title";
			render(
				<div>
					<h1 id={id}>Left Navigation</h1>

					<LeftNav aria-labelledby={id}>{examplechildren}</LeftNav>
				</div>,
			);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
		});

		it("throws an error if no 'aria-label*` is passed", () => {
			vi.spyOn(console, "error").mockImplementation(() => null);

			expect(() =>
				// biome-ignore lint/a11y/useValidAriaValues: we are purposefully testing an invalid value
				render(<LeftNav aria-label="">{examplechildren}</LeftNav>),
			).toThrowError();
		});
	});
});
