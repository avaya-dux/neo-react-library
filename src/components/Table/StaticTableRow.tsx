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
	const { key: _, ...restProps } = row.getRowProps();
	return (
		<tbody>
			<tr
				{...restProps}
				className={clsx(
					showDragHandle && "neo-set-keyboard-focus",
					row.original.disabled ? "disabled" : undefined,
				)}
			>
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
			<tr>
				<td colSpan={row.cells.length}>inset table</td>
			</tr>{" "}
		</tbody>
	);
};
