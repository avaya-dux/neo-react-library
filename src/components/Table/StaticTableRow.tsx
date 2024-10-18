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
	const {
		hasInsetTable,
		renderInsetTable,
		resizableColumns,
		tableWidth,
		lastColumnWidthRef,
	} = useContext(FilterContext);

	// count dynamic columns
	const cellCount =
		row.cells.length +
		(showDragHandle ? 1 : 0) +
		(checkboxTd || hasInsetTable ? 1 : 0);
	const { key: _, style, ...restProps } = row.getRowProps();

	const { parentRowRef, resizerRef } = useResizerHeight(row);

	return (
		<tbody
			ref={parentRowRef}
			className={clsx(
				showDragHandle && "neo-set-keyboard-focus",
				row.original.disabled ? "disabled" : undefined,
			)}
		>
			<tr {...restProps} style={{ ...style, width: tableWidth }}>
				{showDragHandle && (
					<td className="neo-table__dnd-td">
						<DragHandle />
					</td>
				)}
				{renderCheckboxAndExpand({ checkboxTd, hasInsetTable, row })}
				{row.cells.map((cell, index) => {
					const { key, style, ...restCellProps } = cell.getCellProps();
					const isLastIndex = row.cells.length - 1 === index;
					const modifiedStyle = {
						...style,
						...(isLastIndex
							? { width: `${lastColumnWidthRef.current}px` }
							: {}),
					};
					return (
						<td
							key={key}
							{...restCellProps}
							style={modifiedStyle}
							className={cell.column.isResizing ? "neo-table--resizing" : ""}
						>
							<span>{cell.render("Cell")}</span>
							{resizableColumns &&
								cell.column.canResize &&
								cell.column.isResizing &&
								!isLastIndex && (
									<div
										ref={resizerRef}
										className={clsx(
											"neo-table__resizer__td",
											"neo-table--resizing",
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
