import { useEffect } from "react";

import clsx from "clsx";
import { IconButton } from "components";
import log from "loglevel";
import type { AnyRecord, IFilterContext } from "../types";

const logger = log.getLogger("helpers/row-helper");
logger.disableAll();
export { logger as rowHelperLogger };

type RowHelperProps = {
	checkboxTd: React.ReactNode;
	hasInsetTable?: boolean;
	row: AnyRecord;
};

export const renderCheckboxAndExpand = ({
	checkboxTd,
	hasInsetTable,
	row,
}: RowHelperProps) => {
	if (!checkboxTd && !hasInsetTable) return null;

	return (
		<td className={clsx("checkbox-andor-expand", !checkboxTd && "narrow")}>
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
	);
};

type RenderExtendedRowProps = {
	row: AnyRecord;
	cellCount: number;
} & Pick<IFilterContext, "renderInsetTable">;

export const renderExtendedRow = ({
	row,
	cellCount,
	renderInsetTable,
}: RenderExtendedRowProps) => {
	if (!row.isExpanded) return null;
	logger.debug({ id: row.id, isExpanded: row.isExpanded, cellCount });
	return (
		<tr className={clsx("neo-table__inset", `extended-row-${row.id}`)}>
			<td colSpan={cellCount}>
				{renderInsetTable ? renderInsetTable(row) : null}
			</td>
		</tr>
	);
};

export const useResizerHeight = (rowId: string) => {
	useEffect(
		() => {
			const resizer = document.querySelector(`.resizer-${rowId}`);
			if (!resizer) {
				logger.debug("No resizer found");
				return;
			}
			const parentRow = document.querySelector(`.parent-row-${rowId}`);
			const extendedRow = document.querySelector(`.extended-row-${rowId}`);

			const parentRowHeight = (parentRow as HTMLElement).offsetHeight;
			if (extendedRow === null) {
				logger.info("No extended row found", rowId);
			}
			const extendedRowHeight = extendedRow
				? (extendedRow as HTMLElement).offsetHeight
				: 2;
			const totalHeight = parentRowHeight + extendedRowHeight;
			logger.debug({ rowId, parentRowHeight, extendedRowHeight, totalHeight });
			(resizer as HTMLElement).style.height = `${totalHeight}px`;
		},
		// update heights in every render since row height can change while resizing
	);
};
