import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { IconButton } from "./IconButton";

describe("Button", () => {
	it("fully renders without exploding", () => {
		const { getByTestId } = render(
			<IconButton
				aria-label="description test"
				data-testid="neo-icon-button"
				dir="rtl"
				icon="save"
				shape="square"
			/>,
		);

		const rootElement = getByTestId("neo-icon-button");
		expect(rootElement).toBeTruthy();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<IconButton
				aria-label="test-axe-name"
				data-testid="neo-icon-button"
				icon="save"
				id="test-axe"
				shape="square"
			/>,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("throws an error if `aria-label` is not passed", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => null); // hide error from console
		expect(() => render(<IconButton icon="save" shape="square" />)).toThrow();
		spy.mockRestore();
	});

	it("should respect the 'badge' prop", () => {
		const badgeText = "100k";
		const { getByTestId } = render(
			<IconButton
				aria-label="description test"
				badge={badgeText}
				data-testid="neo-icon-button"
			/>,
		);
		const rootElement = getByTestId("neo-icon-button");
		expect(rootElement).toHaveAttribute("data-badge", badgeText);
	});

	it("cuts off 'badge' text at 12 characters", () => {
		const badgeText = "12345678901234567";
		const { getByTestId } = render(
			<IconButton
				aria-label="description test"
				badge={badgeText}
				data-testid="neo-icon-button"
			/>,
		);
		const rootElement = getByTestId("neo-icon-button");

		expect(badgeText.length).toBe(17);
		expect(rootElement).toHaveAttribute("data-badge", badgeText.slice(0, 12));
	});
	it("assigns the appropriate class name when the `size` prop is passed as wide", () => {
		render(
			<IconButton aria-label="description test" shape="square" size="wide" />,
		);
		const rootElement = screen.getByRole("button");
		expect(rootElement).toHaveClass("neo-btn-wide");
	});
});
