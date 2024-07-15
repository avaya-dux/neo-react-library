import type { Row } from "react-table";
import { DraggableTableRow } from "../DraggableTableRow";
import type { TableBodyProps } from "../types";
import { Checkbox } from "components";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import log from "loglevel";
import { useContext } from "react";
import { FilterContext } from "../helpers";
import { StaticTableRow } from "../StaticTableRow";
export const logger = log.getLogger("TableComponents/TableBody");
logger.enableAll();
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
// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export const TableBody = <T extends Record<string, any>>({
	handleRowToggled = () => null,
	instance,
	selectableRows,
	translations,
}: TableBodyProps<T>) => {
	const {
		getTableBodyProps,
		headers,
		rows: items,
		page,
		prepareRow,
		toggleRowSelected,
		toggleAllRowsSelected,
		state: { selectedRowIds },
	} = instance;

	const { canDrag } = useContext(FilterContext);
	logger.debug("selectedRowIds", selectedRowIds);

	const handleRowToggledInternal = (row: Row<T>) => {
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

	const createCheckboxTd = (row: Row<T>) => {
		const checkboxLabel = row.original.label || row.id;
		return shouldShowCheckbox ? (
			<Checkbox
				checked={row.isSelected}
				aria-label={checkboxLabel}
				onChange={() => handleRowToggledInternal(row)}
				value={row.id}
			/>
		) : null;
	};
	return (
		<tbody {...getTableBodyProps()}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{page.length === 0 ? (
					<tr>
						<td colSpan={headers.length}>{translations.noDataAvailable}</td>
					</tr>
				) : (
					page.map((row) => {
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
					})
				)}
			</SortableContext>
		</tbody>
	);
};
