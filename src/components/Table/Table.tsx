import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	type UniqueIdentifier,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	type Row,
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from "react-table";
import { StaticTableRow } from "./StaticTableRow";

import { Pagination } from "components/Pagination";

import type { TableProps } from ".";
import { TableBody, TableHeader, TableToolbar } from "./TableComponents";
import {
	FilterContext,
	convertRowIdsArrayToObject,
	translations as defaultTranslations,
} from "./helpers";
import type { DataSyncOptionType, IFilterContext, RowHeight } from "./types";

import "./Table_shim.css";
import { Checkbox } from "components/Checkbox";
import log from "loglevel";
export const logger = log.getLogger("Table");
logger.disableAll();
/**
 * The Table is used to organize and display data within rows and columns.
 * It comes with built in pagination. The `id` column in data is required.
 *
 * @example
  const columns = [
    {
      Header: "name header",
      accessor: "name",
    },
    {
      Header: "other header",
      accessor: "other",
    },
  ];
  const [data, setData] = useState([
    { id: 1, name: "sir Fred", other: "Lorem Ipsum" },
    { id: 2, name: "sir Daniel", other: "Lorem Ipsum" },
    { id: 3, name: "madam Tif", other: "Lorem Ipsum" },
    { id: 4, name: "madam Hailey", other: "Lorem Ipsum" },
    { id: 5, name: "intersex Alex", other: "Lorem Ipsum" },
    { id: 6, name: "androgynous Skyler", other: "Lorem Ipsum" },
    { id: 7, name: <a href="#frank">fancy Frank</a>, other: "Lorem Ipsum" },
  ]);

  return (<Table
    columns={columns}
    data={data}
    handleRefresh={() => {
      callApi().then(updatedData => setData(updatedData));
    }}
  />);
 *
 * @see https://design.avayacloud.com/components/web/tables-web
 */
// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export const Table = <T extends Record<string, any>>({
	id,
	data: originalData,
	columns,
	caption,
	summary,
	itemsPerPageOptions,
	defaultSelectedRowIds,
	initialStatePageIndex = 0,
	initialStatePageSize,

	allowColumnFilter = false,
	containerClassName = "",
	customActionsNode,
	handleCreate,
	handleDelete,
	handleEdit,
	handleRefresh,
	handleChooseColumns,
	handleRowToggled,
	handlePageChange = () => null,
	readonly = false,
	rowHeight = "large",
	selectableRows = "none",
	manualPagination: overridePagination = false,
	manualRowCount = 0,
	pageCount: manualPageCount,
	showPagination = true,
	draggableRows = false,
	pushPaginationDown = false,
	showRowSeparator = false,
	showRowHeightMenu = true,
	showRowSelectionHelper = true,
	showSearch = true,
	itemDisplayTooltipPosition = "auto",
	itemsPerPageTooltipPosition = "auto",
	translations,

	...rest
}: TableProps<T>) => {
	const [rootLevelPageIndex, setRootLevelPageIndex] = useState(
		initialStatePageIndex,
	);
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	const [data, setData] = useState(originalData);
	const items = useMemo(() => data?.map(({ id }) => id), [data]);

	useEffect(() => {
		setData(originalData);
	}, [originalData]);

	const instance = useTable<T>(
		{
			columns,
			data,
			manualPagination: overridePagination,
			pageCount: overridePagination ? manualPageCount : -1,
			defaultColumn: {
				maxWidth: 300,
				minWidth: 30,
				width: "auto",
			},
			getRowId: (row: T) => row.id, // set the row id to be the passed data's id
			initialState: {
				pageSize: initialStatePageSize || itemsPerPageOptions?.[0] || 10,
				selectedRowIds: convertRowIdsArrayToObject(defaultSelectedRowIds || []),
				pageIndex: rootLevelPageIndex,
			},
			autoResetSelectedRows: false,
			autoResetSortBy: false,
			...rest,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
	);

	const {
		rows,
		getTableProps,
		state: { pageIndex, pageSize },
		gotoPage,
		setPageSize,
		prepareRow,
		pageCount,
	} = instance;
	const rowCount = overridePagination ? manualRowCount : rows.length;

	const [dataSyncOption, setDataSyncOption] =
		useState<DataSyncOptionType>("no");

	const memoizedRows = useMemo(
		() =>
			dataSyncOption === "clear"
				? originalData
				: rows.map(({ original }) => original),
		[rows, originalData, dataSyncOption],
	);

	logger.debug(
		"Table: originalData",
		originalData.map((row) => row.id),
	);
	logger.debug(
		"Table: data",
		data.map((row) => row.id),
	);
	logger.debug(
		"Table: memoizedRows",
		memoizedRows.map((row) => row.id),
	);
	useEffect(() => {
		if (!draggableRows) return;

		// compare data and memoizedRows by id field
		if (
			data?.length !== memoizedRows?.length ||
			!data?.every((row, i) => row.id === memoizedRows[i].id)
		) {
			if (dataSyncOption !== "no") {
				logger.debug("Table: data changed, updating...", dataSyncOption);
				setData(memoizedRows);
				setDataSyncOption("no");
			}
		}
	}, [data, memoizedRows, draggableRows, dataSyncOption]);

	// this `useEffect` handles the edge cases of page change logic
	useEffect(() => {
		if (pageCount === 0) return; // no table data, ignore (effectively memoizing `pageIndex`)

		// use-case: user deletes all rows on the last page while on the last page
		const currentPage = pageIndex + 1;
		if (currentPage > pageCount) {
			const finalPageIndex = Math.max(0, pageCount - 1); // index is 0-based
			gotoPage(finalPageIndex);
			setRootLevelPageIndex(finalPageIndex);
			handlePageChange(finalPageIndex, pageSize);
		}
	}, [pageSize, pageCount, pageIndex, gotoPage, handlePageChange]);

	const tableCaptionId = useMemo(
		() => `table-caption-${caption || "caption"}`,
		[caption],
	);
	const tableSummaryId = useMemo(
		() => `table-summary-${caption || "summary"}`,
		[caption],
	);

	const toolbarTranslations = useMemo(() => {
		return {
			...defaultTranslations.toolbar,
			...translations?.toolbar,
		};
	}, [translations]);

	const headerTranslations = useMemo(() => {
		return {
			...defaultTranslations.header,
			...translations?.header,
		};
	}, [translations]);

	const bodyTranslations = useMemo(() => {
		return {
			...defaultTranslations.body,
			...translations?.body,
		};
	}, [translations]);

	const paginationTranslations = useMemo(() => {
		return {
			...defaultTranslations.pagination,
			...translations?.pagination,
		};
	}, [translations]);

	const [filterSheetVisible, setFilterSheetVisible] = useState(false);
	const toggleFilterSheetVisible = () => setFilterSheetVisible((v) => !v);
	const [rowHeightValue, setRowHeightValue] = useState(rowHeight);

	useEffect(() => {
		setRowHeightValue(rowHeight);
	}, [rowHeight]);

	const onRowHeightChangeHandler = useCallback((newHeight: RowHeight) => {
		setRowHeightValue(newHeight);
	}, []);

	const clearSortByFuncRef = useRef<(() => void) | null>(null);

	const filterContext: IFilterContext = {
		allowColumnFilter,
		draggableRows,
		filterSheetVisible,
		setFilterSheetVisible,
		toggleFilterSheetVisible,
		dataSyncOption,
		setDataSyncOption,
		clearSortByFuncRef,
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragStart(event: DragStartEvent) {
		if (clearSortByFuncRef.current) {
			clearSortByFuncRef.current();
		}
		const { active } = event;
		logger.debug("Table: handleDragStart", active.id);
		setActiveId(active.id);
		setDataSyncOption("no");
		clearSortByFuncRef.current = null;
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		logger.debug("Table: handleDragEnd", active.id, over?.id);
		if (active.id !== over?.id) {
			setData((data) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over?.id);
				return arrayMove([...data], oldIndex, newIndex);
			});
		}

		setActiveId(null);
	}

	function handleDragCancel() {
		setActiveId(null);
	}

	const selectedRow = useMemo(() => {
		if (!activeId) {
			return null;
		}
		const row = rows.find(({ original }) => original.id === activeId);
		row && prepareRow(row);
		return row;
	}, [activeId, rows, prepareRow]);

	const shouldShowCheckbox = selectableRows !== "none";

	const createCheckboxTd = (row: Row<T>) => {
		const checkboxLabel = row.original.label || row.id;
		return shouldShowCheckbox ? (
			<Checkbox
				checked={row.isSelected}
				aria-label={checkboxLabel}
				value={row.id}
			/>
		) : null;
	};
	return (
		<DndContext
			sensors={sensors}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			onDragCancel={handleDragCancel}
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
		>
			<FilterContext.Provider value={filterContext}>
				<div
					id={id}
					data-testid={id}
					className={clsx(
						containerClassName,
						pushPaginationDown && "neo-table--push-pagination-down",
					)}
				>
					{(caption || summary) && (
						<>
							{caption && <h4 id={tableCaptionId}>{caption}</h4>}
							{summary && <p id={tableSummaryId}>{summary}</p>}
						</>
					)}

					{readonly === false && (
						<TableToolbar
							customActionsNode={customActionsNode}
							handleCreate={handleCreate}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
							handleRefresh={handleRefresh}
							handleChooseColumns={handleChooseColumns}
							handleRowHeightChange={onRowHeightChangeHandler}
							rowHeight={rowHeightValue}
							showRowHeightMenu={showRowHeightMenu}
							showSearch={showSearch}
							instance={instance}
							readonly={readonly}
							translations={toolbarTranslations}
						/>
					)}

					<table
						{...getTableProps()}
						className={clsx(
							"neo-table",
							rowHeightValue === "compact" && "neo-table--compact",
							rowHeightValue === "medium" && "neo-table--medium",
							showRowSeparator && "neo-table-separator",
						)}
						aria-labelledby={
							caption && tableCaptionId ? tableCaptionId : undefined
						}
						aria-describedby={
							summary && tableSummaryId ? tableSummaryId : undefined
						}
					>
						<TableHeader
							handleRowToggled={handleRowToggled}
							instance={instance}
							selectableRows={selectableRows}
							translations={headerTranslations}
						/>

						<TableBody
							handleRowToggled={handleRowToggled}
							instance={instance}
							selectableRows={selectableRows}
							showRowSelectionHelper={showRowSelectionHelper}
							translations={bodyTranslations}
						/>
					</table>

					{rows.length > 0 && showPagination && (
						<Pagination
							currentPageIndex={pageIndex + 1}
							itemCount={rowCount}
							itemsPerPage={pageSize}
							itemsPerPageOptions={itemsPerPageOptions}
							manualPageCount={pageCount}
							onPageChange={(e, newIndex) => {
								e?.preventDefault();
								const nextIndex = Math.max(0, newIndex - 1);
								gotoPage(nextIndex);
								setRootLevelPageIndex(nextIndex);
								handlePageChange(nextIndex, pageSize);
							}}
							onItemsPerPageChange={(e, newItemsPerPage) => {
								e?.preventDefault();
								setPageSize(newItemsPerPage);

								// when the user has chosen more rows, and there are thus fewer pages, check if we need to update the current page
								const maxPageIndex = Math.ceil(rowCount / newItemsPerPage);
								if (pageIndex > maxPageIndex) {
									const newIndex = Math.max(0, maxPageIndex - 1);
									gotoPage(newIndex);
									handlePageChange(newIndex, newItemsPerPage);
								} else {
									handlePageChange(pageIndex, newItemsPerPage);
								}
							}}
							backIconButtonText={paginationTranslations.backIconButtonText}
							itemsPerPageLabel={paginationTranslations.itemsPerPageLabel}
							nextIconButtonText={paginationTranslations.nextIconButtonText}
							tooltipForCurrentPage={
								paginationTranslations.tooltipForCurrentPage
							}
							tooltipForShownPagesSelect={
								paginationTranslations.tooltipForShownPagesSelect
							}
							itemDisplayTooltipPosition={itemDisplayTooltipPosition}
							itemsPerPageTooltipPosition={itemsPerPageTooltipPosition}
						/>
					)}
				</div>
			</FilterContext.Provider>

			<DragOverlay>
				{activeId && selectedRow && (
					<table
						className={clsx(
							"neo-table",
							rowHeightValue === "compact" && "neo-table--compact",
							rowHeightValue === "medium" && "neo-table--medium",
						)}
					>
						<StaticTableRow
							key={selectedRow.original.id}
							row={selectedRow}
							showDragHandle={true}
							checkboxTd={createCheckboxTd(selectedRow)}
						/>
					</table>
				)}
			</DragOverlay>
		</DndContext>
	);
};

Table.displayName = "Table";
