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
	const tableRef = useRef<HTMLTableElement | null>(null);
	const [tableWidth, setTableWidth] = useState(800);

	useEffect(() => {
		if (tableRef.current) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const newWidth = (entry.target as HTMLElement).offsetWidth;
					logger.debug("newWidth inside observer", newWidth);
					if (newWidth !== 0) {
						setTableWidth(newWidth);
					}
				}
			});

			resizeObserver.observe(tableRef.current);

			// Initial check in case the width is already non-zero
			const initialWidth = tableRef.current.offsetWidth;
			if (initialWidth !== 0) {
				setTableWidth(initialWidth);
			}
			return () => {
				resizeObserver.disconnect();
			};
		}
	}, []);

	useEffect(() => {
		logger.debug("update column width", tableWidth);
		if (tableWidth === 0) {
			logger.warn("tableWidth is 0");
			return;
		}
		let availableTotalWidth = tableWidth;
		const excludedColumns = originalColumns.filter((column) => {
			if (column.width) {
				logger.debug("column width defined", column.width, column.accessor);
				if (typeof column.width === "number") {
					availableTotalWidth -= column.width;
				}
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
		if (availableTotalWidth < 0) {
			logger.warn("availableTotalWidth is less than 0");
			return;
		}
		const columnWidth = availableTotalWidth / numberOfIncludedColumns;
		logger.debug(
			JSON.stringify({
				columnWidth,
				tableWidth,
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
	}, [originalColumns, tableWidth]);

	return { columns, tableRef, tableWidth };
};
