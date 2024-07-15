import clsx from "clsx";
import type { Row } from "react-table";
import { DragHandle } from "./DragHandle";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const StaticTableRow = <T extends Record<string, any>>({
	row,
	checkboxTd,
	showDragHandle,
}: {
	row: Row<T>;
	checkboxTd: JSX.Element | null;
	showDragHandle: boolean;
}) => {
	return (
		<tr
			{...row.getRowProps()}
			className={clsx(showDragHandle && "neo-set-keyboard-focus")}
		>
			{showDragHandle && (
				<td className="neo-table__dnd-td">
					<DragHandle />
				</td>
			)}
			{checkboxTd && (
				<td style={{ padding: "0px 0px 0px 5px" }}>{checkboxTd}</td>
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
	);
};
