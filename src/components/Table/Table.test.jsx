import { composeStories } from "@storybook/testing-react";
import {
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
	within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { UserEventKeys } from "utils";

import { Table } from ".";
import * as TableStories from "./Table.stories";
import {
	FilledFields,
	calculateAriaSortValue,
	convertRowIdsArrayToObject,
	setPageRowsSelected,
	setTableRowsSelected,
} from "./helpers";

const {
	AdvancedFilteringAndSorting,
	BareBones,
	CustomActions,
	Default,
	EditableData,
	EmptyDataSet,
	MoreActionsMenu,
	PreSelectedRows,
	Templated,
	SecondPage,
	DisabledRows,
	ServerSidePagination,
} = composeStories(TableStories);

const getLastNumberFromBDI = async () => {
	const bdiElement = await waitFor(() => screen.queryByText(/\d+-\d+ \/ \d+/));
	if (!bdiElement) {
		console.error("BDI element not found");
		console.log(document.body.innerHTML);
		throw new Error("Test failed: BDI Element not found");
	}
	const bdiText = bdiElement.textContent;
	const lastNumberMatch = bdiText.match(/\d+$/);
	const totalNumberOfRows = lastNumberMatch
		? Number.parseInt(lastNumberMatch[0], 10)
		: Number.MAX_VALUE;
	return [bdiText, totalNumberOfRows];
};

describe("Table", () => {
	const user = userEvent.setup();
	vi.spyOn(console, "warn").mockImplementation(() => null); // ignore tooltip warnings

	const clearRowClassName = "clear-row";

	const selectedPageClass = "neo-btn-primary";

	it("fully renders without exploding", () => {
		const { getByRole } = render(<Table {...FilledFields} />);

		const tableElement = getByRole("table");
		expect(tableElement).toBeTruthy();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<Table {...FilledFields} />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	describe("row height functionality", () => {
		it("rowHeight is set to compact ", () => {
			const { getByRole } = render(
				<Table rowHeight="compact" {...FilledFields} />,
			);

			const tableElement = getByRole("table");
			expect(tableElement).toHaveClass("neo-table--compact");
		});

		it("rowHeight is set to medium ", () => {
			const { getByRole } = render(
				<Table rowHeight="medium" {...FilledFields} />,
			);

			const tableElement = getByRole("table");
			expect(tableElement).toHaveClass("neo-table--medium");
		});

		it("modifies the row height when the select is changed", async () => {
			render(<Table rowHeight="compact" {...FilledFields} />);

			expect(screen.getByRole("table").classList).toHaveLength(3);
			expect(screen.getByRole("table")).toHaveClass("neo-table--compact");

			await user.click(screen.getByLabelText("Select row height"));
			await user.click(screen.getByText("Medium"));

			expect(screen.getByRole("table").classList).toHaveLength(3);
			expect(screen.getByRole("table")).toHaveClass("neo-table--medium");

			await user.click(screen.getByLabelText("Select row height"));
			await user.click(screen.getByText("Large"));

			expect(screen.getByRole("table").classList).toHaveLength(2);
		});
	});

	describe("pagination functionality", () => {
		it("allows the passing of `initialStatePageIndex`", () => {
			render(<Table {...FilledFields} initialStatePageIndex={2} />);

			const page3Buttons = screen.getAllByText("3");
			const page3Button = page3Buttons[0];
			expect(page3Button).toHaveClass(selectedPageClass);
		});

		it("respects when a user clicks to the next page", async () => {
			render(<Table {...FilledFields} itemsPerPageOptions={[1, 2]} />);

			expect(screen.getAllByText("1")).toHaveLength(3);
			expect(screen.getAllByText("2")).toHaveLength(1);

			const nextButton = screen.getByLabelText("next");
			await user.click(nextButton);

			expect(screen.getAllByText("1")).toHaveLength(2);
			expect(screen.getAllByText("2")).toHaveLength(2);
		});

		it("apropriately sets the new page when a page size is changed to be larger", async () => {
			render(
				<Table
					{...FilledFields}
					initialStatePageIndex={4}
					itemsPerPageOptions={[2, 5]}
				/>,
			);

			const page5Buttons = screen.getAllByText("5");
			const page5Button = page5Buttons[0];
			expect(page5Button).toBeVisible();

			await user.click(screen.getAllByRole("button").pop()); // open
			await user.keyboard(UserEventKeys.DOWN); // move to first item (2	)
			await user.keyboard(UserEventKeys.DOWN); // move to second item (5)
			await user.keyboard(UserEventKeys.ENTER); // select second item (5)

			const page2Buttons = screen.getAllByText("2");
			const page2Button = page2Buttons[0];
			expect(page2Button).toHaveClass(selectedPageClass);
			expect(page5Button).not.toBeVisible();
		});

		it("does not update `pageIndex` when all data is removed (refreshed)", async () => {
			render(<EditableData />);

			// move from the first page to the second page
			expect(screen.getByText("1")).toHaveClass(selectedPageClass);
			const nextPageButton = screen.getByLabelText("next");
			await user.click(nextPageButton);
			expect(screen.getByText("2")).toHaveClass(selectedPageClass);

			// refresh data shows "no data available", then shows the last select page
			const refreshButton = screen.getByLabelText("Refresh");
			await user.click(refreshButton);
			expect(screen.getByText("no data available")).toBeVisible();
			await waitFor(
				() => {
					expect(screen.getByText("1")).toBeVisible();
					expect(screen.getByText("1")).not.toHaveClass(selectedPageClass);
					expect(screen.getByText("2")).toBeVisible();
					expect(screen.getByText("2")).toHaveClass(selectedPageClass);
				},
				{ timeout: 5000 },
			);
		});

		// IMPORTANT: this test always works locally, but fails intermittently on CI. Fix is planned for in NEO-2353.
		it.skip("updates `pageIndex` if data is removed, re-added, and new data set has fewer pages", async () => {
			render(<EditableData />);

			const refreshButton = screen.getByLabelText("Refresh");
			const createButton = screen.getByText("Create");
			const nextButton = screen.getByLabelText("next");

			const pagination2Button = screen.getByText("2");
			expect(pagination2Button).not.toHaveClass(selectedPageClass);

			// move from page 1 to page 2
			expect(nextButton).not.toBeDisabled();
			await user.click(nextButton);
			expect(nextButton).toBeDisabled();
			expect(pagination2Button).toHaveClass(selectedPageClass);

			// create a new row, adding a third page
			await user.click(createButton);
			const pagination3Button = screen.getByText("3");
			expect(pagination3Button).not.toHaveClass(selectedPageClass);
			expect(nextButton).not.toBeDisabled();

			// move to third page
			await user.click(nextButton);
			expect(nextButton).toBeDisabled();
			expect(pagination2Button).not.toHaveClass(selectedPageClass);
			expect(pagination3Button).toHaveClass(selectedPageClass);

			// refresh data, removing the third page and moving user to the second page (last page)
			await user.click(refreshButton);
			// Increase the timeout to 5000 milliseconds (5 seconds) to see if this fixes random failures
			await waitFor(
				() => {
					expect(screen.getByText("2")).toBeVisible();
				},
				{ timeout: 5000 },
			);
			expect(screen.getByText("2")).toHaveClass(selectedPageClass);
		});
	});

	describe("row selection functionality", () => {
		it("allows the passing of default selected rows", () => {
			const { getByLabelText } = render(
				<Table
					{...FilledFields}
					selectableRows="multiple"
					itemsPerPageOptions={[50]}
					defaultSelectedRowIds={[
						FilledFields.data[0].id,
						FilledFields.data[1].id,
					]}
				/>,
			);

			const checkbox0 = getByLabelText(FilledFields.data[0].label);
			const checkbox1 = getByLabelText(FilledFields.data[1].label);
			expect(checkbox0).toHaveAttribute("checked");
			expect(checkbox1).toHaveAttribute("checked");

			const checkbox2 = getByLabelText(FilledFields.data[2].label);
			expect(checkbox2).not.toHaveAttribute("checked");
		});

		it("properly selects 'all' and 'none' of the checkboxes", async () => {
			const { getByLabelText, container } = render(
				<Table
					{...FilledFields}
					selectableRows="multiple"
					itemsPerPageOptions={[50]}
					defaultSelectedRowIds={[
						FilledFields.data[0].id,
						FilledFields.data[1].id,
					]}
				/>,
			);

			const headerCheckbox = getByLabelText(
				FilledFields.translations.header.selectPage,
			);
			const headerCheckboxLabel = container.querySelector("tr th label");
			const checkbox2 = getByLabelText(FilledFields.data[2].label);

			// header checkbox is in "mixed" state
			expect(headerCheckbox.checked).toBeTruthy();
			expect(headerCheckbox).toHaveClass("neo-check--indeterminate");
			expect(checkbox2.checked).toBeFalsy();

			await user.click(headerCheckboxLabel);

			// header checkbox is in `true` state
			expect(headerCheckbox.checked).toBeTruthy();
			expect(headerCheckbox).not.toHaveClass("neo-check--indeterminate");
			expect(checkbox2.checked).toBeTruthy();

			await user.click(headerCheckboxLabel);

			// header checkbox is in `false` state
			expect(headerCheckbox.checked).toBeFalsy();
			expect(headerCheckbox).not.toHaveClass("neo-check--indeterminate");
			expect(checkbox2.checked).toBeFalsy();
		});

		it("properly selects 'all' and 'none' of the checkboxes when paginated", async () => {
			const { container } = render(
				<Table
					{...FilledFields}
					selectableRows="multiple"
					itemsPerPageOptions={[2]}
					defaultSelectedRowIds={[FilledFields.data[1].id]}
				/>,
			);

			const headerCheckbox = screen.getByLabelText(
				FilledFields.translations.header.selectPage,
			);
			const headerCheckboxLabel = container.querySelector("tr th label");
			const checkbox2 = screen.getByLabelText(FilledFields.data[1].label);

			// header checkbox is in "mixed" state
			expect(headerCheckbox.checked).toBeTruthy();
			expect(headerCheckbox).toHaveClass("neo-check--indeterminate");
			expect(headerCheckbox).toHaveAttribute("aria-checked", "mixed");
			expect(checkbox2.checked).toBeTruthy();

			await user.click(headerCheckboxLabel);

			// header checkbox is in `true` state
			expect(headerCheckbox.checked).toBeTruthy();
			expect(headerCheckbox).not.toHaveClass("neo-check--indeterminate");
			expect(headerCheckbox).toHaveAttribute("aria-checked", "true");
			expect(checkbox2.checked).toBeTruthy();

			await user.click(headerCheckboxLabel);

			// header checkbox is in `false` state
			expect(headerCheckbox.checked).toBeFalsy();
			expect(headerCheckbox).not.toHaveClass("neo-check--indeterminate");
			expect(headerCheckbox).toHaveAttribute("aria-checked", "false");
			expect(checkbox2.checked).toBeFalsy();
		});

		it("properly selects and deselects a body row", async () => {
			const { queryAllByRole } = render(
				<Table {...FilledFields} selectableRows="multiple" />,
			);

			const alltrs = queryAllByRole("row");
			expect(alltrs.length).toBeTruthy();

			const firstBodyRow = alltrs[1];
			expect(firstBodyRow.classList.length).toBe(0);
			expect(firstBodyRow).not.toHaveClass("active");

			const firstRowCheckbox = firstBodyRow.querySelector("input");
			expect(firstRowCheckbox.checked).toBeFalsy();

			const firstRowCheckboxLabel = firstBodyRow.querySelector("label");
			await user.click(firstRowCheckboxLabel);

			expect(firstRowCheckbox.checked).toBeTruthy();

			await user.click(firstRowCheckboxLabel);

			expect(firstRowCheckbox.checked).toBeFalsy();
		});

		it("deselects the header checkbox when all rows are deleted", async () => {
			render(<EditableData />);

			const selectPageCheckboxLabel =
				FilledFields.translations.header.selectPage;

			// delete first page
			await user.click(screen.getByLabelText(selectPageCheckboxLabel));
			await user.click(screen.getByText("Delete"));

			// delete second (final) page
			await user.click(screen.getByLabelText(selectPageCheckboxLabel));
			await user.click(screen.getByText("Delete"));

			expect(screen.getByText("no data available")).toBeVisible();

			expect(
				screen.getByLabelText(selectPageCheckboxLabel).checked,
			).toBeFalsy();
		});

		it("does not show 'clear-row' when no rows are selected", async () => {
			const { container } = render(<EditableData />);

			expect(container.getElementsByClassName(clearRowClassName)).toHaveLength(
				0,
			);
		});

		it("shows 'clear-row' when any rows are selected", async () => {
			const { container } = render(<EditableData />);

			const selectPageCheckboxLabel =
				FilledFields.translations.header.selectPage;
			await user.click(screen.getByLabelText(selectPageCheckboxLabel));

			expect(container.getElementsByClassName(clearRowClassName)).toHaveLength(
				1,
			);
		});

		it("when some but not all are selected, clicking the 'clear-row' button selects all rows", async () => {
			const { container } = render(<EditableData />);

			// confirm that the 'clear-row' button is NOT visible initially
			expect(container.getElementsByClassName(clearRowClassName)).toHaveLength(
				0,
			);

			// select page rows
			const selectPageCheckboxLabel =
				FilledFields.translations.header.selectPage;
			await user.click(screen.getByLabelText(selectPageCheckboxLabel));

			// confirm that the 'clear-row' button is now visible
			expect(container.getElementsByClassName(clearRowClassName)).toHaveLength(
				1,
			);

			// confirm that the correct text is displayed
			expect(
				screen.getByText(FilledFields.translations.body.selectAll),
			).toBeVisible();

			// click the 'clear-row' button
			await user.click(
				screen.getByText(FilledFields.translations.body.selectAll),
			);

			// confirm that the 'clear-row' button is visible and has different text
			expect(container.getElementsByClassName(clearRowClassName)).toHaveLength(
				1,
			);
			expect(
				screen.getByText(FilledFields.translations.body.clearAll),
			).toBeVisible();
		});

		it("when all rows are selected, clicking the 'clear-row' button de-selects all rows", async () => {
			const { container } = render(<EditableData />);

			// open dropdown, select all rows
			const dropdown = screen.getByLabelText(
				FilledFields.translations.header.tableSelectionDropdown,
			);
			await user.click(dropdown);
			const selectAllRows = screen.getByText(
				FilledFields.translations.header.selectAllPages,
			);
			await user.click(selectAllRows);

			// confirm that the 'clear-row' button is visible
			expect(container.getElementsByClassName(clearRowClassName)).toHaveLength(
				1,
			);
			expect(
				screen.getByText(FilledFields.translations.body.clearAll),
			).toBeVisible();

			// click the 'clear-row' button
			const clearRowButton = screen.getByText(
				FilledFields.translations.body.clearAll,
			);
			await user.click(clearRowButton);

			// confirm that the 'clear-row' is NOT visible
			expect(container.getElementsByClassName(clearRowClassName)).toHaveLength(
				0,
			);
		});
	});

	describe("toolbar functionality", () => {
		it("properly calls it's `refresh` method", async () => {
			const mock = vi.fn();
			render(<Table {...FilledFields} handleRefresh={mock} />);

			const refreshButton = screen.getByLabelText(
				FilledFields.translations.toolbar.refresh,
			);

			await user.click(refreshButton);
			expect(mock).toHaveBeenCalled();
		});

		it("it's `create` method can be called at any time", async () => {
			const mock = vi.fn();
			const { getByText, queryAllByRole } = render(
				<Table {...FilledFields} handleCreate={mock} selectableRows="single" />,
			);

			const createButton = getByText(FilledFields.translations.toolbar.create);

			await user.click(createButton);
			expect(mock).toHaveBeenCalledTimes(1);

			const firstRowCheckboxLabel =
				queryAllByRole("row")[1].querySelector("label");
			await user.click(firstRowCheckboxLabel);

			await user.click(createButton);
			expect(mock).toHaveBeenCalledTimes(2);
		});

		it("properly calls it's `edit` method", async () => {
			const mock = vi.fn();
			const { getByText, queryAllByRole } = render(
				<Table
					{...FilledFields}
					handleEdit={mock}
					itemsPerPageOptions={[50]}
					selectableRows="multiple"
				/>,
			);

			// expect button to not be rendered
			expect(() => getByText(FilledFields.translations.toolbar.edit)).toThrow();

			// select first two body rows
			const firstRowCheckboxLabel =
				queryAllByRole("row")[1].querySelector("label");
			const secondRowCheckboxLabel =
				queryAllByRole("row")[2].querySelector("label");
			await user.click(firstRowCheckboxLabel);
			await user.click(secondRowCheckboxLabel);

			// expect button _still_ not to be rendered
			expect(() => getByText(FilledFields.translations.toolbar.edit)).toThrow();

			// deselect first row
			await user.click(firstRowCheckboxLabel);

			// `edit` button should NOW be rendered and enabled, and thus callable
			const editButton = getByText(FilledFields.translations.toolbar.edit);
			await user.click(editButton);
			expect(mock).toHaveBeenCalled();
		});

		it("properly hides `delete` button when handleDelete is not defined", async () => {
			const { getByText, queryAllByRole } = render(
				<Table
					{...FilledFields}
					itemsPerPageOptions={[50]}
					selectableRows="multiple"
				/>,
			);

			// expect button to not be rendered when zero rows are selected
			expect(() =>
				getByText(FilledFields.translations.toolbar.delete),
			).toThrow();

			// select first row
			const firstRowCheckboxLabel =
				queryAllByRole("row")[1].querySelector("label");
			await user.click(firstRowCheckboxLabel);

			// delete is hidden since handleDelete is not defined
			expect(() =>
				getByText(FilledFields.translations.toolbar.delete),
			).toThrow();
		});

		it("properly hides `delete` button when handleDelete is null", async () => {
			const { getByText, queryAllByRole } = render(
				<Table
					{...FilledFields}
					itemsPerPageOptions={[50]}
					handleDelete={null}
					selectableRows="multiple"
				/>,
			);

			// expect button to not be rendered when zero rows are selected
			expect(() =>
				getByText(FilledFields.translations.toolbar.delete),
			).toThrow();

			// select first row
			const firstRowCheckboxLabel =
				queryAllByRole("row")[1].querySelector("label");
			await user.click(firstRowCheckboxLabel);

			// delete is hidden since handleDelete is null
			expect(() =>
				getByText(FilledFields.translations.toolbar.delete),
			).toThrow();
		});

		it("properly calls it's `delete` method", async () => {
			const mock = vi.fn();
			const { getByText, queryAllByRole } = render(
				<Table
					{...FilledFields}
					handleDelete={mock}
					itemsPerPageOptions={[50]}
					selectableRows="multiple"
				/>,
			);

			// expect button to not be rendered when zero rows are selected
			expect(() =>
				getByText(FilledFields.translations.toolbar.delete),
			).toThrow();

			// select first row
			const firstRowCheckboxLabel =
				queryAllByRole("row")[1].querySelector("label");
			await user.click(firstRowCheckboxLabel);

			// callable when one row is selected
			await user.click(getByText(FilledFields.translations.toolbar.delete));
			expect(mock).toHaveBeenCalledTimes(1);

			// select second and third rows
			const secondRowCheckboxLabel =
				queryAllByRole("row")[2].querySelector("label");
			await user.click(secondRowCheckboxLabel);
			const thirdRowCheckboxLabel =
				queryAllByRole("row")[4].querySelector("label");
			await user.click(thirdRowCheckboxLabel);

			// callable when multiple rows are selected
			await user.click(getByText(FilledFields.translations.toolbar.delete));
			expect(mock).toHaveBeenCalledTimes(2);
		});

		it("properly handles `delete` when the all rows in the final page are deleted", async () => {
			render(<SecondPage initialStatePageIndex={4} />);

			// move to final page
			expect(screen.getAllByRole("listitem")).toHaveLength(5);
			await user.click(screen.getAllByText("5")[0]);

			// confirm final page is selected
			expect(screen.getAllByText("5")).toHaveLength(2);
			expect(screen.getAllByText("5")[0]).toHaveClass(selectedPageClass);
			expect(screen.getAllByRole("listitem")).toHaveLength(5);

			// open dropdown, select page rows, delete
			const dropdown = screen.getByLabelText(
				FilledFields.translations.header.tableSelectionDropdown,
			);
			await user.click(dropdown);

			const selectPageRows = screen.getByText(
				FilledFields.translations.header.selectPage,
			);
			await user.click(selectPageRows);

			const deleteButton = screen.getByText(
				FilledFields.translations.toolbar.delete,
			);
			await user.click(deleteButton);

			// confirm that the final page is removed
			expect(screen.getAllByRole("listitem")).toHaveLength(8);
			expect(screen.getByText("4")).toHaveClass(selectedPageClass);
		});

		it("properly utilizes it's `search` method", async () => {
			const { getByLabelText, queryAllByRole } = render(
				<Table {...FilledFields} itemsPerPageOptions={[50]} />,
			);

			const alltrs = queryAllByRole("row");
			expect(alltrs).toHaveLength(FilledFields.data.length + 1);

			const searchInput = getByLabelText(
				FilledFields.translations.toolbar.searchInputPlaceholder,
			);
			await user.click(searchInput);
			await user.keyboard(FilledFields.data[0].label);

			const filteredtrs = queryAllByRole("row");
			expect(filteredtrs.length).toBeGreaterThan(0);
			expect(filteredtrs.length).toBeLessThan(alltrs.length);
		});

		it("properly calls handleSearch method ", async () => {
			const handleSearch = vi.fn();
			const { getByLabelText, queryAllByRole } = render(
				<Table
					{...FilledFields}
					itemsPerPageOptions={[50]}
					handleSearch={handleSearch}
				/>,
			);

			const alltrs = queryAllByRole("row");
			expect(alltrs).toHaveLength(FilledFields.data.length + 1);

			const searchInput = getByLabelText(
				FilledFields.translations.toolbar.searchInputPlaceholder,
			);
			await user.click(searchInput);
			await user.keyboard(FilledFields.data[0].label);

			expect(handleSearch).toHaveBeenCalled();
			expect(handleSearch).toHaveBeenCalledWith(FilledFields.data[0].label, 50);
		});

		it("search will update current page index appropriately", async () => {
			render(<Table {...FilledFields} />);

			// there are 10 pages
			expect(screen.queryByText("1-1 / 10")).toBeTruthy();

			// go to last page
			const nextButton = screen.getByLabelText("next");
			expect(nextButton).not.toBeDisabled();
			for (let i = 0; i < 9; i++) {
				await user.click(nextButton);
			}
			expect(screen.queryByText("10-10 / 10")).toBeTruthy();
			expect(nextButton).toBeDisabled();

			// reduce data set
			const searchInput = screen.getByLabelText(
				FilledFields.translations.toolbar.searchInputPlaceholder,
			);
			await user.click(searchInput);
			await user.keyboard("d");

			// confirm that there are now 8 pages
			expect(screen.queryByText("8-8 / 8")).toBeTruthy();

			// reduce data set
			await user.keyboard("an");

			// confirm that there is not a single page
			expect(screen.queryByText("1-1 / 1")).toBeTruthy();

			// reduce data set to zero
			await user.keyboard("ddddddddd");

			// confirm that there is no data
			expect(screen.queryByText("no data available")).toBeTruthy();

			// clear search
			await user.click(screen.getByLabelText("clear input"));

			// confirm that there are 10 pages again and that we are on the initial page
			expect(screen.queryByText("1-1 / 10")).toBeTruthy();
		});
	});

	describe("server side pagination, search, column filtering", () => {
		let renderResult;

		beforeEach(() => {
			renderResult = render(<ServerSidePagination />);
		});

		it("filters by date value", async () => {
			const { container, queryByText, queryAllByRole } = renderResult;

			// waitfor the no data available message to disappear
			await waitForElementToBeRemoved(() => queryByText("no data available"), {
				timeout: 5000,
			});
			// should see 10000 rows now
			const [bdiText, totalNumberOfRows] = await getLastNumberFromBDI();
			expect(totalNumberOfRows).toBe(10000);

			// get the first date value
			const firstDateValue = queryAllByRole("cell")[4].textContent;
			const pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
			expect(firstDateValue).toMatch(pattern);

			// Get the menu button element with the text content "Date recorded"
			let dateColumnFilterButton = container.querySelectorAll(
				"tr th button.neo-multiselect",
			)[4];
			expect(dateColumnFilterButton).toHaveTextContent("Date recorded");
			await user.click(dateColumnFilterButton);

			let dateColumnFilterMenuItems = queryAllByRole("menuitem");
			expect(dateColumnFilterMenuItems).toHaveLength(4);
			await user.click(dateColumnFilterMenuItems[3]);

			let columnFilterDrawer = queryAllByRole("dialog")[1];
			expect(columnFilterDrawer).toHaveClass("neo-drawer neo-drawer--isOpen");

			// Wait for the input box to appear
			let dateInput = await waitFor(() =>
				within(columnFilterDrawer).getByRole("textbox"),
			);

			await user.type(dateInput, firstDateValue);

			let dateColumnFilterApplyButton =
				within(columnFilterDrawer).getByLabelText("Apply");
			await user.click(dateColumnFilterApplyButton);

			// check that the filter icon is displayed
			let filters = screen.queryAllByRole("img", {
				name: FilledFields.translations.header.filterApplied,
			});
			expect(filters).toHaveLength(1);

			// Wait for the bdiElement to disappear
			await waitForElementToBeRemoved(() => queryByText(bdiText), {
				timeout: 5000,
			});

			// Wait for the bdiElement to reappear
			const [filteredBidText, filteredNumberOfRows] =
				await getLastNumberFromBDI();
			expect(filteredNumberOfRows).toBeLessThan(10000);

			dateColumnFilterButton = container.querySelectorAll(
				"tr th button.neo-multiselect",
			)[4];
			await user.click(dateColumnFilterButton);

			// check icon in front of menu item is visible
			let checkIcon = container.querySelector(
				"tr th div[role='menuitem'] span[role='img']",
			);
			expect(checkIcon).toBeVisible();

			dateColumnFilterMenuItems = queryAllByRole("menuitem");
			expect(dateColumnFilterMenuItems).toHaveLength(4);
			await user.click(dateColumnFilterMenuItems[3]);

			columnFilterDrawer = queryAllByRole("dialog")[1];
			expect(columnFilterDrawer).toHaveClass("neo-drawer neo-drawer--isOpen");

			// Wait for the input box to appear
			dateInput = await waitFor(() =>
				within(columnFilterDrawer).getByRole("textbox"),
			);
			expect(dateInput).toBeVisible();
			expect(dateInput).toHaveValue(firstDateValue);

			const dateColumnFilterClearButton =
				within(columnFilterDrawer).getByLabelText("clear input");
			expect(dateColumnFilterClearButton).toBeVisible();
			await user.click(dateColumnFilterClearButton);

			expect(dateInput).toHaveValue("");
			// apply empty filter value
			dateColumnFilterApplyButton =
				within(columnFilterDrawer).getByLabelText("Apply");
			await user.click(dateColumnFilterApplyButton);

			// check that the filter icon is gone
			filters = screen.queryAllByRole("img", {
				name: FilledFields.translations.header.filterApplied,
			});
			expect(filters.length).toBe(0);

			// Wait for the filteredBidText to disappear
			await waitForElementToBeRemoved(() => queryByText(filteredBidText), {
				timeout: 5000,
			});

			// Wait for the bdiElement to reappear as 10000
			const [_, restoredNumberOfRows] = await getLastNumberFromBDI();
			expect(restoredNumberOfRows).toBe(10000);

			dateColumnFilterButton = container.querySelectorAll(
				"tr th button.neo-multiselect",
			)[4];
			await user.click(dateColumnFilterButton);

			// check icon in front of menu item is gone
			checkIcon = container.querySelector(
				"tr th div[role='menuitem'] span[role='img']",
			);
			expect(checkIcon).toBeNull();
		});
	});
	describe("sort and filter functionality", () => {
		let renderResult;

		beforeEach(() => {
			renderResult = render(<AdvancedFilteringAndSorting />);
		});

		it("does not render sorting icon unless column is sorted", async () => {
			const { container, queryAllByRole } = renderResult;

			const sortableColumnHeader = container.querySelector(
				"tr th button.neo-multiselect",
			);

			expect(sortableColumnHeader.querySelectorAll("span")).toHaveLength(1);

			await user.click(sortableColumnHeader);
			await user.click(queryAllByRole("menuitem")[1]);

			expect(sortableColumnHeader.querySelectorAll("span")).toHaveLength(2);

			await user.click(sortableColumnHeader);
			await user.click(queryAllByRole("menuitem")[0]);

			expect(sortableColumnHeader.querySelectorAll("span")).toHaveLength(1);
		});

		it("allows column sorting of row", async () => {
			const { container, getByRole, queryAllByRole } = renderResult;

			const firstColumnSortButton = container.querySelector(
				"tr th button.neo-multiselect",
			);
			expect(firstColumnSortButton).toHaveTextContent(
				FilledFields.columns[0].Header,
			);

			const getFirstCellTextContent = () =>
				queryAllByRole("cell")[0].textContent;

			const firstCellOriginalContent = getFirstCellTextContent();
			expect(getFirstCellTextContent()).toBe(FilledFields.data[0].name);

			expect(() => getByRole("menu")).toThrow();
			await user.click(firstColumnSortButton);
			expect(() => getByRole("menu")).not.toThrow();

			const menuItems = queryAllByRole("menuitem");
			expect(menuItems).toHaveLength(4);
			expect(menuItems[0]).toHaveClass("neo-dropdown--disabled");
			expect(menuItems[1]).not.toHaveClass("neo-dropdown--disabled");
			expect(menuItems[2]).not.toHaveClass("neo-dropdown--disabled");
			expect(menuItems[3]).not.toHaveClass("neo-dropdown--disabled");

			// "clear" does nothing as it is disabled
			await user.click(queryAllByRole("menuitem")[0]);
			expect(getFirstCellTextContent()).toBe(firstCellOriginalContent);

			// ascending sort works with mouse click
			await user.click(firstColumnSortButton);
			await user.click(queryAllByRole("menuitem")[1]);
			const ascendingFirstCellContent = getFirstCellTextContent();
			expect(ascendingFirstCellContent).not.toBe(firstCellOriginalContent);

			// // descending sort works with keyboard click
			await user.click(firstColumnSortButton);
			await user.keyboard(UserEventKeys.DOWN);
			await user.keyboard(UserEventKeys.ENTER);
			const descendingFirstCellContent = getFirstCellTextContent();
			expect(descendingFirstCellContent).not.toBe(firstCellOriginalContent);
			expect(descendingFirstCellContent).not.toBe(ascendingFirstCellContent);

			// "clear" is enabled as there is a sort applied, clicking it clears the sort
			await user.click(firstColumnSortButton);
			const clearSortButton = queryAllByRole("menuitem")[0];
			expect(clearSortButton).not.toHaveClass("neo-dropdown--disabled");
			await user.click(clearSortButton);
			expect(getFirstCellTextContent()).toBe(firstCellOriginalContent);
		}, 10000);

		it("allows column filtering via header dropdown", async () => {
			const { container, getAllByRole, queryAllByRole, getAllByLabelText } =
				renderResult;

			const firstColumnSortButton = container.querySelector(
				"tr th button.neo-multiselect",
			);
			expect(firstColumnSortButton).toHaveTextContent(
				FilledFields.columns[0].Header,
			);
			expect(firstColumnSortButton).toBeVisible();

			expect(getAllByRole("dialog")[0]).not.toHaveClass(
				"neo-drawer neo-drawer--isOpen",
			);

			await user.click(firstColumnSortButton);

			const menuItems = queryAllByRole("menuitem");
			expect(menuItems).toHaveLength(4);
			await user.click(queryAllByRole("menuitem")[3]);

			expect(getAllByRole("dialog")[1]).toHaveClass(
				"neo-drawer neo-drawer--isOpen",
			);

			let nameInput = getAllByRole("textbox")[1];
			expect(nameInput).toBeVisible();
			await user.type(nameInput, "daneil");

			const applyButton = getAllByLabelText(
				FilledFields.translations.toolbar.apply,
			)[1];
			await user.click(applyButton);

			// only one row should be visible
			expect(getAllByRole("dialog")[1]).toHaveClass("neo-drawer");
			const numberOfRows = getAllByRole("row");
			expect(numberOfRows).toHaveLength(2);

			// header filter icon should be visible
			let filterIcon = container.querySelector("tr th button span[role='img']");
			expect(filterIcon).toBeVisible();

			// check icon in menu should be visible
			await user.click(firstColumnSortButton);
			let checkIcon = container.querySelector(
				"tr th div[role='menuitem'] span[role='img']",
			);
			expect(checkIcon).toBeVisible();

			// open filter dialog
			await user.click(queryAllByRole("menuitem")[3]);

			nameInput = getAllByRole("textbox")[1];
			expect(nameInput).toBeVisible();
			expect(nameInput).toHaveValue("daneil");

			const clearButton = container.querySelectorAll(
				"button[aria-label='clear input']",
			)[1];
			expect(clearButton).toBeVisible();

			await user.click(clearButton);

			expect(nameInput).toBeVisible();
			expect(nameInput).toHaveValue("");

			const applyButtonAgain = getAllByLabelText(
				FilledFields.translations.toolbar.apply,
			)[1];
			expect(applyButtonAgain).toBeVisible();
			await user.click(applyButtonAgain);

			// expect all rows to be visible
			expect(queryAllByRole("row")).toHaveLength(11);

			// expect filter icon to be hidden
			filterIcon = container.querySelector("tr th button span[role='img']");
			expect(filterIcon).toBeNull();

			// check icon in menu should be visible
			await user.click(firstColumnSortButton);
			checkIcon = container.querySelector(
				"tr th div[role='menuitem'] span[role='img']",
			);
			expect(checkIcon).toBeNull();
		});

		it("toggles column visibility via toolbar Filter Icon Button", async () => {
			const { container, getAllByRole, getByLabelText, getAllByLabelText } =
				renderResult;

			const firstColumnSortButton = container.querySelector(
				"tr th button.neo-multiselect",
			);
			expect(firstColumnSortButton).toHaveTextContent(
				FilledFields.columns[0].Header,
			);
			expect(firstColumnSortButton).toBeVisible();

			const columnFilterButton = container.querySelector(
				`button[aria-label="${FilledFields.translations.toolbar.filterColumns}"]`,
			);

			expect(getAllByRole("dialog")[0]).not.toHaveClass(
				"neo-drawer neo-drawer--isOpen",
			);

			await user.click(columnFilterButton);

			expect(getAllByRole("dialog")[0]).toHaveClass(
				"neo-drawer neo-drawer--isOpen",
			);

			const nameCheckbox = getByLabelText(FilledFields.columns[0].Header);
			expect(nameCheckbox).toBeChecked();

			await user.click(nameCheckbox);
			expect(nameCheckbox).not.toBeChecked();

			const applyButton = getAllByLabelText(
				FilledFields.translations.toolbar.apply,
			)[0];
			await user.click(applyButton);
			expect(firstColumnSortButton).not.toBeVisible();
		});

		it("allows user to predefine hidden rows", async () => {
			// find the "Long Text" `<th>` element
			const longTextElements = screen.queryAllByText("Long Text");
			expect(longTextElements).toHaveLength(3);
			const thDivLongTextElement = longTextElements[2];
			const thLongTextElement = thDivLongTextElement.closest("th");

			// assert "Long Text" column is not shown in the table
			expect(thLongTextElement).not.toBeVisible();

			// open filter dialog and show "Long Text" column
			await user.click(screen.getAllByLabelText("Filter Columns")[0]);
			expect(screen.getByLabelText("Long Text")).not.toBeChecked();
			await user.click(screen.getByLabelText("Long Text"));
			await user.click(screen.getAllByLabelText("Apply")[0]);

			// assert "Long Text" column is now shown in the table
			expect(thLongTextElement).toBeVisible();
		});
	});

	describe("disabled row functionality", () => {
		it("properly disables a row", async () => {
			render(<DisabledRows />);

			const tableRows = screen.getAllByRole("row");
			const disabledTableRows = tableRows.filter((row) =>
				row.classList.contains("disabled"),
			);
			expect(disabledTableRows).toHaveLength(2);
		});

		it("does not allow the user to manually select a disabled row", async () => {
			render(<DisabledRows />);

			const tableRows = screen.getAllByRole("row");
			const disabledTableRows = tableRows.filter((row) =>
				row.classList.contains("disabled"),
			);
			const disabledCheckbox = disabledTableRows[0].querySelector("input");
			expect(disabledCheckbox).toBeDisabled();
			expect(disabledCheckbox).not.toBeChecked();

			// click on the disabled row and confirm that it is still not checked
			await user.click(disabledCheckbox);
			expect(disabledCheckbox).not.toBeChecked();
		});

		it("does not select disabled rows when selecting all", async () => {
			render(<DisabledRows />);

			// open dropdown, select all rows
			const dropdown = screen.getByLabelText(
				FilledFields.translations.header.tableSelectionDropdown,
			);
			await user.click(dropdown);
			const selectAllRows = screen.getByText(
				FilledFields.translations.header.selectAllPages,
			);
			await user.click(selectAllRows);

			// confirm that the first body row (skipping over "clear row") is not disabled and is selected
			const tableRows = screen.getAllByRole("row");
			const firstBodyRow = tableRows[2];
			expect(firstBodyRow).not.toHaveClass("disabled");
			expect(firstBodyRow.querySelector("input")).toBeChecked();

			// confirm that the second row is disabled and is not selected
			const secondBodyRow = tableRows[3];
			expect(secondBodyRow).toHaveClass("disabled");
			expect(secondBodyRow.querySelector("input")).not.toBeChecked();
		});

		it("does not select disabled rows when selecting all on a page", async () => {
			render(<DisabledRows />);

			// open dropdown, select all rows
			const dropdown = screen.getByLabelText(
				FilledFields.translations.header.tableSelectionDropdown,
			);
			await user.click(dropdown);
			const selectAllRows = screen.getByText(
				FilledFields.translations.header.selectPage,
			);
			await user.click(selectAllRows);

			// confirm that the first body row (skipping over "clear row") is not disabled and is selected
			const tableRows = screen.getAllByRole("row");
			const firstBodyRow = tableRows[2];
			expect(firstBodyRow).not.toHaveClass("disabled");
			expect(firstBodyRow.querySelector("input")).toBeChecked();

			// confirm that the second row is disabled and is not selected
			const secondBodyRow = tableRows[3];
			expect(secondBodyRow).toHaveClass("disabled");
			expect(secondBodyRow.querySelector("input")).not.toBeChecked();
		});
	});

	describe("helpers", () => {
		describe("calculateAriaSortValue", () => {
			it("should return 'none' when `isSorted === false`", () => {
				expect(calculateAriaSortValue(false, undefined)).toBe("none");
				expect(calculateAriaSortValue(false, "ascending")).toBe("none");
				expect(calculateAriaSortValue(false, "descending")).toBe("none");
			});

			it("should return 'other' when `isSorted === true && sortedDir === undefined`", () => {
				expect(calculateAriaSortValue(true, undefined)).toBe("other");
			});

			it("should return 'ascending' when `isSorted === true && sortedDir === 'ascending'`", () => {
				expect(calculateAriaSortValue(true, "ascending")).toBe("ascending");
			});

			it("should return 'descending' when `isSorted === true && sortedDir === 'descending'`", () => {
				expect(calculateAriaSortValue(true, "descending")).toBe("descending");
			});
		});

		describe("convertRowIdsArrayToObject", () => {
			it("should return empty object if passed empty array", () => {
				const result = convertRowIdsArrayToObject([]);
				expect(result).toEqual({});
			});

			it("should return an object whose length matches input array length", () => {
				const idArr1 = [];
				const idObj1 = convertRowIdsArrayToObject(idArr1);
				expect(Object.keys(idObj1)).toHaveLength(idArr1.length);

				const idArr2 = [1, 2, 3];
				const idObj2 = convertRowIdsArrayToObject(idArr2);
				expect(Object.keys(idObj2)).toHaveLength(idArr2.length);

				const idArr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				const idObj3 = convertRowIdsArrayToObject(idArr3);
				expect(Object.keys(idObj3)).toHaveLength(idArr3.length);
			});

			it("should return an object whose keys (if they exist) are all `true`", () => {
				const idArr1 = [];
				const idObj1 = convertRowIdsArrayToObject(idArr1);
				expect(Object.values(idObj1)).toEqual([]);

				const idArr2 = [1, 2, 3];
				const idObj2 = convertRowIdsArrayToObject(idArr2);
				expect(Object.values(idObj2)).toEqual([true, true, true]);

				const idArr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				const idObj3 = convertRowIdsArrayToObject(idArr3);
				expect(Object.values(idObj3)).toEqual(Array(idArr3.length).fill(true));
			});
		});

		describe("toggle row methods", () => {
			it("`setTableRowsSelected` toggles the enabled state of all rows that are not disabled", () => {
				const mocktoggleRowSelected = vi.fn();
				const mockHandleRowToggled = vi.fn();
				const mockInstance = {
					rows: [
						{
							id: 1,
							original: {
								disabled: false,
							},
						},
						{
							id: 2,
							original: {
								disabled: true,
							},
						},
						{
							id: 3,
							original: {
								disabled: false,
							},
						},
					],
					toggleRowSelected: mocktoggleRowSelected,
				};

				setTableRowsSelected(mockInstance, false, mockHandleRowToggled);

				expect(mocktoggleRowSelected).toHaveBeenCalledTimes(2);
				expect(mocktoggleRowSelected).toHaveBeenCalledWith(1, false);
				expect(mocktoggleRowSelected).toHaveBeenCalledWith(3, false);
				expect(mockHandleRowToggled).toHaveBeenCalledTimes(1);
				expect(mockHandleRowToggled).toHaveBeenCalledWith([]);

				mocktoggleRowSelected.mockClear();
				mockHandleRowToggled.mockClear();
				setTableRowsSelected(mockInstance, true, mockHandleRowToggled);
				expect(mocktoggleRowSelected).toHaveBeenCalledTimes(2);
				expect(mocktoggleRowSelected).toHaveBeenCalledWith(1, true);
				expect(mocktoggleRowSelected).toHaveBeenCalledWith(3, true);
				expect(mockHandleRowToggled).toHaveBeenCalledTimes(1);
				expect(mockHandleRowToggled).toHaveBeenCalledWith([1, 3]);
			});

			it("`setPageRowsSelected` toggles the enabled state of all page rows that are not disabled", () => {
				const mocktoggleRowSelected = vi.fn();
				const mockHandleRowToggled = vi.fn(); // TODO: use
				const mockInstance = {
					page: [
						{
							id: 1,
							original: {
								disabled: false,
							},
						},
						{
							id: 2,
							original: {
								disabled: true,
							},
						},
						{
							id: 3,
							original: {
								disabled: false,
							},
						},
					],
					toggleRowSelected: mocktoggleRowSelected,
				};

				setPageRowsSelected(mockInstance, false, mockHandleRowToggled);

				expect(mocktoggleRowSelected).toHaveBeenCalledTimes(2);
				expect(mocktoggleRowSelected).toHaveBeenCalledWith(1, false);
				expect(mocktoggleRowSelected).toHaveBeenCalledWith(3, false);
				expect(mockHandleRowToggled).toHaveBeenCalledTimes(1);
				expect(mockHandleRowToggled).toHaveBeenCalledWith([]);

				mocktoggleRowSelected.mockClear();
				mockHandleRowToggled.mockClear();
				setPageRowsSelected(mockInstance, true, mockHandleRowToggled);
				expect(mocktoggleRowSelected).toHaveBeenCalledTimes(2);
				expect(mocktoggleRowSelected).toHaveBeenCalledWith(1, true);
				expect(mocktoggleRowSelected).toHaveBeenCalledWith(3, true);
				expect(mockHandleRowToggled).toHaveBeenCalledTimes(1);
				expect(mockHandleRowToggled).toHaveBeenCalledWith([1, 3]);
			});
		});
	});

	describe("storybook tests", () => {
		describe("AdvancedFilteringAndSorting", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<AdvancedFilteringAndSorting />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("CustomActions", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<CustomActions />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("More Actions Menu", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<MoreActionsMenu />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("Default", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<Default />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("EditableData", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<EditableData />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("EmptyDataSet", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<EmptyDataSet />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("BareBones", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<BareBones />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("PreSelectedRows", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<PreSelectedRows />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("Templated", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<Templated />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});
	});
});
