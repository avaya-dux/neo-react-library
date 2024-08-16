import clsx from "clsx";
import type { Row } from "react-table";
import { DragHandle } from "./DragHandle";

export const StaticTableRow = <T extends Record<string, unknown>>({
	row,
	checkboxTd,
	showDragHandle,
}: {
	row: Row<T>;
	checkboxTd: JSX.Element | null;
	showDragHandle: boolean;
}) => {
	const cellCount =
		row.cells.length + (showDragHandle ? 1 : 0) + (checkboxTd ? 1 : 0);

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
				{checkboxTd && (
					<td style={{ padding: "0px 0px 0px 5px", width: "60px" }}>
						{checkboxTd}
					</td>
				)}
				{row.cells.map((cell) => {
					const { key, ...restCellProps } = cell.getCellProps();
					return (
						<td key={key} {...restCellProps}>
							<span>{cell.render("Cell")}</span>
						</td>
					);
				})}
			</tr>
			{row.isExpanded ? (
				<tr>
					<td colSpan={cellCount}>inset table</td>
				</tr>
			) : null}
		</tbody>
	);
};
