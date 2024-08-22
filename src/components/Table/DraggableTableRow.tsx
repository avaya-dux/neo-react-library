import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import type { Row } from "react-table";
import { DragHandle } from "./DragHandle";

import { IconButton } from "components";
import log from "loglevel";
import { useContext } from "react";
import { FilterContext } from "./helpers";
export const logger = log.getLogger("TableComponents/DraggableTableRow");
logger.disableAll();

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

	const { hasInsetTable, renderInsetTable } = useContext(FilterContext);

	// count dynamic columns
	const cellCount =
		row.cells.length + 1 + (checkboxTd ? 1 : 0) + (hasInsetTable ? 1 : 0);

	return (
		<tbody
			ref={setNodeRef}
			style={{ ...style }}
			className={clsx(isDragging && "neo-table__tbody--dragging")}
		>
			<tr
				role={preparedRowProps.role}
				style={{ ...preparedRowProps.style }}
				key={preparedRowProps.key || `table-row-${row.id}`}
				className={clsx(
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
				{checkboxTd && (
					<td style={{ padding: "0px 0px 0px 5px" }}>{checkboxTd}</td>
				)}
				{hasInsetTable && (
					<td className="neo-table__td-inset">
						<IconButton
							icon={row.isExpanded ? "chevron-down" : "chevron-right"}
							size="compact"
							iconSize="sm"
							status="event"
							aria-label={row.isExpanded ? "expand" : "collapse"}
							className="td-icon--expand"
							{...row.getToggleRowExpandedProps({})}
						/>
					</td>
				)}
				{row.cells.map((cell) => {
					const { key, ...restCellProps } = cell.getCellProps();
					return (
						<td {...restCellProps} key={key}>
							{cell.render("Cell")}
						</td>
					);
				})}
			</tr>
			{row.isExpanded ? (
				<tr>
					<td colSpan={cellCount}>
						{renderInsetTable ? renderInsetTable(row) : null}
					</td>
				</tr>
			) : null}
		</tbody>
	);
};
