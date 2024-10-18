import log from "loglevel";
import { useLayoutEffect, useRef, useState } from "react";
import type { Column } from "react-table";
import type { AnyRecord } from "../types";

const logger = log.getLogger("table-useFullTableWidth");
logger.disableAll();
export { logger as useFullTableWidthLogger };

export const useFullTableWidth = <T extends AnyRecord>(
	originalColumns: readonly Column<T>[],
) => {
	const [columns, setColumns] = useState(originalColumns);
	const tableRef = useRef<HTMLTableElement | null>(null);
	const [tableWidth, setTableWidth] = useState(800);

	const [hiddenColumns, setHiddenColumns] = useState<string[]>();

	useLayoutEffect(() => {
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

	useLayoutEffect(() => {
		logger.debug("update column width", tableWidth, hiddenColumns);
		if (tableWidth === 0) {
			logger.warn("tableWidth is 0");
			return;
		}
		let availableTotalWidth = tableWidth;
		const excludedColumns = originalColumns.filter((column) => {
			// user determined what columns are hidden
			if (hiddenColumns !== undefined) {
				logger.debug(
					"hiddenColumns defined, column",
					column.id,
					column.accessor,
					column.width,
				);
				if (
					column.accessor &&
					hiddenColumns.includes(column.accessor as unknown as string)
				) {
					logger.debug("column hidden", column.id);
					return true;
				}
				if (column.width) {
					logger.debug(
						"column width defined and not hidden by user",
						column.width,
						column.accessor,
					);
					if (typeof column.width === "number") {
						availableTotalWidth -= column.width;
					}
					return true;
				}
				return false;
			}
			// initial render
			if (column.width) {
				logger.debug(
					"column width defined initially",
					column.width,
					column.accessor,
				);
				if (typeof column.width === "number") {
					availableTotalWidth -= column.width;
				}
				return true;
			}
			if (column.show === false) {
				logger.debug(
					"column not visible initially",
					column.width,
					column.accessor,
				);
				return true;
			}
			return false;
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
			logger.debug(
				"adjustColumns:",
				column.accessor,
				column.width,
				column.show,
			);
			// user determined what columns are hidden
			if (hiddenColumns !== undefined) {
				if (
					column.accessor &&
					hiddenColumns.includes(column.accessor as unknown as string)
				) {
					logger.debug("column hidden in filter", column.id);
					return { ...column, show: false };
				}

				if (column.width === undefined) {
					return { ...column, width: columnWidth };
				}
				return { ...column };
			}
			// initial render
			if (
				column.width === undefined &&
				(column.show || column.show === undefined)
			) {
				return { ...column, width: columnWidth };
			}
			return { ...column };
		});
		logger.debug("adjustedColumns length:", adjustedColumns.length);
		setColumns(adjustedColumns);
	}, [originalColumns, tableWidth, hiddenColumns]);

	return { columns, tableRef, tableWidth, setHiddenColumns };
};
