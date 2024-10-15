import clsx from "clsx";
import { IconButton } from "components";
import { useContext } from "react";
import type { Row } from "react-table";
import { DragHandle } from "./DragHandle";
import { FilterContext } from "./helpers";

export const StaticTableRow = <T extends Record<string, unknown>>({
	row,
	checkboxTd,
	showDragHandle,
}: {
	row: Row<T>;
	checkboxTd: JSX.Element | null;
	showDragHandle: boolean;
}) => {
	const { hasInsetTable, renderInsetTable } = useContext(FilterContext);

	// count dynamic columns
	const cellCount =
		row.cells.length +
		(showDragHandle ? 1 : 0) +
		(checkboxTd || hasInsetTable ? 1 : 0);
	const { key: _, ...restProps } = row.getRowProps();
	return (
		<tbody
			className={clsx(
				showDragHandle && "neo-set-keyboard-focus",
				row.original.disabled ? "disabled" : undefined,
			)}
		>
			<tr {...restProps}>
				{showDragHandle && (
					<td className="neo-table__dnd-td">
						<DragHandle />
					</td>
				)}
				{(checkboxTd || hasInsetTable) && (
					<td
						className={clsx("checkbox-andor-expand", !checkboxTd && "narrow")}
					>
						<div>
							{checkboxTd}
							{hasInsetTable && (
								<IconButton
									icon={row.isExpanded ? "chevron-down" : "chevron-right"}
									size="compact"
									iconSize="sm"
									status="event"
									aria-label={row.isExpanded ? "expand" : "collapse"}
									className="td-icon--expand"
									{...row.getToggleRowExpandedProps({})}
								/>
							)}
						</div>
					</td>
				)}

				{row.cells.map((cell) => {
					const { key, ...restCellProps } = cell.getCellProps();
					return (
						<td
							key={key}
							{...restCellProps}
							className={cell.column.isResizing ? "neo-table--resizing" : ""}
						>
							<span>{cell.render("Cell")}</span>
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
