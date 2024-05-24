/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";

import "../Table_shim.css";

import type { RowHeight } from "../types";

export interface TableNextProps<T> {
  data: T[];

  columns: ColumnDef<T, any>[];

  containerClassName?: string;
  pushPaginationDown?: boolean;
  rowHeight?: RowHeight;
  showRowSeparator?: boolean;
}

export const TableNext = ({
  data,
  columns,

  containerClassName = "",
  pushPaginationDown = false,
  rowHeight = "large",
  showRowSeparator = false,

  ...rest
}: TableNextProps<any>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

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
    </div>
  );
};
