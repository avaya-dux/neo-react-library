import log from "loglevel";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Menu, MenuItem } from "components/Menu";
import { TextInput } from "components/TextInput";

import { FilterContext } from "../helpers";
import type { TableToolbarProps } from "../types";
import { TableFilter } from "./TableFilter";
import "./TableToolbar_shim.css";
const logger = log.getLogger("TableComponents/TableToolbar");
logger.disableAll();
export { logger as tableToolbarLogger };
/**
 * TableToolbar is used by the Table component to render the search and action inputs for the table
 *
 * @example
 * <TableToolbar
 *  handleRefresh={handleRefresh}
 *  instance={instance}
 *  readonly={true}
 *  translations={translations}
 * />
 */
// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export const TableToolbar = <T extends Record<string, any>>({
	customActionsNode,
	handleCreate,
	handleDelete,
	handleEdit,
	handleRefresh,
	handleSearch,
	handleShowColumnsFilter,
	handleRowHeightChange,
	showRowHeightMenu,
	showSearch,
	rowHeight,
	instance,
	readonly = false,
	translations,
}: TableToolbarProps<T>) => {
	logger.debug("TableToolbar Start");
	const {
		data,
		setGlobalFilter,
		rowsById,
		state: { globalFilter, selectedRowIds, pageSize },
	} = instance;

	const selectedRowIdsStringArray = useMemo(
		() => Object.keys(selectedRowIds),
		[selectedRowIds],
	);

	const [search, setSearch] = useState<string>(globalFilter || "");
	const setSearches = useCallback(
		(searchString: string) => {
			logger.debug("TableToolbar: setSearches", searchString);
			setSearch(searchString);
			if (handleSearch) {
				handleSearch(searchString, pageSize);
			} else {
				setGlobalFilter(searchString);
			}
		},
		[setGlobalFilter, handleSearch, pageSize],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: handle data update (e.g. new/more data pulled from server)
	useEffect(() => {
		if (!handleSearch && search) {
			logger.debug("apply global filter on data update");
			setGlobalFilter(search);
		}
	}, [data]);

	const editDisabled = readonly || selectedRowIdsStringArray.length !== 1;
	const deleteDisabled = readonly || selectedRowIdsStringArray.length === 0;

	const { allowToggleColumnVisibility } = useContext(FilterContext);

	return (
		<div className="neo-table__actions">
			<div className="neo-table__actions--left neo-table__actions--links">
				{handleCreate && (
					<Button
						disabled={readonly}
						icon="add"
						variant="primary"
						onClick={handleCreate}
					>
						{translations.create}
					</Button>
				)}

				{customActionsNode}

				{handleEdit && editDisabled === false && (
					<Button
						icon="edit"
						variant="tertiary"
						onClick={() => {
							const selectedRowId = selectedRowIdsStringArray[0];
							const selectedRow = rowsById[selectedRowId].original;
							handleEdit(selectedRow);
						}}
					>
						{translations.edit}
					</Button>
				)}

				{handleDelete && deleteDisabled === false && (
					<Button
						icon="trash"
						variant="tertiary"
						status="alert"
						onClick={() => {
							handleDelete(selectedRowIdsStringArray);
						}}
					>
						{translations.delete}
					</Button>
				)}
			</div>

			<div
				className="neo-table__actions--right"
				style={{ position: "relative" }}
			>
				<div className="neo-form">
					{showSearch && (
						<TextInput
							aria-label={translations.searchInputPlaceholder}
							placeholder={translations.searchInputPlaceholder}
							startIcon="search"
							value={search}
							onChange={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setSearches(e.currentTarget.value);
							}}
						/>
					)}
				</div>

				{allowToggleColumnVisibility && (
					<TableFilter
						handleShowColumnsFilter={handleShowColumnsFilter}
						translations={translations}
						instance={instance}
					/>
				)}

				{handleRefresh && (
					<IconButton
						aria-label={translations.refresh || "Refresh"}
						icon="refresh"
						onClick={handleRefresh}
						shape="square"
						className="neo-table__toolbar-btn"
						size="large"
						variant="tertiary"
					/>
				)}

				{showRowHeightMenu && (
					<Menu
						itemAlignment="right"
						menuRootElement={
							<IconButton
								icon="preferences"
								aria-label={translations.selectRowHeight || "Select row height"}
								variant="tertiary"
								shape="square"
								className="neo-table__toolbar-btn"
								size="large"
							/>
						}
					>
						<MenuItem
							isActive={rowHeight === "large"}
							onClick={() => {
								handleRowHeightChange("large");
							}}
						>
							{translations.large || "Large"}
						</MenuItem>
						<MenuItem
							isActive={rowHeight === "medium"}
							onClick={() => handleRowHeightChange("medium")}
						>
							{translations.medium || "Medium"}
						</MenuItem>
						<MenuItem
							isActive={rowHeight === "compact"}
							onClick={() => handleRowHeightChange("compact")}
						>
							{translations.small || "Small"}
						</MenuItem>
					</Menu>
				)}
			</div>
		</div>
	);
};
