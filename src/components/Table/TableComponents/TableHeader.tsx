import { type KeyboardEvent, useContext, useMemo } from "react";

import { Checkbox } from "components/Checkbox";
import { Icon } from "components/Icon";
import { Menu, MenuButton, MenuItem, MenuSeparator } from "components/Menu";
import { Tooltip } from "components/Tooltip";
import { type IconNamesType, Keys } from "utils";

import clsx from "clsx";
import log from "loglevel";
import type { ColumnInstance } from "react-table";
import {
	FilterContext,
	calculateAriaSortValue,
	setPageRowsSelected,
	setTableRowsSelected,
} from "../helpers";
import type { TableHeaderProps } from "../types";
const logger = log.getLogger("TableHeader");
export { logger as tableHeaderLogger };
logger.disableAll();
// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
type TableHeaderComponentType = <T extends Record<string, any>>(
	props: TableHeaderProps<T>,
) => JSX.Element;

/**
 * There are more filtering examples to be found here:
 * https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/filtering?file=/src/App.js
 */

/**
 * TableHeader is used by the Table component to render the `<thead>` table content
 *
 * @example
 * <TableHeader
 *  handleRowToggled={handleRowToggled}
 *  selectableRows={selectableRows}
 *  instance={instance}
 *  translations={translations}
 * />
 */
export const TableHeader: TableHeaderComponentType = ({
	handleRowToggled,
	instance,
	manualSortBy,
	onManualSortBy,
	selectableRows,
	translations,
}) => {
	const { headerGroups, toggleSortBy } = instance;

	const {
		draggableRows,
		resizableColumns,
		setDataSyncOption,
		clearSortByFuncRef,
		hasInsetTable,
		setFilterColumn,
		tableWidth,
		lastColumnWidthRef,
	} = useContext(FilterContext);

	const shouldHaveCheckboxColumn = selectableRows !== "none" || hasInsetTable;

	return (
		<thead>
			{headerGroups.map((headerGroup) => {
				const {
					key,
					style = {},
					...restProps
				} = headerGroup.getHeaderGroupProps();
				const newStyle = { ...style, width: tableWidth };
				return (
					<tr key={key} style={newStyle} {...restProps}>
						{draggableRows && (
							<th className="neo-table__dnd-th">
								<div
									role="button"
									tabIndex={-1}
									aria-label={translations.dragHandle}
								>
									&nbsp;
								</div>
							</th>
						)}

						{shouldHaveCheckboxColumn && (
							<CheckboxHeaderCell
								handleRowToggled={handleRowToggled}
								instance={instance}
								selectableRows={selectableRows}
								translations={translations}
							/>
						)}

						{headerGroup.headers.map((column, index, columns) => {
							const {
								canFilter,
								canSort,
								clearSortBy,
								getHeaderProps,
								getSortByToggleProps,
								isSorted,
								isSortedDesc,
								filterValue,
								render,
							} = column;

							const isLastColumn = columns.length - 1 === index;

							const headerProps = getHeaderProps();
							const originalStyle = headerProps.style || {};
							let modifiedStyle = { ...originalStyle };

							if (isLastColumn && tableWidth) {
								const totalOtherColumnsWidth = columns
									.slice(0, -1)
									.reduce((total, col) => {
										const colWidth = col.getHeaderProps().style?.width;
										return (
											total +
											(colWidth ? Number.parseFloat(colWidth.toString()) : 0)
										);
									}, 0);

								const lastColumnWidth = tableWidth - totalOtherColumnsWidth;
								lastColumnWidthRef.current = lastColumnWidth;
								logger.log({
									lastColumnWidthAdjusted: lastColumnWidth,
									lastColumnWidthStart: originalStyle.width,
									totalOtherColumnsWidth: totalOtherColumnsWidth,
									tableWidth: tableWidth,
								});
								modifiedStyle = {
									...originalStyle,
									width: `${lastColumnWidth}px`,
								};
							}

							const sortedDir = isSortedDesc ? "descending" : "ascending";
							const ariasort = calculateAriaSortValue(isSorted, sortedDir);
							const isFiltering = filterValue && filterValue.length > 0;
							let content = render("Header");
							// canFilter is false when disableFilters is true on the column
							// column.Filter is the renderer function for the filter UI
							// The plan now is to not show filter ui on the header cell, but show it when filter column is clicked
							if (canSort) {
								const thDivProps = getSortByToggleProps({
									// keep mouse-click from triggering sort
									onClick: (e) => {
										e.stopPropagation();
										e.preventDefault();
									},
								});

								thDivProps.title = translations.toggleSortBy;
								const sortIcon: IconNamesType =
									ariasort === "descending" ? "arrow-up" : "arrow-down";

								const handleClearSort = () => {
									clearSortBy();
									setDataSyncOption("clear");
									clearSortByFuncRef.current = clearSortBy;

									if (manualSortBy && onManualSortBy) {
										onManualSortBy(column.id, "unsorted");
									}
								};

								const handleAscSort = () => {
									toggleSortBy(column.id, false, false);
									setDataSyncOption("asc");
									clearSortByFuncRef.current = clearSortBy;
									if (manualSortBy && onManualSortBy) {
										onManualSortBy(column.id, "asc");
									}
								};

								const handleDescSort = () => {
									toggleSortBy(column.id, true, false);
									setDataSyncOption("desc");
									clearSortByFuncRef.current = clearSortBy;
									if (manualSortBy && onManualSortBy) {
										onManualSortBy(column.id, "desc");
									}
								};

								const onSpaceOrEnter = (
									e: KeyboardEvent<HTMLDivElement>,
									method: () => void,
								) => {
									switch (e.key) {
										case Keys.ENTER:
										case Keys.SPACE:
											method();
											break;
									}
								};

								content = (
									<Menu
										menuRootElement={
											<Tooltip
												label={render("Header") as string}
												position="top"
											>
												<MenuButton
													variant="tertiary"
													className="neo-multiselect"
													onKeyDown={(e) => {
														switch (e.key) {
															case Keys.ENTER:
															case Keys.SPACE:
															case Keys.DOWN:
																// keep keyboard from triggering sort inaproriately
																e.stopPropagation();
																e.preventDefault();
																break;
														}
													}}
												>
													<span
														style={{
															maxWidth: column.maxWidth,
															minWidth: column.minWidth,
															width: column.width,
														}}
													>
														{render("Header")}
													</span>
													{isFiltering && (
														<Icon
															icon="filter"
															aria-label={translations.filterApplied}
														/>
													)}
													{isSorted && (
														<Icon
															icon={sortIcon}
															aria-label={sortIcon.replace(/-/g, " ")}
														/>
													)}
												</MenuButton>
											</Tooltip>
										}
										{...thDivProps}
									>
										<MenuItem
											onClick={handleClearSort}
											onKeyDown={(e) => onSpaceOrEnter(e, handleClearSort)}
											disabled={!isSorted}
										>
											{translations.clearSort || "Clear Sort"}
										</MenuItem>

										<MenuItem
											onClick={handleAscSort}
											onKeyDown={(e) => onSpaceOrEnter(e, handleAscSort)}
										>
											{translations.sortAscending || "A - Z"}
										</MenuItem>

										<MenuItem
											onClick={handleDescSort}
											onKeyDown={(e) => onSpaceOrEnter(e, handleDescSort)}
										>
											{translations.sortDescending || "Z - A"}
										</MenuItem>

										{canFilter ? (
											<>
												<MenuSeparator />
												<MenuItem
													onClick={() =>
														setFilterColumn(column as unknown as ColumnInstance)
													}
													onKeyDown={(e) =>
														onSpaceOrEnter(e, () =>
															setFilterColumn(
																column as unknown as ColumnInstance,
															),
														)
													}
												>
													{isFiltering && (
														<Icon
															icon="check"
															aria-label={translations.filterApplied}
														/>
													)}
													{translations.filterColumn}
												</MenuItem>
											</>
										) : (
											<></>
										)}
									</Menu>
								);
							}

							return (
								<th
									{...headerProps}
									style={modifiedStyle}
									key={column.id}
									scope="col"
									aria-sort={ariasort}
								>
									{content}
									{resizableColumns && column.canResize && !isLastColumn && (
										<div
											{...column.getResizerProps()}
											className={clsx(
												"neo-table__resizer__th",
												column.isResizing && "neo-table--resizing",
											)}
										/>
									)}
								</th>
							);
						})}
					</tr>
				);
			})}
		</thead>
	);
};

/**
 * An empty `<th>` if `selectableRows === "multiple"`, else a `<th>` with a checkbox and a dropdown menu
 */
const CheckboxHeaderCell: TableHeaderComponentType = ({
	handleRowToggled,
	instance,
	selectableRows,
	translations,
}) => {
	const shouldHaveCheckbox = selectableRows === "multiple";

	return (
		<th
			className={clsx("neo-table-checkbox-th", !shouldHaveCheckbox && "narrow")}
		>
			{shouldHaveCheckbox && (
				<TableSelectionCheckboxAndMenu
					handleRowToggled={handleRowToggled}
					instance={instance}
					selectableRows={selectableRows}
					translations={translations}
				/>
			)}
		</th>
	);
};

/**
 * A checkbox and dropdown menu used to select or clear all rows in the table or on the current page.
 */
const TableSelectionCheckboxAndMenu: TableHeaderComponentType = ({
	handleRowToggled = () => null,
	instance,
	translations,
}) => {
	const {
		page,
		rows,
		state: { selectedRowIds },
	} = instance;

	const [checkboxCheckedValue, onClickCheckboxCheckedValue] = useMemo<
		[boolean | "mixed", boolean]
	>(() => {
		const enabledPageRows = page
			.filter((row) => !row.original.disabled)
			.map((row) => row.original);

		const allPageEnabledRowsSelected =
			enabledPageRows.length &&
			enabledPageRows.every((row) => selectedRowIds[row.id]);

		const allPageRowsDeselected = enabledPageRows.every(
			(row) => !selectedRowIds[row.id],
		);

		const checkboxValue = allPageEnabledRowsSelected
			? true
			: allPageRowsDeselected
				? false
				: "mixed";

		const checkboxClickedValue = checkboxValue !== true;

		return [checkboxValue, checkboxClickedValue];
	}, [page, selectedRowIds]);

	// multi-page options
	const SelectCurrentPage = useMemo(() => {
		const hasMoreThanOnePage = page.length !== rows.length;
		const pageHasSelectableRows = page.some((row) => !row.original.disabled);
		const notAllPageRowsAreSelected = page.some(
			(row) => !selectedRowIds[row.id] && !row.original.disabled,
		);

		return hasMoreThanOnePage &&
			pageHasSelectableRows &&
			notAllPageRowsAreSelected ? (
			<MenuItem
				onClick={() => setPageRowsSelected(instance, true, handleRowToggled)}
			>
				{translations.selectPage}
			</MenuItem>
		) : (
			<></>
		);
	}, [page, rows, selectedRowIds, handleRowToggled, instance, translations]);

	const ClearCurrentPage = useMemo(() => {
		const hasMoreThanOnePage = page.length !== rows.length;
		const pageHasSelectableRows = page.some((row) => !row.original.disabled);
		const allPageRowsAreSelected = page.some(
			(row) => selectedRowIds[row.id] && !row.original.disabled,
		);

		return hasMoreThanOnePage &&
			pageHasSelectableRows &&
			allPageRowsAreSelected ? (
			<MenuItem
				onClick={() => setPageRowsSelected(instance, false, handleRowToggled)}
			>
				{translations.clearPage}
			</MenuItem>
		) : (
			<></>
		);
	}, [page, rows, selectedRowIds, handleRowToggled, instance, translations]);

	const SelectAllPages = useMemo(() => {
		const hasMoreThanOnePage = page.length !== rows.length;
		const notAllRowsAreSelect = rows.some(
			(row) => !selectedRowIds[row.id] && !row.original.disabled,
		);

		return hasMoreThanOnePage && notAllRowsAreSelect ? (
			<MenuItem
				onClick={() => setTableRowsSelected(instance, true, handleRowToggled)}
			>
				{translations.selectAllPages}
			</MenuItem>
		) : (
			<></>
		);
	}, [page, rows, selectedRowIds, handleRowToggled, instance, translations]);

	const ClearAllPages = useMemo(() => {
		const hasMoreThanOnePage = page.length !== rows.length;
		const someRowsAreSelectedThatAreNotOnCurrentPage = rows.some(
			(row) => selectedRowIds[row.id] && !page.find((r) => r.id === row.id),
		);

		return hasMoreThanOnePage && someRowsAreSelectedThatAreNotOnCurrentPage ? (
			<MenuItem
				onClick={() => setTableRowsSelected(instance, false, handleRowToggled)}
			>
				{translations.clearAllPages}
			</MenuItem>
		) : (
			<></>
		);
	}, [page, rows, selectedRowIds, handleRowToggled, instance, translations]);

	// single-page options
	const SelectAll = useMemo(() => {
		const hasOnePage = page.length === rows.length;
		const notAllRowsAreSelected = rows.some(
			(row) => !selectedRowIds[row.id] && !row.original.disabled,
		);

		return hasOnePage && notAllRowsAreSelected ? (
			<MenuItem
				onClick={() => setTableRowsSelected(instance, true, handleRowToggled)}
			>
				{translations.selectAll}
			</MenuItem>
		) : (
			<></>
		);
	}, [
		rows,
		selectedRowIds,
		handleRowToggled,
		instance,
		translations,
		page.length,
	]);

	const ClearAll = useMemo(() => {
		const hasOnePage = page.length === rows.length;
		const someRowsAreSelected = rows.some(
			(row) => selectedRowIds[row.id] && !row.original.disabled,
		);

		return hasOnePage && someRowsAreSelected ? (
			<MenuItem
				onClick={() => setTableRowsSelected(instance, false, handleRowToggled)}
			>
				{translations.clearAll}
			</MenuItem>
		) : (
			<></>
		);
	}, [
		rows,
		selectedRowIds,
		handleRowToggled,
		instance,
		translations,
		page.length,
	]);

	return (
		<div className="table-selection-menu">
			<Checkbox
				checked={checkboxCheckedValue}
				disabled={rows.length === 0}
				aria-label={translations.selectPage}
				onChange={() =>
					setPageRowsSelected(
						instance,
						onClickCheckboxCheckedValue,
						handleRowToggled,
					)
				}
				value="all"
			/>

			<Menu
				menuRootElement={
					<button
						type="button"
						className="neo-table-th-select-all-btn neo-btn-tertiary neo-dropdown__link-header"
						aria-label={translations.tableSelectionDropdown}
					/>
				}
			>
				{SelectCurrentPage}
				{ClearCurrentPage}
				{SelectAllPages}
				{ClearAllPages}
				{SelectAll}
				{ClearAll}
			</Menu>
		</div>
	);
};
