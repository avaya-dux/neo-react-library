import { type KeyboardEvent, useCallback, useContext, useMemo } from "react";

import { Checkbox } from "components/Checkbox";
import { Icon } from "components/Icon";
import { Menu, MenuButton, MenuItem } from "components/Menu";
import { Tooltip } from "components/Tooltip";
import { type IconNamesType, Keys } from "utils";

import { calculateAriaSortValue, FilterContext } from "../helpers";
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableHeader = <T extends Record<string, any>>({
	handleRowToggled = () => null,
	instance,
	selectableRows,
	translations,
}: TableHeaderProps<T>) => {
	const {
		headers,
		rows,
		rowsById,
		state: { selectedRowIds },
		toggleAllRowsSelected,
		toggleSortBy,
	} = instance;

	const { allowColumnFilter, toggleFilterSheetVisible } =
		useContext(FilterContext);

	const selectedRows = Object.keys(selectedRowIds);
	const allRowsAreSelected =
		rows.length === 0 ? false : selectedRows.length === rows.length;
	const shouldHaveCheckboxColumn = selectableRows !== "none";
	const shouldHaveCheckbox = selectableRows === "multiple";
	const checkboxCheckedValue = useMemo(() => {
		return allRowsAreSelected
			? true
			: selectedRows.length === 0
				? false
				: "mixed";
	}, [allRowsAreSelected, selectedRows]);
	const handleRowToggledInternal = useCallback(() => {
		toggleAllRowsSelected(!allRowsAreSelected);

		if (handleRowToggled) {
			const shouldSelectAll = [false, "mixed"].includes(checkboxCheckedValue);

			handleRowToggled(shouldSelectAll ? Object.keys(rowsById) : []);
		}
	}, [
		toggleAllRowsSelected,
		allRowsAreSelected,
		handleRowToggled,
		checkboxCheckedValue,
		rowsById,
	]);

	return (
		<thead>
			<tr>
				{shouldHaveCheckboxColumn && (
					<th style={{ padding: "0 0 0 5px", width: 30 }}>
						{shouldHaveCheckbox && (
							<Checkbox
								checked={checkboxCheckedValue}
								aria-label={translations.selectAll}
								onChange={handleRowToggledInternal}
								value="all"
							/>
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

						const handleAscSort = () => toggleSortBy(column.id, false, false);
						const handleDescSort = () => toggleSortBy(column.id, true, false);
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
									onClick={clearSortBy}
									onKeyDown={(e) => onSpaceOrEnter(e, clearSortBy)}
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
