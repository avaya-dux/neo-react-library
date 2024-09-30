import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { UserEventKeys } from "utils";

import { Select } from "./Select";
import { fruitOptions } from "./utils/mockdata";

describe("Select", () => {
	const user = userEvent.setup();
	const label = "Searchable Select";

	describe("Searchable Single Select", () => {
		let renderResult;

		beforeEach(() => {
			renderResult = render(
				<Select label={label} searchable>
					{fruitOptions}
				</Select>,
			);
		});

		it("renders without exploding", () => {
			const { container } = renderResult;
			expect(container).not.toBe(null);
		});

		it("passes the correct props to label element", () => {
			const { getByText } = renderResult;
			const labelElement = getByText(label);
			const expectedAttributes = ["id", "for"];
			expectedAttributes.forEach((attribute) =>
				expect(labelElement).toHaveAttribute(attribute),
			);
		});

		it("passes the correct props to searchable element", () => {
			const { getByRole } = renderResult;
			const searchableElement = getByRole("combobox");
			const expectedAttributes = [
				"aria-autocomplete",
				"aria-controls",
				"aria-expanded",
			];
			expectedAttributes.forEach((attribute) =>
				expect(searchableElement).toHaveAttribute(attribute),
			);
		});

		it("toggles aria-expanded prop on click", async () => {
			const { container, getByRole } = renderResult;
			const toggleButton = container.querySelector(
				"span.neo-multiselect-combo__header",
			);
			const searchableElement = getByRole("combobox");
			expect(searchableElement).toHaveAttribute("aria-expanded", "false");
			fireEvent.click(toggleButton);
			await vi.waitUntil(() =>
				expect(searchableElement).toHaveAttribute("aria-expanded", "true"),
			);
			fireEvent.click(toggleButton);
			expect(searchableElement).toHaveAttribute("aria-expanded", "false");
		});

		it("clears content before input box where there is input from user", async () => {
			const { container } = renderResult;
			const inputbox = container.querySelector(
				"span.neo-multiselect-combo__header input:first-child",
			);
			await user.tab();
			expect(inputbox).toHaveFocus();
			// empty input should not select any option
			await user.keyboard("{Enter}");
			expect(inputbox.closest("span")).toHaveTextContent("");

			// select apple by typing in apple and pressing enter
			await user.keyboard("apple{Enter}");
			expect(inputbox.closest("span")).toHaveTextContent("Apple");
			expect(inputbox).toHaveValue("");

			// type in banana without pressing enter
			await user.keyboard("banana");
			expect(inputbox).toHaveValue("banana");
			// apple is removed in span
			expect(inputbox.closest("span")).toHaveTextContent("");
		});

		it("passes basic axe compliance", async () => {
			const { container } = renderResult;
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});

	describe("Searchable Multi Select", () => {
		it("toggles clicked elements", async () => {
			render(
				<Select label={label} multiple searchable>
					{fruitOptions}
				</Select>,
			);

			expect(screen.queryAllByRole("button")).toHaveLength(1);
			const combobox = screen.getByRole("combobox");
			const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
			expect(combobox).toHaveAttribute("aria-expanded", "false");
			await user.click(comboboxBtn);
			expect(combobox).toHaveAttribute("aria-expanded", "true");

			const options = screen.getAllByRole("option");
			fireEvent.click(options[0]);

			expect(screen.getAllByRole("button")).toHaveLength(2); // has one chip

			fireEvent.click(options[0]);

			expect(screen.queryAllByRole("button")).toHaveLength(1); // chip removed
		});

		it("can select and remove items via the keyboard", async () => {
			render(
				<Select label={label} multiple searchable>
					{fruitOptions}
				</Select>,
			);
			const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
			await user.click(comboboxBtn);

			await user.keyboard(fruitOptions[0].props.children);
			await user.keyboard(UserEventKeys.ENTER);

			expect(screen.getAllByRole("button")).toHaveLength(2); // has one chip

			await user.keyboard(UserEventKeys.BACKSPACE);

			expect(screen.queryAllByRole("button")).toHaveLength(1); // chip removed
		});

		it("clears the selection when the clear button is clicked", () => {
			const { container } = render(
				<Select multiple searchable label="not important">
					{fruitOptions}
				</Select>,
			);

			const toggleElement = screen.getByRole("combobox");
			const clearButton = screen.getByRole("button");

			// open menu
			toggleElement.focus();
			fireEvent.click(toggleElement);

			// select first
			fireEvent.click(container.querySelector("li"));

			// assert there is one chip
			expect(container.querySelectorAll("div.neo-chip--close").length).toEqual(
				1,
			);

			// click clear button
			fireEvent.click(clearButton);

			// assert there are no chips
			expect(container.querySelectorAll("div.neo-chip--close").length).toEqual(
				0,
			);
		});
	});

	describe("'creatable' functionality", () => {
		it("`SingleSelectSearchable` allows a user to create and remove custom options if `creatable` prop is set", async () => {
			const newOptionText = "New Option";
			render(
				<Select label={label} searchable creatable>
					{fruitOptions}
				</Select>,
			);

			const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
			await act(async () => await user.click(comboboxBtn));

			// pre search+add we have all options in the list
			expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

			await act(async () => await user.keyboard(newOptionText));
			expect(screen.getAllByRole("option")).toHaveLength(1);
			expect(screen.getByRole("option")).toHaveTextContent(newOptionText);

			await act(async () => await user.keyboard(UserEventKeys.DOWN));
			await act(async () => await user.keyboard(UserEventKeys.ENTER));

			// now that we've added the new option, we can now see the full list, excluding
			// the new option as we do not show that in the list
			expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

			// newly created text has been added
			expect(screen.queryByText(newOptionText)).toBeInTheDocument();

			await act(async () => await user.keyboard(UserEventKeys.BACKSPACE));
			expect(screen.queryByText(newOptionText)).not.toBeInTheDocument(); // text removed
		});

		it("`SingleSelectSearchable` allows a user to create exactly one custom option", async () => {
			const firstOptionText = "first custom option";
			const secondOptionText = "second custom option";
			render(
				<Select label={label} searchable creatable>
					{fruitOptions}
				</Select>,
			);

			const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
			await user.click(comboboxBtn);

			// add first option
			await user.keyboard(firstOptionText);
			await user.keyboard(UserEventKeys.DOWN);
			await user.keyboard(UserEventKeys.ENTER);

			// first option text has been created
			expect(screen.queryByText(firstOptionText)).toBeInTheDocument();

			// add second option
			await user.keyboard(secondOptionText);
			await user.keyboard(UserEventKeys.DOWN);
			await user.keyboard(UserEventKeys.ENTER);

			// first option text has been removed in place of second option text
			expect(screen.queryByText(firstOptionText)).not.toBeInTheDocument();
			expect(screen.getByText(secondOptionText)).toBeInTheDocument();
		});

		it("`MultiSelectSearchable` allows a user to create and remove custom options if `creatable` prop is set", async () => {
			const newOptionText = "New Option";
			render(
				<Select label={label} multiple searchable creatable>
					{fruitOptions}
				</Select>,
			);

			const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
			await act(async () => {
				await user.click(comboboxBtn);
			});

			// pre search+add we have all options in the list
			expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

			await act(async () => await user.keyboard(newOptionText));
			expect(screen.getAllByRole("option")).toHaveLength(1);
			expect(screen.getByRole("option")).toHaveTextContent(newOptionText);

			await act(async () => await user.keyboard(UserEventKeys.DOWN));
			await act(async () => await user.keyboard(UserEventKeys.ENTER));

			// now that we've added the new option, we can now see the full list, excluding
			// the new option as we do not show that in the list
			expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

			// newly created chip has been added
			expect(screen.getAllByRole("button")).toHaveLength(2);
			expect(screen.getByText(newOptionText)).toBeInTheDocument();

			await act(async () => {
				await user.keyboard(UserEventKeys.BACKSPACE);
			});
			expect(screen.queryAllByRole("button")).toHaveLength(1); // chip removed
		});

		it("`MultiSelectSearchable` allows a user to create multiple custom options", async () => {
			const firstOptionText = "first custom option";
			const secondOptionText = "second custom option";
			render(
				<Select label={label} multiple searchable creatable>
					{fruitOptions}
				</Select>,
			);

			const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
			await user.click(comboboxBtn);

			// add first option
			await user.keyboard(firstOptionText);
			await user.keyboard(UserEventKeys.DOWN);
			await user.keyboard(UserEventKeys.ENTER);

			// first option chip has been created
			expect(screen.getAllByRole("button")).toHaveLength(2);
			expect(screen.getByText(firstOptionText)).toBeInTheDocument();

			// add second option
			await user.keyboard(secondOptionText);
			await user.keyboard(UserEventKeys.DOWN);
			await user.keyboard(UserEventKeys.ENTER);

			// both chips have been created
			expect(screen.getAllByRole("button")).toHaveLength(3);
			expect(screen.getByText(secondOptionText)).toBeInTheDocument();
		});

		it("does not allow a user to create whitespace-only options, or duplicate existing options", async () => {
			const newOptionText = "New Option";
			render(
				<Select label={label} multiple searchable creatable>
					{fruitOptions}
				</Select>,
			);

			const comboboxBtn = screen.getAllByRole("textbox")[0].closest("span");
			await user.click(comboboxBtn);

			// pre search+add we have all options in the list
			expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

			// pure whitespace is ignored
			await user.keyboard("    ");
			expect(screen.getAllByRole("option")).toHaveLength(8);

			// add new option
			await user.keyboard(newOptionText);
			expect(screen.getAllByRole("option")).toHaveLength(1);
			expect(screen.getByRole("option")).toHaveTextContent(newOptionText);
			await user.keyboard(UserEventKeys.DOWN);
			await user.keyboard(UserEventKeys.ENTER);

			// now that we've added the new option, we can now see the full list, excluding
			// the new option as we do not show that in the list
			expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

			// newly created chip has been added
			expect(screen.getAllByRole("button")).toHaveLength(2);
			expect(screen.getByText(newOptionText)).toBeInTheDocument();

			// searching for the new option should show: "No options available"
			await user.keyboard(newOptionText);
			expect(screen.getAllByRole("option")).toHaveLength(1);
			expect(screen.getByRole("option")).toHaveTextContent(
				"No options available",
			);

			// trying to forcefully add item clears the search and shows all options
			await user.keyboard(UserEventKeys.ENTER);
			expect(screen.getAllByRole("option")).toHaveLength(fruitOptions.length);

			// still only one chip
			expect(screen.getAllByRole("button")).toHaveLength(2);
		});
	});
});
