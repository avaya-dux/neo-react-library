import type { PaginationState } from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import { translations as defaultTranslations } from "../helpers";

import { TablePagination, TableToolbar } from "./components";
import type { TableNextProps } from "./types";

import "../Table_shim.css";

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
	showRowHeightMenu = true,
	showRowSeparator = false,
	showSearch = true,

	// pagination options
	itemsPerPageOptions = [10, 25, 50, 100],
	initialStatePageIndex = 0,

	translations: translationsProp,

	...rest
	// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
}: TableNextProps<any>) => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: initialStatePageIndex,
		pageSize: itemsPerPageOptions?.[0] || 10,
	});

	const translations = useMemo(() => {
		return {
			...defaultTranslations,
			...translationsProp,
		};
	}, [translationsProp]);
	const [globalFilter, setGlobalFilter] = useState("");

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),

		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: {
			pagination,
			globalFilter,
		},

		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(), // TODO: allow custom filter functions to be passed in

		...rest,
	});

	const [rowHeightValue, setRowHeightValue] = useState(rowHeight);
	useEffect(() => {
		setRowHeightValue(rowHeight);
	}, [rowHeight]);

	return (
		<div
			className={clsx(
				containerClassName,
				pushPaginationDown && "neo-table--push-pagination-down",
			)}
		>
			<TableToolbar
				handleRowHeightChange={setRowHeightValue}
				rowHeight={rowHeightValue}
				showRowHeightMenu={showRowHeightMenu}
				showSearch={showSearch}
				table={table}
				translations={translations.toolbar}
			/>

			<table
				className={clsx(
					"neo-table",
					rowHeightValue === "compact" && "neo-table--compact",
					rowHeightValue === "medium" && "neo-table--medium",
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

			<TablePagination
				table={table}
				itemsPerPageOptions={itemsPerPageOptions}
				translations={translations.pagination}
			/>
		</div>
	);
};
