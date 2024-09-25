import { render, screen } from "@testing-library/react";

import { LeftNav } from "./";

describe("Side Navigation backwards compatibility test", () => {
	const examplechildren = (
		<>
			<LeftNav.TopLinkItem label="Active by default" href="#active" />

			<LeftNav.TopLinkItem label="Link 2" href="#test2" disabled />

			<LeftNav.NavCategory expanded={true} label="Text Only Category">
				<LeftNav.LinkItem href="http://first.com">First Item</LeftNav.LinkItem>
				<LeftNav.LinkItem href="http://avaya.com" disabled>
					Disabled Item
				</LeftNav.LinkItem>
			</LeftNav.NavCategory>
		</>
	);

	it("prop drills", () => {
		// NOTE: this is a copy of the side nav test: renders properly when `aria-labelledby` is passed
		const id = "side-nav-title";
		render(
			<div>
				<h1 id={id}>Side Navigation</h1>

				<LeftNav aria-labelledby={id}>{examplechildren}</LeftNav>
			</div>,
		);

		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});
});
