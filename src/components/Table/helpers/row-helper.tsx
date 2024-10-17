import { useEffect, useRef, useState } from "react";

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
	return (
		<tr className="neo-table__inset">
			<td colSpan={cellCount}>
				{renderInsetTable ? renderInsetTable(row) : null}
			</td>
		</tr>
	);
};

export const useResizerHeight = (row: AnyRecord) => {
	const parentRowRef = useRef<HTMLTableSectionElement | null>(null);
	const resizerRef = useRef<HTMLDivElement | null>(null);

	const [rowHeight, setRowHeight] = useState(0);

	useEffect(() => {
		if (parentRowRef.current) {
			logger.debug(row.id, parentRowRef.current.offsetHeight);
			setRowHeight(parentRowRef.current.offsetHeight);
		}
	});

	useEffect(() => {
		if (resizerRef.current) {
			resizerRef.current.style.height = `${rowHeight}px`;
		}
		if (
			logger.getLevel() <= log.levels.DEBUG &&
			parentRowRef.current &&
			resizerRef.current
		) {
			const parentRect = parentRowRef.current.getBoundingClientRect();
			const resizerRect = resizerRef.current.getBoundingClientRect();

			const relativeTop = resizerRect.top - parentRect.top;
			const relativeRight = resizerRect.right - parentRect.right;
			const relativeLeft = resizerRect.left - parentRect.left;
			const relativeHeight = resizerRect.height;

			logger.debug("Resizer element relative properties:", {
				top: relativeTop,
				right: relativeRight,
				left: relativeLeft,
				height: relativeHeight,
			});
		}
	});
	return { parentRowRef, resizerRef };
};
