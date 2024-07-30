import { type KeyboardEvent, useContext, useMemo } from "react";

import { Checkbox } from "components/Checkbox";
import { Icon } from "components/Icon";
import { Menu, MenuButton, MenuItem } from "components/Menu";
import { Tooltip } from "components/Tooltip";
import { type IconNamesType, Keys } from "utils";

import {
	FilterContext,
	calculateAriaSortValue,
	setPageRowsSelected,
	setTableRowsSelected,
} from "../helpers";
import type { TableHeaderProps } from "../types";

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
	selectableRows,
	translations,
}) => {
	const { headers, toggleSortBy } = instance;

	const {
		allowColumnFilter,
		toggleFilterSheetVisible,
		draggableRows,
		setDataSyncOption,
		clearSortByFuncRef,
	} = useContext(FilterContext);

	const shouldHaveCheckboxColumn = selectableRows !== "none";

	// TODO: update CSS so that we can remove this
	// const [checkBoxOver, setCheckBoxOver] = useState(false);

	return (
		<thead>
			<tr>
				{draggableRows && (
					<th className="neo-table__dnd-th">
						<div role="button" aria-label={translations.dragHandle}>
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

/**
 * an empty `<th>` if `selectableRows === "multiple"`, else a `<th>` with a checkbox and a dropdown menu
 */
const CheckboxHeaderCell: TableHeaderComponentType = ({
	handleRowToggled,
	instance,
	selectableRows,
	translations,
}) => {
	const shouldHaveCheckbox = selectableRows === "multiple";

	return (
		<th className="neo-table-checkbox-th">
			{shouldHaveCheckbox && (
				<TableSelectionMenu
					handleRowToggled={handleRowToggled}
					instance={instance}
					selectableRows={selectableRows}
					translations={translations}
				/>
			)}
		</th>
	);
};

const TableSelectionMenu: TableHeaderComponentType = ({
	handleRowToggled = () => null,
	instance,
	translations,
}) => {
	const {
		page,
		rows,
		state: { selectedRowIds },
	} = instance;

	const selectedRowsCount = useMemo(
		() => Object.keys(selectedRowIds).length,
		[selectedRowIds],
	);

	const isSinglePage = useMemo(() => page.length === rows.length, [page, rows]);

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
		const rowsSelectedMemo = !!(
			enabledRowCount && enabledRows.every((row) => selectedRowIds[row.id])
		);

		return [enabledRowCount, rowsSelectedMemo];
	}, [rows, selectedRowIds]);

	const checkboxCheckedValue = useMemo(() => {
		return allPageEnabledRowsSelected
			? true
			: allPageRowsDeselected
				? false
				: "mixed";
	}, [allPageEnabledRowsSelected, allPageRowsDeselected]);

	return (
		<div className="table-selection-menu">
			<Checkbox
				checked={checkboxCheckedValue}
				aria-label={translations.selectPage}
				onChange={() =>
					setPageRowsSelected(
						instance,
						!allPageEnabledRowsSelected,
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
				{isSinglePage ? (
					<></>
				) : (
					<MenuItem
						onClick={() =>
							setPageRowsSelected(
								instance,
								!allPageEnabledRowsSelected,
								handleRowToggled,
							)
						}
					>
						{allPageEnabledRowsSelected ? (
							<>
								{translations.clearPage} ({pageEnabledRowCount}{" "}
								{translations.items})
							</>
						) : (
							<>
								{translations.selectPage} ({pageEnabledRowCount}{" "}
								{translations.items})
							</>
						)}
					</MenuItem>
				)}

				<MenuItem
					disabled={allTableEnabledRowsAreSelected}
					onClick={() => {
						setTableRowsSelected(instance, true, handleRowToggled);
					}}
				>
					{translations.selectAll} ({tableEnabledRowCount} {translations.items})
				</MenuItem>

				<MenuItem
					disabled={selectedRowsCount === 0}
					onClick={() => {
						setTableRowsSelected(instance, false, handleRowToggled);
					}}
				>
					{translations.clearAll} ({tableEnabledRowCount} {translations.items})
				</MenuItem>
			</Menu>
		</div>
	);
};
