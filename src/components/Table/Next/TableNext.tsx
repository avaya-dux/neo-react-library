import type { PaginationState, Table } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";

import type { TableNextProps } from "./types";
import "../Table_shim.css";
import { useState } from "react";

export const TableNext = ({
  data,
  columns,

  containerClassName = "",

  // visual options
  pushPaginationDown = false,
  rowHeight = "large",
  showRowSeparator = false,

  // pagination options
  itemsPerPageOptions,
  initialStatePageIndex = 0,

  ...rest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: TableNextProps<any>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialStatePageIndex,
    pageSize: itemsPerPageOptions?.[0] || 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },

    ...rest,
  });

  return (
    <div
      className={clsx(
        containerClassName,
        pushPaginationDown && "neo-table--push-pagination-down",
      )}
    >
      <table
        className={clsx(
          "neo-table",
          rowHeight === "compact" && "neo-table--compact",
          rowHeight === "medium" && "neo-table--medium",
          showRowSeparator && "neo-table-separator",
        )}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {table.getPageCount() > 1 && <TablePagination table={table} />}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TablePagination = ({ table }: { table: Table<any> }) => {
  const {
    firstPage,
    getCanNextPage,
    getCanPreviousPage,
    getPageCount,
    getRowCount,
    getRowModel,
    getState,
    lastPage,
    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
  } = table;
  const { pagination } = getState();
  const { pageIndex, pageSize } = pagination;

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => firstPage()}
          disabled={!getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => lastPage()}
          disabled={!getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {pageIndex + 1} of {getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        Showing {getRowModel().rows.length.toLocaleString()} of{" "}
        {getRowCount().toLocaleString()} Rows
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
    </div>
  );
};
