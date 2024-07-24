import { fireEvent, render, screen } from "@testing-library/react";
import { MenuItem } from "components";
import { SplitButton } from "./SplitButton";

describe("SplitButton", () => {
	it("should render the SplitButton component", () => {
		render(
			<SplitButton buttonProps={{ text: "Send" }}>
				<MenuItem>item1</MenuItem>
			</SplitButton>,
		);
		expect(screen.getByText("Send")).toBeInTheDocument();
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
});
