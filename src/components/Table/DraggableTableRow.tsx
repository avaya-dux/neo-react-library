import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import styled from "styled-components";
import type { Row } from "react-table";
import clsx from "clsx";

import log from "loglevel";
export const logger = log.getLogger("TableComponents/DraggableTableRow");
logger.enableAll();

const DraggingRow = styled.td`
  background: rgba(127, 207, 250, 0.3);
`;

const TableData = styled.td`

`;

const FirstTd = styled.td`
  &:first-of-type {
    min-width: 20ch;
    display: flex;
    width: 2rem;
    align-items: center;
  }
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

	// add 1 if draggable or checkbox is present
	const cellCount = row.cells.length + 1;

	return (
		<tr
			ref={setNodeRef}
			role={preparedRowProps.role}
			style={{ ...style, ...preparedRowProps.style }}
			key={preparedRowProps.key || `table-row-${row.id}`}
			className={clsx(row.isSelected && "active", preparedRowProps.className)}
		>
			{isDragging ? (
				<DraggingRow colSpan={cellCount}>&nbsp;</DraggingRow>
			) : (
				<>
					<FirstTd>
						<DragHandle {...attributes} {...listeners} />
						{checkboxTd}
					</FirstTd>

					{row.cells.map((cell) => {
						const { key, ...restCellProps } = cell.getCellProps();
						return (
							<TableData {...restCellProps} key={key}>
								{cell.render("Cell")}
							</TableData>
						);
					})}
				</>
			)}
		</tr>
	);
};
