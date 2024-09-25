import { render, screen } from "@testing-library/react";

import { LeftNav } from "./";

describe("Side Navigation backwards compatibility test", () => {
	it("prop drills", () => {
		// NOTE: this is a copy of the side nav test: renders properly when `aria-labelledby` is passed
		const id = "side-nav-title";
		render(
			<div>
				<h1 id={id}>Side Navigation</h1>

				<LeftNav aria-labelledby={id}>
					<p>junk content</p>
				</LeftNav>
			</div>,
		);

		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});
});
