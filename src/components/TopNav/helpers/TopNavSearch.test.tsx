import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { TopNavSearch } from ".";

describe("TopNavSearch", () => {
	const text = "Search";

	it("renders without exploding", () => {
		// ignore `jsdom` error: "Error: Not implemented: window.computedStyle"
		vi.spyOn(console, "error").mockImplementation(() => null);
		render(<TopNavSearch />);

		expect(screen.getByRole("button")).toBeDefined();
		expect(screen.getByLabelText(text)).toBeDefined();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<TopNavSearch />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
