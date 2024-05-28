/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { TableNext } from "./";
import { ITableNextMockData, makeData } from "./mock-data";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<ITableNextMockData>();
const meta: Meta<typeof TableNext> = {
	component: TableNext,
	title: "Components/Table (Next)",
	args: {
		data: makeData(100),
		columns: [
			columnHelper.accessor("firstName", {
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor((row) => row.lastName, {
				id: "lastName",
				cell: (info) => <i>{info.getValue()}</i>,
				header: () => <span>Last Name</span>,
			}),
			columnHelper.accessor("age", {
				header: () => "Age",
				cell: (info) => info.renderValue(),
			}),
			columnHelper.accessor("visits", {
				header: () => <span>Visits</span>,
			}),
			columnHelper.accessor("status", {
				header: "Status",
			}),
			columnHelper.accessor("progress", {
				header: "Profile Progress",
			}),
		],
	},
};
export default meta;

type Story = StoryObj<typeof TableNext>;

export const Basic: Story = {
	name: "Basic usage, simple column definitions",
	render: ({ data, columns, ...rest }) => {
		return <TableNext data={data} columns={columns} {...rest} />;
	},
};

export const AlternateColumnDefs: Story = {
	name: "Alternate style of defining columns",
	render: ({ data, ...rest }) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const columnsHardcoded: ColumnDef<ITableNextMockData, any>[] = [
			{
				accessorKey: "firstName",
				id: "firstName",
				header: "First Name",
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: "lastName",
				id: "lastName",
				header: "Last Name",
				cell: (info) => <i>{info.getValue()}</i>,
			},
			{
				accessorKey: "age",
				id: "age",
				header: () => <i>Age</i>,
				cell: (info) => info.renderValue(),
			},
			{
				accessorKey: "visits",
				id: "visits",
				header: "Visits",
			},
			{
				accessorKey: "status",
				id: "status",
				header: "Status",
			},
			{
				accessorKey: "progress",
				id: "progress",
				header: "Profile Progress",
			},
		];

		return <TableNext data={data} {...rest} columns={columnsHardcoded} />;
	},
};
