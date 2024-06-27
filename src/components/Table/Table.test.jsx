import { composeStories } from "@storybook/testing-react";
import { render, screen, waitFor } from "@testing-library/react";
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
} = composeStories(TableStories);

describe("Table", () => {
	const user = userEvent.setup();
	vi.spyOn(console, "warn").mockImplementation(() => null); // ignore tooltip warnings

	const selectedPageClass = "neo-btn-secondary";

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

			expect(screen.getByRole("table").classList).toHaveLength(2);
			expect(screen.getByRole("table")).toHaveClass("neo-table--compact");

			await user.click(screen.getByLabelText("Select row height"));
			await user.click(screen.getByText("Medium"));

			expect(screen.getByRole("table").classList).toHaveLength(2);
			expect(screen.getByRole("table")).toHaveClass("neo-table--medium");

			await user.click(screen.getByLabelText("Select row height"));
			await user.click(screen.getByText("Large"));

			expect(screen.getByRole("table").classList).toHaveLength(1);
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

			expect(screen.getAllByText("1")).toHaveLength(2);
			expect(screen.getAllByText("2")).toHaveLength(1);

			const nextButton = screen.getByLabelText("next");
			await user.click(nextButton);

			expect(screen.getAllByText("1")).toHaveLength(1);
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

			const itemsPerPageSelect = screen.getByLabelText("items per page");
			await userEvent.selectOptions(itemsPerPageSelect, "5");

			const page2Buttons = screen.getAllByText("2");
			const page2Button = page2Buttons[0];
			expect(page2Button).toHaveClass(selectedPageClass);
			expect(page5Button).not.toBeVisible();
		});

		it("does not update `pageIndex` when all data is removed (refreshed)", async () => {
			render(<EditableData />);

			const refreshButton = screen.getByLabelText("Refresh");

			expect(screen.getByText("1")).toHaveClass(selectedPageClass);

			// refresh data, removing all data and then adding default data back in
			await user.click(refreshButton);
			expect(screen.getByText("no data available")).toBeVisible();
			await waitFor(() => {
				expect(screen.getByText("1")).toBeVisible();
				expect(screen.getByText("1")).toHaveClass(selectedPageClass);
			});
		});

		it("updates `pageIndex` if data is removed, re-added, and new data set has fewer pages", async () => {
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
			await waitFor(() => {
				expect(screen.getByText("2")).toBeVisible();
			});
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
				FilledFields.translations.header.selectAll,
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
					defaultSelectedRowIds={[
						FilledFields.data[0].id,
						FilledFields.data[1].id,
					]}
				/>,
			);

			const headerCheckbox = screen.getByLabelText(
				FilledFields.translations.header.selectAll,
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
			expect(firstBodyRow.classList.length).toBe(1);
			expect(firstBodyRow).toHaveClass("active");

			await user.click(firstRowCheckboxLabel);

			expect(firstRowCheckbox.checked).toBeFalsy();
			expect(firstBodyRow.classList.length).toBe(0);
			expect(firstBodyRow).not.toHaveClass("active");
		});

		it("deselects the header checkbox when all rows are deleted", async () => {
			render(<SecondPage />);

			await user.click(screen.getByLabelText("select all"));

			const deleteButton = screen.getByText("Delete");
			await user.click(deleteButton);

			expect(screen.getByText("no data available")).toBeVisible();

			expect(screen.getByLabelText("select all").checked).toBeFalsy();
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

			const firstRowCheckboxLabel =
				queryAllByRole("row")[1].querySelector("label");
			await user.click(firstRowCheckboxLabel);

			// callable when one row is selected
			const deleteButton = getByText(FilledFields.translations.toolbar.delete);
			await user.click(deleteButton);
			expect(mock).toHaveBeenCalledTimes(1);

			const secondRowCheckboxLabel =
				queryAllByRole("row")[2].querySelector("label");
			await user.click(secondRowCheckboxLabel);

			// callable when multiple rows are selected
			await user.click(deleteButton);
			expect(mock).toHaveBeenCalledTimes(2);
		});

		it("properly handles `delete` when the last row of a page is deleted", async () => {
			render(<SecondPage initialStatePageIndex={4} />);

			await user.click(screen.getAllByText("5")[0]);
			expect(screen.getAllByText("5")).toHaveLength(2);
			expect(screen.getAllByText("5")[0]).toHaveClass(selectedPageClass);
			expect(screen.queryAllByText("4")).toHaveLength(0);

			const firstRowCheckboxLabel = screen
				.queryAllByRole("row")[1]
				.querySelector("label");
			await user.click(firstRowCheckboxLabel);
			const secondRowCheckboxLabel = screen
				.queryAllByRole("row")[2]
				.querySelector("label");
			await user.click(secondRowCheckboxLabel);

			const deleteButton = screen.getByText(
				FilledFields.translations.toolbar.delete,
			);
			await user.click(deleteButton);

			expect(screen.getAllByText("5")).toHaveLength(1);
			expect(screen.getAllByText("4")).toHaveLength(1);
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
			await user.keyboard("a");

			// confirm that there are now 9 pages
			expect(screen.queryByText("9-9 / 9")).toBeTruthy();

			// reduce data set
			await user.keyboard("s");

			// confirm that there is not a single page
			expect(screen.queryByText("1-1 / 1")).toBeTruthy();

			// reduce data set to zero
			await user.keyboard("ddddddddd");

			// confirm that there is no data
			expect("no data available").toBeTruthy();

			// clear search
			await user.click(screen.getByLabelText("clear input"));

			// confirm that there are 10 pages again and that we are on the initial page
			expect(screen.queryByText("1-1 / 10")).toBeTruthy();
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
			const { container, getByRole, queryAllByRole, getByLabelText } =
				renderResult;

			const firstColumnSortButton = container.querySelector(
				"tr th button.neo-multiselect",
			);
			expect(firstColumnSortButton).toHaveTextContent(
				FilledFields.columns[0].Header,
			);
			expect(firstColumnSortButton).toBeVisible();

			expect(getByRole("dialog")).not.toHaveClass(
				"sheet-horizontal-slide-in-shim",
			);
			expect(getByRole("dialog")).not.toHaveClass(
				"sheet-horizontal-slide-out-shim",
			);

			await user.click(firstColumnSortButton);

			const menuItems = queryAllByRole("menuitem");
			expect(menuItems).toHaveLength(4);
			await user.click(queryAllByRole("menuitem")[3]);

			expect(getByRole("dialog")).toHaveClass("sheet-horizontal-slide-in-shim");
			expect(getByRole("dialog")).not.toHaveClass(
				"sheet-horizontal-slide-out-shim",
			);

			const nameCheckbox = getByLabelText(FilledFields.columns[0].Header);
			expect(nameCheckbox).toBeChecked();

			await user.click(nameCheckbox);
			expect(nameCheckbox).not.toBeChecked();
			expect(firstColumnSortButton).not.toBeVisible();
		});

		it("allows column filtering via toolbar Filter Icon Button", async () => {
			const { container, getByRole, getByLabelText } = renderResult;

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

			expect(getByRole("dialog")).not.toHaveClass(
				"sheet-horizontal-slide-in-shim",
			);
			expect(getByRole("dialog")).not.toHaveClass(
				"sheet-horizontal-slide-out-shim",
			);

			await user.click(columnFilterButton);

			expect(getByRole("dialog")).toHaveClass("sheet-horizontal-slide-in-shim");
			expect(getByRole("dialog")).not.toHaveClass(
				"sheet-horizontal-slide-out-shim",
			);

			const nameCheckbox = getByLabelText(FilledFields.columns[0].Header);
			expect(nameCheckbox).toBeChecked();

			await user.click(nameCheckbox);
			expect(nameCheckbox).not.toBeChecked();
			expect(firstColumnSortButton).not.toBeVisible();
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
