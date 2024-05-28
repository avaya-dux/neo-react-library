import clsx from "clsx";
import type { Row } from "react-table";

import { Checkbox } from "components/Checkbox";

import type { TableBodyProps } from "../types";

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
		page,
		prepareRow,
		toggleRowSelected,
		toggleAllRowsSelected,
		state: { selectedRowIds },
	} = instance;

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

	return (
		<tbody {...getTableBodyProps()}>
			{page.length === 0 ? (
				<tr>
					<td colSpan={headers.length}>{translations.noDataAvailable}</td>
				</tr>
			) : (
				page.map((row) => {
					prepareRow(row);
					const preparedRowProps = row.getRowProps();
					const checkboxLabel = row.original.label || row.id;

					return (
						<tr
							role={preparedRowProps.role}
							style={preparedRowProps.style}
							key={preparedRowProps.key || `table-row-${row.id}`}
							className={clsx(
								row.isSelected && "active",
								preparedRowProps.className,
							)}
						>
							{shouldShowCheckbox && (
								<td style={{ padding: "0 0 0 5px" }}>
									<Checkbox
										checked={row.isSelected}
										aria-label={checkboxLabel}
										onChange={() => handleRowToggledInternal(row)}
										value={row.id}
									/>
								</td>
							)}

							{row.cells.map((cell, i) => (
								<td {...cell.getCellProps()} key={`td-${i}`}>
									{cell.render("Cell")}
								</td>
							))}
						</tr>
					);
				})
			)}
		</tbody>
	);
};
