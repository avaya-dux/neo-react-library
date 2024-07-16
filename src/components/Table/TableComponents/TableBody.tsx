import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Checkbox } from "components";
import log from "loglevel";
import { useContext } from "react";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import type { Row } from "react-table";
import { DraggableTableRow } from "../DraggableTableRow";
import { StaticTableRow } from "../StaticTableRow";
import { FilterContext } from "../helpers";
import type { TableBodyProps } from "../types";
export const logger = log.getLogger("TableComponents/TableBody");
logger.enableAll();

import "./TableBody_shim.css";

import "./TableBody_shim.css";
import { toggleEnabledTableRows } from "../helpers";

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
type TableBodyComponentType = <T extends Record<string, any>>(
	props: TableBodyProps<T>,
) => JSX.Element | JSX.Element[] | undefined;

/**
 * TableBody is used by the Table component to render the table body (<tr>s and <td>s)
 *
 * @example
 * <TableBody
 *  handleRowToggled={(selectedRowIds, toggledRow) => { ... }}
 *  instance={instance}
 *  selectableRows={selectableRows}
 * />
 */
export const TableBody: TableBodyComponentType = ({
	handleRowToggled = () => null,
	instance,
	selectableRows,
	translations,
}) => {
	const { getTableBodyProps, headers, page, rows } = instance;

	return (
		<tbody {...getTableBodyProps()}>
			<SortableContext items={rows} strategy={verticalListSortingStrategy}>
				{page.length === 0 ? (
					<tr>
						<td colSpan={headers.length}>{translations.noDataAvailable}</td>
					</tr>
				) : (
					<>
						<ClearSelectionRow
							instance={instance}
							selectableRows={selectableRows}
							translations={translations}
						/>

						<TableDataRows
							handleRowToggled={handleRowToggled}
							instance={instance}
							selectableRows={selectableRows}
							translations={translations}
						/>
					</>
				)}
			</SortableContext>
		</tbody>
	);
};

const ClearSelectionRow: TableBodyComponentType = ({
	instance,
	selectableRows,
	translations,
}) => {
	const { canDrag } = useContext(FilterContext);

	const {
		headers,
		page,
		rows,
		state: { selectedRowIds },
	} = instance;

	const shouldShowCheckbox = selectableRows !== "none";
	const selectedRowCount = Object.keys(selectedRowIds).length;

	const columnsLength = useMemo(() => {
		const checkboxColumns = shouldShowCheckbox ? 1 : 0;
		const dragColumn = canDrag ? 1 : 0;

		return headers.length + checkboxColumns + dragColumn;
	}, [canDrag, headers.length, shouldShowCheckbox]);

	const [allPageEnabledRowsSelected, allTableEnabledRowsAreSelected] =
		useMemo(() => {
			const enabledPageRows = page
				.filter((row) => !row.original.disabled)
				.map((row) => row.original);
			const allPageEnabledRowsSelectedMemo =
				enabledPageRows.length &&
				enabledPageRows.every((row) => selectedRowIds[row.id]);

			const enabledTableRows = rows.filter((row) => !row.original.disabled);
			const enabledTableRowCount = enabledTableRows.length;
			const enabledTableRowsSelected =
				enabledTableRowCount &&
				enabledTableRows.every((row) => selectedRowIds[row.id]);

			return [allPageEnabledRowsSelectedMemo, enabledTableRowsSelected];
		}, [page, rows, selectedRowIds]);

	const selectionButton = useMemo(() => {
		if (allTableEnabledRowsAreSelected) {
			return (
				<>
					<span>
						{translations.allSelected} ({selectedRowCount})
						<ClearButton
							onClick={() => toggleEnabledTableRows(instance, false)}
						>
							{translations.clearSelection}
						</ClearButton>
					</span>
				</>
			);
		}

		if (!allTableEnabledRowsAreSelected && allPageEnabledRowsSelected) {
			return (
				<>
					<span>
						{translations.pageSelected} ({selectedRowCount})
						<ClearButton onClick={() => toggleEnabledTableRows(instance, true)}>
							{translations.selectAll}
						</ClearButton>
					</span>
				</>
			);
		}

		return (
			<>
				<span>
					{translations.someItemsSelected} ({selectedRowCount})
					<ClearButton onClick={() => toggleEnabledTableRows(instance, true)}>
						{translations.selectAll}
					</ClearButton>
				</span>
			</>
		);
	}, [
		instance,
		translations,
		selectedRowCount,
		allTableEnabledRowsAreSelected,
		allPageEnabledRowsSelected,
	]);

	// if no rows are selected, return
	if (selectedRowCount === 0) return undefined;

	return (
		<tr className="clear-row">
			<td colSpan={columnsLength}>{selectionButton}</td>
		</tr>
	);
};

const ClearButton: FC<{ onClick: () => void; children: ReactNode }> = ({
	onClick,
	children,
}) => {
	return (
		<button
			type="button"
			className="neo-btn-tertiary neo-btn-tertiary--default neo-table-link-btn"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

const TableDataRows: TableBodyComponentType = ({
	handleRowToggled = () => null,
	instance,
	selectableRows,
}) => {
	const {
		page,
		prepareRow,
		toggleRowSelected,
		toggleAllRowsSelected,
		state: { selectedRowIds },
	} = instance;

	const { canDrag } = useContext(FilterContext);
	logger.debug("selectedRowIds", selectedRowIds);

	// biome-ignore lint/suspicious/noExplicitAny: I (Joe) don't know how to get the `T` type to work here
	const handleRowToggledInternal = (row: Row<any>) => {
		const previouslySelectedRows = Object.keys(selectedRowIds);
		const userIsDeselectingRow = Object.keys(selectedRowIds).includes(row.id);
		const newlySelectedRowIds = userIsDeselectingRow
			? previouslySelectedRows.filter((id) => id !== row.id)
			: [...previouslySelectedRows, row.id];

		if (selectableRows === "single") {
			toggleAllRowsSelected(false); // set all rows `selected = false`
		}

		if (selectableRows !== "none") {
			toggleRowSelected(row.id);

			if (handleRowToggled) {
				handleRowToggled(newlySelectedRowIds, row.original);
			}
		}
	};

	const shouldShowCheckbox = selectableRows !== "none";

	// biome-ignore lint/suspicious/noExplicitAny: quick fix, TODO: set `any` to `T`
	const createCheckboxTd = (row: Row<any>) => {
		const checkboxLabel = row.original.label || row.id;

		return shouldShowCheckbox ? (
			<Checkbox
				checked={row.isSelected}
				aria-label={checkboxLabel}
				disabled={row.original.disabled}
				onChange={() => handleRowToggledInternal(row)}
				value={row.id}
			/>
		) : null;
	};

	return page.map((row) => {
		prepareRow(row);
		const checkboxTd = createCheckboxTd(row);
		const key = row.original.id;

		return canDrag ? (
			<DraggableTableRow key={key} row={row} checkboxTd={checkboxTd} />
		) : (
			<StaticTableRow
				key={key}
				row={row}
				checkboxTd={checkboxTd}
				showDragHandle={false}
			/>
		);
	});
};
