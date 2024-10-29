import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

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
