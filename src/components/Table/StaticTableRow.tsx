import styled from "styled-components";
import type { Row } from "react-table";
import { DragHandle } from "./DragHandle";

const FirstTd = styled.td`
  &:first-of-type {
    min-width: 20ch;
    display: flex;
    width: 2rem;
    align-items: center;
  }
`;
const StyledStaticData = styled.td`
`;

const StyledStaticTableRow = styled.tr`
`;

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
		<StyledStaticTableRow {...row.getRowProps()}>
			{(checkboxTd || showDragHandle) && (
				<FirstTd>
					{showDragHandle && <DragHandle />}
					{checkboxTd}
				</FirstTd>
			)}
			{row.cells.map((cell) => {
				const { key, ...restCellProps } = cell.getCellProps();
				return (
					<StyledStaticData key={key} {...restCellProps}>
						<span>{cell.render("Cell")}</span>
					</StyledStaticData>
				);
			})}
		</StyledStaticTableRow>
	);
};
