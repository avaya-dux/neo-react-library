import {
	type KeyboardEvent,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

import { Checkbox } from "components/Checkbox";
import { Icon } from "components/Icon";
import { Menu, MenuButton, MenuItem } from "components/Menu";
import { Tooltip } from "components/Tooltip";
import { type IconNamesType, Keys } from "utils";

import clsx from "clsx";
import {
	FilterContext,
	calculateAriaSortValue,
	toggleEnabledPageRows,
	toggleEnabledTableRows,
} from "../helpers";
import type { TableHeaderProps } from "../types";

/**
 * There are more filtering examples to be found here:
 * https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/filtering?file=/src/App.js
 */

/**
 * TableHeader is used by the Table component to render the `<thead>` table content
 *
 * @example
 * <TableHeader
 *  instance={instance}
 *  translations={translations}
 * />
 */
// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export const TableHeader = <T extends Record<string, any>>({
	handleRowToggled = () => null,
	instance,
	selectableRows,
	translations,
}: TableHeaderProps<T>) => {
	const {
		headers,
		page,
		rows,
		state: { selectedRowIds },
		toggleSortBy,
	} = instance;

	const [
		pageEnabledRowCount,
		allPageEnabledRowsSelected,
		allPageRowsDeselected,
	] = useMemo(() => {
		const enabledPageRows = page
			.filter((row) => !row.original.disabled)
			.map((row) => row.original);
		const allPageRowsSelectedMemo =
			enabledPageRows.length &&
			enabledPageRows.every((row) => selectedRowIds[row.id]);
		const allPageRowsDeselectedMemo = enabledPageRows.every(
			(row) => !selectedRowIds[row.id],
		);

		return [
			enabledPageRows.length,
			allPageRowsSelectedMemo,
			allPageRowsDeselectedMemo,
		];
	}, [page, selectedRowIds]);

	const [tableEnabledRowCount, allTableEnabledRowsAreSelected] = useMemo(() => {
		const enabledRows = rows.filter((row) => !row.original.disabled);
		const enabledRowCount = enabledRows.length;
		const rowsSelectedMemo =
			enabledRowCount && enabledRows.every((row) => selectedRowIds[row.id]);

		return [enabledRowCount, rowsSelectedMemo];
	}, [rows, selectedRowIds]);

	const {
		allowColumnFilter,
		toggleFilterSheetVisible,
		draggableRows,
		setDataSyncOption,
		clearSortByFuncRef,
	} = useContext(FilterContext);

	const shouldHaveCheckboxColumn = selectableRows !== "none";
	const shouldHaveCheckbox = selectableRows === "multiple";

	const checkboxCheckedValue = useMemo(() => {
		return allPageEnabledRowsSelected
			? true
			: allPageRowsDeselected
				? false
				: "mixed";
	}, [allPageEnabledRowsSelected, allPageRowsDeselected]);

	const toggleAllRows = useCallback(() => {
		const toggledIds = toggleEnabledTableRows(
			instance,
			!allTableEnabledRowsAreSelected,
		);

		if (handleRowToggled) {
			const shouldSelectAll = [false, "mixed"].includes(checkboxCheckedValue);

			handleRowToggled(shouldSelectAll ? toggledIds : []);
		}
	}, [
		instance,
		allTableEnabledRowsAreSelected,
		handleRowToggled,
		checkboxCheckedValue,
	]);

	const togglePageRows = useCallback(() => {
		const toggledIds = toggleEnabledPageRows(
			instance,
			!allPageEnabledRowsSelected,
		);

		if (handleRowToggled) {
			const shouldSelectAll = [false, "mixed"].includes(checkboxCheckedValue);

			handleRowToggled(shouldSelectAll ? toggledIds : []);
		}
	}, [
		instance,
		allPageEnabledRowsSelected,
		handleRowToggled,
		checkboxCheckedValue,
	]);

	const [checkBoxOver, setCheckBoxOver] = useState(false);

	return (
		<thead>
			<tr>
				{draggableRows && (
					<th
						className={clsx(
							"neo-table__dnd-th",
							checkBoxOver && "neo-table__dnd-th__hover",
						)}
					>
						<div role="button" aria-label={translations.dragHandle}>
							&nbsp;
						</div>
					</th>
				)}
				{shouldHaveCheckboxColumn && (
					<th
						className="neo-table-checkbox-th"
						onMouseOver={() => setCheckBoxOver(true)}
						onFocus={() => setCheckBoxOver(true)}
						onBlur={() => setCheckBoxOver(false)}
						onMouseOut={() => setCheckBoxOver(false)}
					>
						{shouldHaveCheckbox && (
							<div className="table-selection-menu">
								<Checkbox
									checked={checkboxCheckedValue}
									aria-label={translations.selectPage}
									onChange={togglePageRows}
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
									<MenuItem
										onClick={() =>
											toggleEnabledPageRows(
												instance,
												!allPageEnabledRowsSelected,
											)
										}
									>
										{allPageEnabledRowsSelected ? (
											<>
												{translations.clearPage} ({pageEnabledRowCount})
											</>
										) : (
											<>
												{translations.selectPage} ({pageEnabledRowCount})
											</>
										)}
									</MenuItem>

									<MenuItem
										onClick={() => {
											toggleAllRows();
										}}
									>
										{allTableEnabledRowsAreSelected ? (
											<>
												{translations.clearAll} ({tableEnabledRowCount})
											</>
										) : (
											<>
												{translations.selectAll} ({tableEnabledRowCount})
											</>
										)}
									</MenuItem>
								</Menu>
							</div>
						)}
					</th>
				)}
				{headers.map((column) => {
					const {
						canFilter,
						canSort,
						clearSortBy,
						getHeaderProps,
						getSortByToggleProps,
						isSorted,
						isSortedDesc,
						isVisible,
						render,
					} = column;

					const sortedDir = isSortedDesc ? "descending" : "ascending";
					const ariasort = calculateAriaSortValue(isSorted, sortedDir);

					let content = render("Header");
					if (canFilter && column.Filter) {
						content = render("Filter");
					} else if (canSort) {
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
							console.log("handleClearSort called");
							clearSortBy();
							setDataSyncOption("clear");
							clearSortByFuncRef.current = clearSortBy;
						};

						const handleAscSort = () => {
							toggleSortBy(column.id, false, false);
							setDataSyncOption("asc");
							clearSortByFuncRef.current = clearSortBy;
						};
						const handleDescSort = () => {
							toggleSortBy(column.id, true, false);
							setDataSyncOption("desc");
							clearSortByFuncRef.current = clearSortBy;
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
									<Tooltip label={render("Header") as string} position="top">
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

								{allowColumnFilter ? (
									<MenuItem
										onClick={toggleFilterSheetVisible}
										onKeyDown={(e) =>
											onSpaceOrEnter(e, toggleFilterSheetVisible)
										}
									>
										{translations.filterColumn || "Filter Column"}
									</MenuItem>
								) : (
									<></>
								)}
							</Menu>
						);
					}

					return (
						<th
							style={{
								display: isVisible ? undefined : "none",
							}}
							{...getHeaderProps()}
							key={column.id}
							scope="col"
							aria-sort={ariasort}
						>
							{content}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};
