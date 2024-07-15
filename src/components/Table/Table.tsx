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
import { arrayMove } from "@dnd-kit/sortable";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import type { IFilterContext, RowHeight } from "./types";

import "./Table_shim.css";
import { Checkbox } from "components/Checkbox";

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
	handleRowToggled,
	handlePageChange = () => null,
	readonly = false,
	rowHeight = "large",
	selectableRows = "none",
	showPagination = true,
	canDrag = false,
	pushPaginationDown = false,
	showRowSeparator = false,
	showRowHeightMenu = true,
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

	useEffect(() => {
		setData(originalData);
	}, [originalData]);

	const items = useMemo(() => data?.map(({ id }) => id), [data]);

	const instance = useTable<T>(
		{
			columns,
			data,
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
	const rowCount = rows.length;

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

	const filterContext: IFilterContext = {
		allowColumnFilter,
		canDrag,
		filterSheetVisible,
		setFilterSheetVisible,
		toggleFilterSheetVisible,
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);

	function handleDragStart(event: DragStartEvent) {
		const { active } = event;
		setActiveId(active.id);
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
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
				readOnly
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
							translations={bodyTranslations}
						/>
					</table>

					{rows.length > 0 && showPagination && (
						<Pagination
							currentPageIndex={pageIndex + 1}
							itemCount={rowCount}
							itemsPerPage={pageSize}
							itemsPerPageOptions={itemsPerPageOptions}
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
						<tbody>
							<StaticTableRow
								key={selectedRow.original.id}
								row={selectedRow}
								showDragHandle={true}
								checkboxTd={createCheckboxTd(selectedRow)}
							/>
						</tbody>
					</table>
				)}
			</DragOverlay>
		</DndContext>
	);
};

Table.displayName = "Table";
