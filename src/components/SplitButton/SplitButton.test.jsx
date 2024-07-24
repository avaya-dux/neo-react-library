import { fireEvent, render, screen } from "@testing-library/react";
import { MenuItem } from "components";
import { axe } from "jest-axe";
import { SplitButton } from "./SplitButton";

import * as stories from "./SplitButton.stories";

import { composeStories } from "@storybook/react";

const { Default, Varieties } = composeStories(stories);

describe("SplitButton", () => {
	it("should render the SplitButton component", () => {
		render(
			<SplitButton buttonProps={{ text: "Send" }}>
				<MenuItem>item1</MenuItem>
			</SplitButton>,
		);
		expect(screen.getByText("Send")).toBeInTheDocument();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<SplitButton
				buttonProps={{ text: "Send" }}
				menuProps={{ ariaLabel: "menu" }}
			>
				<MenuItem>item1</MenuItem>
			</SplitButton>,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("should render the dropdown menu when the button is clicked", () => {
		render(
			<SplitButton buttonProps={{ text: "Send" }}>
				<MenuItem>item1</MenuItem>
				<MenuItem>item2</MenuItem>
			</SplitButton>,
		);
		const buttons = screen.getAllByRole("button");
		expect(buttons.length).toBe(2);
		fireEvent.click(buttons[1]);
		expect(screen.getByRole("menu")).toBeInTheDocument();
		fireEvent.click(buttons[1]);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	describe("Story Tests", () => {
		it("Default story passes basic axe compliance", async () => {
			const { container } = render(<Default />);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
		it("Varieties story passes basic axe compliance", async () => {
			const { container } = render(<Varieties />);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});
