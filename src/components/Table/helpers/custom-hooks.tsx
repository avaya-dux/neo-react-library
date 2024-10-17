import log from "loglevel";
import { useEffect, useRef, useState } from "react";
import type { Column } from "react-table";
import type { AnyRecord } from "../types";

const logger = log.getLogger("table-useFullTableWidth");
logger.enableAll();
export { logger as useFullTableWidthLogger };

export const useFullTableWidth = <T extends AnyRecord>(
	originalColumns: readonly Column<T>[],
) => {
	const [columns, setColumns] = useState(originalColumns);
	const tableRef = useRef<HTMLTableElement>(null);

	useEffect(() => {
		if (tableRef.current) {
			const parentWidth = tableRef.current.offsetWidth;
			// exclude columns with width defined or not visible
			const excludedColumns = originalColumns.filter((column) => {
				if (column.width) {
					logger.debug("column width defined", column.width, column.accessor);
				}
				if (column.show === false) {
					logger.debug("column not visible", column.width, column.accessor);
				}
				return column.width || column.show === false;
			});

			const numberOfIncludedColumns =
				originalColumns.length - excludedColumns.length;
			if (numberOfIncludedColumns === 0) {
				logger.warn("No columns to calculate width for");
				return;
			}
			const columnWidth = parentWidth / numberOfIncludedColumns;
			logger.debug(
				JSON.stringify({
					columnWidth,
					parentWidth,
					numberOfIncludedColumns,
					totalColumns: originalColumns.length,
				}),
			);
			const adjustedColumns = originalColumns.map((column) => {
				if (column.width === undefined && !column.show) {
					return { ...column, width: columnWidth };
				}
				return column;
			});
			setColumns(adjustedColumns);
		}
	}, [originalColumns]);

	return { columns, tableRef };
};
