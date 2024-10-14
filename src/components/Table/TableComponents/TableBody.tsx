import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import log from "loglevel";
import { useContext } from "react";

import { Checkbox } from "components";

import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import type { Row } from "react-table";
import { DraggableTableRow } from "../DraggableTableRow";
import { StaticTableRow } from "../StaticTableRow";
import { FilterContext } from "../helpers";
import type { TableBodyProps } from "../types";
const logger = log.getLogger("TableComponents/TableBody");
logger.disableAll();
export { logger as tableBodyLogger };

import { setTableRowsSelected } from "../helpers";

import "./TableBody_shim.css";

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
	showRowSelectionHelper,
	translations,
}) => {
	const { getTableBodyProps, headers, page, rows } = instance;
	const shouldHaveCheckboxColumn = selectableRows !== "none";
	const { draggableRows } = useContext(FilterContext);
	const numberOfColumns =
		headers.length +
		(shouldHaveCheckboxColumn ? 1 : 0) +
		(draggableRows ? 1 : 0);
	return (
		<SortableContext
			items={rows}
			strategy={verticalListSortingStrategy}
			{...getTableBodyProps()}
		>
			{page.length === 0 ? (
				<tbody>
					<tr>
						<td colSpan={numberOfColumns}>{translations.noDataAvailable}</td>
					</tr>
				</tbody>
			) : (
				<>
					{showRowSelectionHelper && (
						<ClearSelectionRow
							handleRowToggled={handleRowToggled}
							instance={instance}
							selectableRows={selectableRows}
							translations={translations}
						/>
					)}

					<TableDataRows
						handleRowToggled={handleRowToggled}
						instance={instance}
						selectableRows={selectableRows}
						translations={translations}
					/>
				</>
			)}
		</SortableContext>
	);
};

const ClearSelectionRow: TableBodyComponentType = ({
	handleRowToggled,
	instance,
	selectableRows,
	translations,
}) => {
	const { draggableRows, hasInsetTable } = useContext(FilterContext);

	const {
		headers,
		rows,
		state: { selectedRowIds },
	} = instance;

	const shouldShowCheckbox = selectableRows !== "none";
	const selectedRowCount = Object.keys(selectedRowIds).length;

	const columnsLength = useMemo(() => {
		const checkboxColumns = shouldShowCheckbox || hasInsetTable ? 1 : 0;
		const dragColumn = draggableRows ? 1 : 0;

		return headers.length + checkboxColumns + dragColumn;
	}, [draggableRows, headers.length, shouldShowCheckbox, hasInsetTable]);

	const allTableEnabledRowsAreSelected = useMemo(() => {
		const enabledTableRows = rows.filter((row) => !row.original.disabled);
		const enabledTableRowCount = enabledTableRows.length;
		const enabledTableRowsSelected =
			enabledTableRowCount &&
			enabledTableRows.every((row) => selectedRowIds[row.id]);

		return enabledTableRowsSelected;
	}, [rows, selectedRowIds]);

	const selectionButton = useMemo(() => {
		return (
			<>
				<span>
					{translations.itemsSelected} ({selectedRowCount}).
					<ClearButton
						onClick={() =>
							setTableRowsSelected(
								instance,
								!allTableEnabledRowsAreSelected,
								handleRowToggled,
							)
						}
					>
						{allTableEnabledRowsAreSelected
							? translations.clearAll
							: translations.selectAll}
					</ClearButton>{" "}
					({rows.length}).
				</span>
			</>
		);
	}, [
		instance,
		translations,
		selectedRowCount,
		allTableEnabledRowsAreSelected,
		rows.length,
		handleRowToggled,
	]);

	// if no rows are selected, return
	if (selectedRowCount === 0) return undefined;

	return (
		<tbody>
			<tr className="clear-row">
				<td colSpan={columnsLength}>{selectionButton}</td>
			</tr>
		</tbody>
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

	const { draggableRows } = useContext(FilterContext);
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

		return draggableRows ? (
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
