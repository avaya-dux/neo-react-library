import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

import { Pagination } from "components/Pagination";

import { TableProps } from ".";
import {
  convertRowIdsArrayToObject,
  translations as defaultTranslations,
  FilterContext,
} from "./helpers";
import { TableBody, TableHeader, TableToolbar } from "./TableComponents";
import { IFilterContext } from "./types";

import "./Table_shim.css";

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
      callApi().then(data => setData(data));
    }}
  />);
 *
 * @see https://design.avayacloud.com/components/web/tables-web
 */
export const Table = <T extends Record<string, any>>({
  id,
  data,
  columns,
  caption,
  summary,
  itemsPerPageOptions,
  defaultSelectedRowIds,

  allowColumnFilter = false,
  containerClassName = "",
  customActionsNode,
  handleCreate,
  handleDelete,
  handleEdit,
  handleRefresh,
  handleRowToggled,
  readonly = false,
  selectableRows = "none",
  rowHeight = "large",
  translations,

  ...rest
}: TableProps<T>) => {
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
        pageSize: itemsPerPageOptions?.[0] || 10,
        selectedRowIds: convertRowIdsArrayToObject(defaultSelectedRowIds || []),
      },
      ...rest,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const {
    rows,
    getTableProps,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = instance;
  const rowCount = rows.length;

  const tableCaptionId = useMemo(
    () => `table-caption-${caption || "caption"}`,
    [caption]
  );
  const tableSummaryId = useMemo(
    () => `table-summary-${caption || "summary"}`,
    [caption]
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

  const filterContext: IFilterContext = {
    allowColumnFilter,
    filterSheetVisible,
    setFilterSheetVisible,
    toggleFilterSheetVisible,
  };

  return (
    <FilterContext.Provider value={filterContext}>
      <div id={id} data-testid={id} className={containerClassName}>
        {(caption || summary) && (
          <>
            {caption && <h4 id={tableCaptionId}>{caption}</h4>}
            {summary && <p id={tableSummaryId}>{summary}</p>}
          </>
        )}

        <TableToolbar
          customActionsNode={customActionsNode}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleRefresh={handleRefresh}
          instance={instance}
          readonly={readonly}
          translations={toolbarTranslations}
        />

        <table
          {...getTableProps()}
          className={clsx(
            "neo-table",
            rowHeight === "compact" && "neo-table--compact",
            rowHeight === "medium" && "neo-table--medium"
          )}
          aria-labelledby={tableCaptionId}
          aria-describedby={tableSummaryId}
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

        {rows.length > 0 && (
          <Pagination
            currentPageIndex={pageIndex + 1}
            itemCount={rowCount}
            itemsPerPage={pageSize}
            itemsPerPageOptions={itemsPerPageOptions}
            onPageChange={(e, newIndex) => {
              e?.preventDefault();
              gotoPage(newIndex - 1);
            }}
            onItemsPerPageChange={(e, newItemsPerPage) => {
              e?.preventDefault();
              setPageSize(newItemsPerPage);
            }}
            backIconButtonText={paginationTranslations.backIconButtonText}
            itemsPerPageLabel={paginationTranslations.itemsPerPageLabel}
            nextIconButtonText={paginationTranslations.nextIconButtonText}
            tooltipForCurrentPage={paginationTranslations.tooltipForCurrentPage}
            tooltipForShownPagesSelect={
              paginationTranslations.tooltipForShownPagesSelect
            }
          />
        )}
      </div>
    </FilterContext.Provider>
  );
};
