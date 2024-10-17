import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import log from "loglevel";
import { useContext } from "react";
import type { Row } from "react-table";
import { DragHandle } from "./DragHandle";
import {
	FilterContext,
	renderCheckboxAndExpand,
	renderExtendedRow,
	useResizerHeight,
} from "./helpers";
const logger = log.getLogger("TableComponents/DraggableTableRow");
logger.disableAll();
export { logger as draggableTableRowLogger };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const DraggableTableRow = <T extends Record<string, any>>({
	row,
	checkboxTd,
}: { row: Row<T>; checkboxTd: JSX.Element | null }) => {
	const {
		attributes,
		listeners,
		transform,
		transition,
		setNodeRef,
		setActivatorNodeRef,
		isDragging,
	} = useSortable({
		id: row.original.id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
	};

	const preparedRowProps = row.getRowProps();
	logger.debug("row.isSelected", row.isSelected);

	const {
		hasInsetTable,
		renderInsetTable,
		resizableColumns,
		tableWidth,
		lastColumnWidth,
	} = useContext(FilterContext);

	// count dynamic columns
	const cellCount =
		row.cells.length + 1 + (checkboxTd || hasInsetTable ? 1 : 0);

	const { parentRowRef, resizerRef } = useResizerHeight(row);

	return (
		<tbody
			ref={(node) => {
				setNodeRef(node);
				parentRowRef.current = node;
			}}
			style={{ ...style }}
			className={clsx(isDragging && "neo-table__tbody--dragging")}
		>
			<tr
				role={preparedRowProps.role}
				style={{ ...preparedRowProps.style, width: tableWidth }}
				key={preparedRowProps.key || `table-row-${row.id}`}
				className={clsx(
					`parent-row-${row.id}`,
					row.isSelected && "active",
					preparedRowProps.className,
					row.original.disabled && "disabled",
				)}
				tabIndex={0}
			>
				<td className="neo-table__dnd-td">
					<DragHandle
						ref={setActivatorNodeRef}
						{...attributes}
						{...listeners}
					/>
				</td>
				{renderCheckboxAndExpand({ checkboxTd, hasInsetTable, row })}

				{row.cells.map((cell, index) => {
					const { key, style, ...restCellProps } = cell.getCellProps();
					const isLastIndex = row.cells.length - 1 === index;
					const modifiedStyle = {
						...style,
						...(isLastIndex ? { width: `${lastColumnWidth}px` } : {}),
					};
					return (
						<td
							key={key}
							{...restCellProps}
							style={modifiedStyle}
							className={cell.column.isResizing ? "neo-table--resizing" : ""}
						>
							{cell.render("Cell")}

							{resizableColumns &&
								cell.column.canResize &&
								cell.column.isResizing &&
								!isLastIndex && (
									<div
										ref={(node) => {
											resizerRef.current = node;
										}}
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
			{renderExtendedRow({
				row,
				cellCount,
				renderInsetTable,
			})}
		</tbody>
	);
};
