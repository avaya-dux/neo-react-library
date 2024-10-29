import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Icon } from ".";

describe("Icon Component", () => {
	it("fully renders without exploding", () => {
		const { getByTestId } = render(
			<Icon
				data-testid="neo-icon"
				icon="settings"
				aria-label="test"
				role="figure"
			/>,
		);

		const rootElement = getByTestId("neo-icon");
		expect(rootElement).toBeTruthy();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<Icon
				data-testid="neo-icon"
				icon="settings"
				aria-label="test"
				role="figure"
			/>,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("test for className neo is in place", () => {
		const iconClassName = "neo-icon-save";
		const { getByTestId } = render(
			<Icon
				data-testid="neo-icon"
				icon="save"
				aria-label="test"
				role="figure"
			/>,
		);

		const rootElement = getByTestId("neo-icon");
		expect(rootElement).toBeTruthy();
		expect(rootElement).toHaveClass(iconClassName);
	});

	it("use a custom className ", () => {
		const customClassName = "ha-ha css-class-name-test";
		const { getByTestId } = render(
			<Icon
				data-testid="neo-icon"
				icon="save"
				aria-label="test"
				role="figure"
				className={customClassName}
			/>,
		);

		const rootElement = getByTestId("neo-icon");
		expect(rootElement).toBeTruthy();
		expect(rootElement).toHaveClass(customClassName);
	});

	it("if `notification` is false, the root element does not have children", () => {
		const ariaLabel = "available, has notification";
		render(<Icon icon="save" aria-label={ariaLabel} />);

		const rootElement = screen.getByLabelText(ariaLabel);
		expect(rootElement.firstChild).toBeNull();
	});

	it("if `notification` is passed, has a child with a class name: `neo-badge`", () => {
		const ariaLabel = "available, has notification";
		render(<Icon icon="save" aria-label={ariaLabel} notification />);

		const rootElement = screen.getByLabelText(ariaLabel);
		expect(rootElement.firstChild).toHaveClass("neo-badge");
	});
});
