import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { UserEventKeys } from "utils";

import { Table } from ".";
import {
  calculateAriaSortValue,
  convertRowIdsArrayToObject,
  FilledFields,
} from "./helpers";
import * as TableStories from "./Table.stories";

const {
  AdvancedFilteringAndSorting,
  BareBones,
  CustomActions,
  Default,
  EditableData,
  EmptyDataSet,
  SelectableRows,
  Templated,
} = composeStories(TableStories);

describe("Table", () => {
  const user = userEvent.setup();
  vi.spyOn(console, "warn").mockImplementation(() => null); // ignore tooltip warnings

  it("fully renders without exploding", () => {
    const { getByRole } = render(<Table {...FilledFields} />);

    const tableElement = getByRole("table");
    expect(tableElement).toBeTruthy();
  });

  it("rowHeight is set to compact ", () => {
    const { getByRole } = render(
      <Table rowHeight="compact" {...FilledFields} />
    );

    const tableElement = getByRole("table");
    expect(tableElement).toHaveClass("neo-table--compact");
  });

  it("rowHeight is set to medium ", () => {
    const { getByRole } = render(
      <Table rowHeight="medium" {...FilledFields} />
    );

    const tableElement = getByRole("table");
    expect(tableElement).toHaveClass("neo-table--medium");
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Table {...FilledFields} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
        />
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
        />
      );

      const headerCheckbox = getByLabelText(
        FilledFields.translations.header.selectAll
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

    it("properly selects and deselects a body row", async () => {
      const { queryAllByRole } = render(
        <Table {...FilledFields} selectableRows="multiple" />
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
  });

  describe("toolbar functionality", () => {
    it("properly calls it's `refresh` method", async () => {
      const mock = vi.fn();
      const { getByLabelText } = render(
        <Table {...FilledFields} handleRefresh={mock} />
      );

      const refreshButton = getByLabelText(
        FilledFields.translations.toolbar.refresh
      );

      await user.click(refreshButton);
      expect(mock).toHaveBeenCalled();
    });

    it("it's `create` method can be called at any time", async () => {
      const mock = vi.fn();
      const { getByText, queryAllByRole } = render(
        <Table {...FilledFields} handleCreate={mock} selectableRows="single" />
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
        />
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
        />
      );

      // expect button to not be rendered when zero rows are selected
      expect(() =>
        getByText(FilledFields.translations.toolbar.delete)
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

    it("properly utilizes it's `search` method", async () => {
      const { getByLabelText, queryAllByRole } = render(
        <Table {...FilledFields} itemsPerPageOptions={[50]} />
      );

      const alltrs = queryAllByRole("row");
      expect(alltrs).toHaveLength(FilledFields.data.length + 1);

      const searchInput = getByLabelText(
        FilledFields.translations.toolbar.searchInputPlaceholder
      );
      await user.click(searchInput);
      await user.keyboard(FilledFields.data[0].label);

      const filteredtrs = queryAllByRole("row");
      expect(filteredtrs.length).toBeGreaterThan(0);
      expect(filteredtrs.length).toBeLessThan(alltrs.length);
    });
  });

  describe("sort and filter functionality", () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(<AdvancedFilteringAndSorting />);
    });

    it("allows column sorting of row", async () => {
      const { container, getByRole, queryAllByRole } = renderResult;

      const firstColumnSortButton = container.querySelector(
        "tr th button.neo-multiselect"
      );
      expect(firstColumnSortButton).toHaveTextContent(
        FilledFields.columns[0].Header
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
    });

    it("allows column filtering via header dropdown", async () => {
      const { container, getByRole, queryAllByRole, getByLabelText } =
        renderResult;

      const firstColumnSortButton = container.querySelector(
        "tr th button.neo-multiselect"
      );
      expect(firstColumnSortButton).toHaveTextContent(
        FilledFields.columns[0].Header
      );
      expect(firstColumnSortButton).toBeVisible();

      expect(getByRole("dialog")).not.toHaveClass(
        "sheet-horizontal-slide-in-shim"
      );
      expect(getByRole("dialog")).toHaveClass(
        "sheet-horizontal-slide-out-shim"
      );

      await user.click(firstColumnSortButton);

      const menuItems = queryAllByRole("menuitem");
      expect(menuItems).toHaveLength(4);
      await user.click(queryAllByRole("menuitem")[3]);

      expect(getByRole("dialog")).toHaveClass("sheet-horizontal-slide-in-shim");
      expect(getByRole("dialog")).not.toHaveClass(
        "sheet-horizontal-slide-out-shim"
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
        "tr th button.neo-multiselect"
      );
      expect(firstColumnSortButton).toHaveTextContent(
        FilledFields.columns[0].Header
      );
      expect(firstColumnSortButton).toBeVisible();

      const columnFilterButton = container.querySelector(
        `button[aria-label="${FilledFields.translations.toolbar.filterColumns}"]`
      );

      expect(getByRole("dialog")).not.toHaveClass(
        "sheet-horizontal-slide-in-shim"
      );
      expect(getByRole("dialog")).toHaveClass(
        "sheet-horizontal-slide-out-shim"
      );

      await user.click(columnFilterButton);

      expect(getByRole("dialog")).toHaveClass("sheet-horizontal-slide-in-shim");
      expect(getByRole("dialog")).not.toHaveClass(
        "sheet-horizontal-slide-out-shim"
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

    // BUG: use of `Button` in `customActionsNode` is causing the render method to fail
    describe.skip("CustomActions", () => {
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

    describe("SelectableRows", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<SelectableRows />);
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
