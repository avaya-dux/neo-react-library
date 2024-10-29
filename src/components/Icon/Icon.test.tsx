import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { Icon } from ".";

describe("Icon Component", () => {
	const ariaLabel = "label for testing";

	it("fully renders without exploding", () => {
		render(<Icon icon="settings" aria-label={ariaLabel} />);

		const rootElement = screen.getByLabelText(ariaLabel);
		expect(rootElement).toBeTruthy();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<Icon icon="settings" aria-label={ariaLabel} />,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("allows custom class names ", () => {
		const customClassName = "ha-ha css-class-name-test";
		render(
			<Icon icon="save" aria-label={ariaLabel} className={customClassName} />,
		);

		const rootElement = screen.getByLabelText(ariaLabel);
		expect(rootElement).toHaveClass(customClassName);
	});

	it("throws a `console.error` if `status` is passed with `size` as `sm`", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => null);
		render(
			<Icon
				icon="settings"
				aria-label={ariaLabel}
				size="sm"
				status="inbound"
			/>,
		);

		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	it("throws an error if `aria-label` is not passed", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => null); // hide error from console
		expect(() =>
			// biome-ignore lint/a11y/useValidAriaValues: testing an invalid value
			render(<Icon icon="settings" aria-label="" />),
		).toThrowError(
			"A descriptive label is required for screen readers to identify the button's purpose",
		);
		spy.mockRestore();
	});

	describe("renders the correct icon size", () => {
		it("if `size` is `sm`, has a class name: `neo-icon--small`", () => {
			render(<Icon icon="save" aria-label={ariaLabel} size="sm" />);

			const rootElement = screen.getByLabelText(ariaLabel);
			expect(rootElement).toHaveClass("neo-icon--small");
		});

		it("if `size` is `md`, has a class name: `neo-icon--medium`", () => {
			render(<Icon icon="save" aria-label={ariaLabel} size="md" />);

			const rootElement = screen.getByLabelText(ariaLabel);
			expect(rootElement).toHaveClass("neo-icon--medium");
		});

		it("if `size` is `lg`, has a class name: `neo-icon--large`", () => {
			render(<Icon icon="save" aria-label={ariaLabel} size="lg" />);

			const rootElement = screen.getByLabelText(ariaLabel);
			expect(rootElement).toHaveClass("neo-icon--large");
		});

		it("shows a large icon if `status` is passed with `size` as `lg`", () => {
			render(
				<Icon icon="save" aria-label={ariaLabel} size="lg" status="inbound" />,
			);

			const rootElement = screen.getByLabelText(ariaLabel);
			expect(rootElement).toHaveClass("neo-icon-state--large");
		});
	});

	describe("handles the `notification` prop appropriately", () => {
		it("if `notification` is false, the root element does not have children", () => {
			render(<Icon icon="save" aria-label={ariaLabel} />);

			const rootElement = screen.getByLabelText(ariaLabel);
			expect(rootElement.firstChild).toBeNull();
		});

		it("if `notification` is passed, has a child with a class name: `neo-badge`", () => {
			render(<Icon icon="save" aria-label={ariaLabel} notification />);

			const rootElement = screen.getByLabelText(ariaLabel);
			expect(rootElement.firstChild).toHaveClass("neo-badge");
		});
	});
});
