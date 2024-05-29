import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { TopNavSkipNav } from ".";

describe("TopNavSkipNav", () => {
	const text = "Skip To Main Content";
	const href = "#main-content";

	it("renders without exploding", () => {
		render(<TopNavSkipNav href={href}>{text}</TopNavSkipNav>);

		expect(screen.getByRole("link")).toBeDefined();
		expect(screen.getByText(text)).toBeDefined();
	});

	describe("a11y checks", () => {
		it("throws an error if no descriptive text is passed", () => {
			const spy = vi.spyOn(console, "error").mockImplementation(() => null);
			expect(() => render(<TopNavSkipNav href={href} />)).toThrow();
			expect(spy).toHaveBeenCalled();
		});

		it("does not throws an error if children are passed", () => {
			const spy = vi.spyOn(console, "error").mockImplementation(() => null);

			render(<TopNavSkipNav href={href}>{text}</TopNavSkipNav>);

			expect(spy).not.toHaveBeenCalled();
		});

		it("does not throws an error if 'aria-label' are passed", () => {
			const spy = vi.spyOn(console, "error").mockImplementation(() => null);

			render(<TopNavSkipNav href={href} aria-label={text} />);

			expect(spy).not.toHaveBeenCalled();
		});

		it("passes basic axe compliance", async () => {
			const { container } = render(
				<TopNavSkipNav href={href}>{text}</TopNavSkipNav>,
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});
