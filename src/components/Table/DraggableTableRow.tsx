import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import type { Row } from "react-table";
import styled from "styled-components";
import { DragHandle } from "./DragHandle";

import log from "loglevel";
export const logger = log.getLogger("TableComponents/DraggableTableRow");
logger.disableAll();

const EmptyRow = styled.td`
  background: var(--neo-color-blue-500);
`;

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

	// + handle and checkbox columns
	const cellCount = row.cells.length + 1 + (checkboxTd ? 1 : 0);

	return (
		<tbody ref={setNodeRef}>
			<tr
				role={preparedRowProps.role}
				style={{ ...style, ...preparedRowProps.style }}
				key={preparedRowProps.key || `table-row-${row.id}`}
				className={clsx(
					row.isSelected && "active",
					preparedRowProps.className,
					row.original.disabled && "disabled",
				)}
				tabIndex={0}
			>
				{isDragging ? (
					<EmptyRow colSpan={cellCount}>&nbsp;</EmptyRow>
				) : (
					<>
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
						{row.cells.map((cell) => {
							const { key, ...restCellProps } = cell.getCellProps();
							return (
								<td {...restCellProps} key={key}>
									{cell.render("Cell")}
								</td>
							);
						})}
					</>
				)}
			</tr>
			<tr
				className={clsx(
					row.isSelected && "active",
					preparedRowProps.className,
					row.original.disabled && "disabled",
				)}
			>
				<td colSpan={cellCount}>inset table</td>
			</tr>
		</tbody>
	);
};
