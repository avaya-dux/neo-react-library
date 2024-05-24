import type { PaginationState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import clsx from "clsx";

import type { TableNextProps } from "./types";
import { Pagination } from "components/Pagination";

import "../Table_shim.css";

import { translations as defaultTranslations } from "../helpers";

/**
 * The `TableNext` component is a WIP replacement for the `Table` component.
 *
 * @example
  const columnHelper = createColumnHelper<TableDataDefinition>();
  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <i>Last Name</i>,
    }),
    columnHelper.accessor("age", {
      header: () => "Age",
      cell: (info) => info.renderValue(),
    }),
  ];

  const data = [
    { id: 1, firstName: "John", lastName: "Doe", age: 25 },
    { id: 2, firstName: "Jane", lastName: "Doe", age: 27 },
  ];

  return <TableNext data={data} columns={columns} />;
 *
 * @see https://design.avayacloud.com/components/web/tables-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/docs/components-table-next--docs
 */
export const TableNext = ({
  data,
  columns,

  containerClassName = "",

  // visual options
  pushPaginationDown = false,
  rowHeight = "large",
  showRowSeparator = false,

  // pagination options
  itemsPerPageOptions = [10, 25, 50, 100],
  initialStatePageIndex = 0,
  itemDisplayTooltipPosition = "auto",
  itemsPerPageTooltipPosition = "auto",

  translations,

  ...rest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: TableNextProps<any>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialStatePageIndex,
    pageSize: itemsPerPageOptions?.[0] || 10,
  });
  const paginationTranslations = useMemo(() => {
    return {
      ...defaultTranslations.pagination,
      ...translations?.pagination,
    };
  }, [translations]);

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

  const { getPageCount, getRowCount, getState, setPageIndex, setPageSize } =
    table;
  const { pageIndex, pageSize } = getState().pagination;

  const rowCount = getRowCount();

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

      {getPageCount() < 1 ? undefined : (
        <Pagination
          currentPageIndex={pageIndex + 1}
          itemCount={rowCount}
          itemsPerPage={pageSize}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={(e, newIndex) => {
            e?.preventDefault();
            setPageIndex(newIndex - 1);
          }}
          onItemsPerPageChange={(e, newItemsPerPage) => {
            e?.preventDefault();
            setPageSize(newItemsPerPage);

            // when the user has chosen more rows, and there are thus fewer pages, check if we need to update the current page
            const maxPageIndex = Math.ceil(rowCount / newItemsPerPage);
            if (pageIndex > maxPageIndex) {
              setPageIndex(maxPageIndex - 1);
            }
          }}
          backIconButtonText={paginationTranslations.backIconButtonText}
          itemsPerPageLabel={paginationTranslations.itemsPerPageLabel}
          nextIconButtonText={paginationTranslations.nextIconButtonText}
          tooltipForCurrentPage={paginationTranslations.tooltipForCurrentPage}
          tooltipForShownPagesSelect={
            paginationTranslations.tooltipForShownPagesSelect
          }
          itemDisplayTooltipPosition={itemDisplayTooltipPosition}
          itemsPerPageTooltipPosition={itemsPerPageTooltipPosition}
        />
      )}
    </div>
  );
};
