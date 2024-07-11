import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import type { Row } from "react-table";

import { Checkbox } from "components/Checkbox";

import type { TableBodyProps } from "../types";

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
	translations,
}) => {
	const { getTableBodyProps, headers, page } = instance;

	return (
		<tbody {...getTableBodyProps()}>
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
		</tbody>
	);
};

const ClearSelectionRow: TableBodyComponentType = ({
	instance,
	selectableRows,
	translations,
}) => {
	const {
		headers,
		page,
		rows,
		toggleAllRowsSelected,
		state: { selectedRowIds },
	} = instance;
	const shouldShowCheckbox = selectableRows !== "none";
	const columnsLength = headers.length + (shouldShowCheckbox ? 1 : 0);
	const selectedRowCount = Object.keys(selectedRowIds).length;

	// if no rows are selected, return early
	if (selectedRowCount === 0) return undefined;

	const allPageRowsAreSelected = useMemo(() => {
		const shownRows = page.map((row) => row.original);
		const visibleRowsSelected = shownRows.every(
			(row) => selectedRowIds[row.id],
		);

		return visibleRowsSelected;
	}, [page, selectedRowIds]);

	const selectionButton = useMemo(() => {
		const allTableRowsAreSelected =
			rows.length === 0 ? false : selectedRowCount === rows.length;

		if (allTableRowsAreSelected) {
			return (
				<>
					<span>
						{translations.allSelected} ({selectedRowCount})
						<ClearButton onClick={() => toggleAllRowsSelected(false)}>
							{translations.clearSelection}
						</ClearButton>
					</span>
				</>
			);
		}

		if (!allTableRowsAreSelected && allPageRowsAreSelected) {
			return (
				<>
					<span>
						{translations.pageSelected} ({selectedRowCount})
						<ClearButton onClick={() => toggleAllRowsSelected(true)}>
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
					<ClearButton onClick={() => toggleAllRowsSelected(true)}>
						{translations.selectAll}
					</ClearButton>
				</span>
			</>
		);
	}, [
		translations,
		rows,
		selectedRowCount,
		allPageRowsAreSelected,
		toggleAllRowsSelected,
	]);

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

	return page.map((row) => {
		prepareRow(row);
		const preparedRowProps = row.getRowProps();
		const checkboxLabel = row.original.label || row.id;

		return (
			<tr
				role={preparedRowProps.role}
				style={preparedRowProps.style}
				key={preparedRowProps.key || `table-row-${row.id}`}
				className={clsx(row.isSelected && "active", preparedRowProps.className)}
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
	});
};
