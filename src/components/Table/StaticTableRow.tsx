import clsx from "clsx";
import { useContext } from "react";
import type { Row } from "react-table";
import { DragHandle } from "./DragHandle";
import {
	FilterContext,
	renderCheckboxAndExpand,
	renderExtendedRow,
	useResizerHeight,
} from "./helpers";

export const StaticTableRow = <T extends Record<string, unknown>>({
	row,
	checkboxTd,
	showDragHandle,
}: {
	row: Row<T>;
	checkboxTd: JSX.Element | null;
	showDragHandle: boolean;
}) => {
	const { hasInsetTable, renderInsetTable, resizableColumns } =
		useContext(FilterContext);

	// count dynamic columns
	const cellCount =
		row.cells.length +
		(showDragHandle ? 1 : 0) +
		(checkboxTd || hasInsetTable ? 1 : 0);
	const { key: _, ...restProps } = row.getRowProps();

	useResizerHeight(row.id, row.isExpanded);

	return (
		<tbody
			className={clsx(
				showDragHandle && "neo-set-keyboard-focus",
				row.original.disabled ? "disabled" : undefined,
			)}
		>
			<tr {...restProps} className={`parent-row-${row.id}`}>
				{showDragHandle && (
					<td className="neo-table__dnd-td">
						<DragHandle />
					</td>
				)}
				{renderCheckboxAndExpand({ checkboxTd, hasInsetTable, row })}
				{row.cells.map((cell) => {
					const { key, ...restCellProps } = cell.getCellProps();
					return (
						<td
							key={key}
							{...restCellProps}
							className={cell.column.isResizing ? "neo-table--resizing" : ""}
						>
							<span>{cell.render("Cell")}</span>
							{resizableColumns && cell.column.canResize && (
								<div
									className={clsx(
										"neo-table__resizer__td",
										cell.column.isResizing && "neo-table--resizing",
										`resizer-${row.id}`,
									)}
								/>
							)}
						</td>
					);
				})}
			</tr>
			{renderExtendedRow({ row, cellCount, renderInsetTable })}
		</tbody>
	);
};
