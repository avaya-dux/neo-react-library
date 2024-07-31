import type { Meta, Story } from "@storybook/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Column, ColumnInstance } from "react-table";

import {
	Chip,
	Icon,
	IconButton,
	List,
	ListItem,
	Menu,
	MenuItem,
	SelectNative,
	Switch,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tooltip,
} from "components";
import { Button } from "components/Button";
import type { IconNamesType } from "utils";

import { Table, type TableProps } from "./";
import {
	FilledFields,
	type IDataTableMockData,
	type IRecordingTableMockData,
	makeData,
	recordingColumns,
} from "./helpers";

export default {
	title: "Components/Table",
	component: Table,
} as Meta<TableProps<IDataTableMockData>>;

export const Default = () => (
	<Table {...FilledFields} caption="Storybook Default Table Example" />
);

export const MultiSelectWithoutHelper = () => (
	<Table
		{...FilledFields}
		caption="Multi select without helper"
		initialStatePageSize={5}
		selectableRows="multiple"
		showRowSelectionHelper={false}
	/>
);

export const TooltipPositioning = () => (
	<Table
		{...FilledFields}
		itemDisplayTooltipPosition="top-right"
		itemsPerPageTooltipPosition="top-left"
		caption="Tooltip positioning in Pagination Example"
	/>
);

export const MoreActionsMenu = () => (
	<Table
		caption="Last column has more actions menu."
		columns={[
			...FilledFields.columns,
			{
				Header: "More Actions",
				Cell: () => (
					<Tooltip label="Show more actions for this item.">
						<Menu
							aria-label="More actions menu."
							menuRootElement={<Button variant="tertiary">...</Button>}
						>
							<MenuItem>
								<Icon
									style={{ marginRight: "8px" }}
									icon="edit"
									size="sm"
									aria-label="Edits row"
								/>
								Edit
							</MenuItem>
							<MenuItem>
								<Icon
									style={{ marginRight: "8px" }}
									icon="trash"
									size="sm"
									aria-label="Deletes row"
								/>
								Delete
							</MenuItem>
							<MenuItem>
								<Icon
									style={{ marginRight: "8px" }}
									icon="copy"
									size="sm"
									aria-label="Copies row"
								/>
								Copy
							</MenuItem>
						</Menu>
					</Tooltip>
				),
			},
		]}
		data={[...FilledFields.data]}
	/>
);

export const WithIconButton = () => (
	<Table
		caption="Last column has an IconButton."
		columns={[
			...FilledFields.columns,
			{
				Header: "Add Note",
				Cell: () => (
					<IconButton
						shape="square"
						icon="posts"
						iconSize="lg"
						variant="tertiary"
						badge="7"
						aria-label="Icon button"
					/>
				),
			},
		]}
		data={[...FilledFields.data]}
	/>
);

export const ServerSidePagination = () => {
	// Let's simulate a large dataset on the server with 10k records
	const numOfRecords = 10000;
	const serverData = makeData(numOfRecords);

	const [data, setData] = useState<IRecordingTableMockData[]>([]);
	const [pageCount, setPageCount] = useState(0);
	const fetchIdRef = useRef(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: generated data doesn't change once created
	const fetchData = useCallback(
		(pageIndex: number, pageSize: number) => {
			// This will get called when the table needs new data,
			// it's up to the developer to determine when to fetch it and how many pages or records to load.
			// In our case we always load one page of data.
			// You could fetch your data from literally anywhere,
			// like a server but for this example, we'll just mock it.

			// Give this fetch an ID
			const fetchId = ++fetchIdRef.current;

			// We'll set a delay to simulate a server here
			setTimeout(() => {
				// Only update the data if this is the latest fetch
				if (fetchId === fetchIdRef.current) {
					const startRow = pageSize * pageIndex;
					const endRow = startRow + pageSize;
					setData(serverData.slice(startRow, endRow));

					// Your server could send back total page count.
					// For now we'll just fake it, too
					const newPageCount = Math.ceil(serverData.length / pageSize);
					setPageCount(newPageCount);
				}
			}, 500);
		},
		[fetchIdRef, serverData.length],
	);

	useEffect(() => {
		fetchData(0, 10);
	}, [fetchData]);

	const columns: Column<IRecordingTableMockData>[] = [
		...recordingColumns,
		{
			Cell: ({ value }: { value: IRecordingTableMockData["date"] }) => (
				<>{value?.toLocaleDateString()}</>
			),
			Header: "Date recorded",
			accessor: "date",
			disableFilters: true,
			sortType: "datetime",
		},
	];

	return (
		<Table
			data={data}
			columns={columns}
			manualPagination={true} // Very important to set manualPagination to true.
			manualRowCount={numOfRecords} // Must provide total row count when using server side pagination.
			initialStatePageSize={10}
			pageCount={pageCount}
			handlePageChange={fetchData}
			itemsPerPageOptions={[5, 10, 20, 50]}
			caption="Server Side Pagination Example"
			summary="This table will load one page at a time."
		/>
	);
};

export const AdvancedFilteringAndSorting = () => {
	const columns: Array<Column<IDataTableMockData>> = [
		...FilledFields.columns,
		{
			Header: "Level",
			accessor: "level",
			disableFilters: true,

			sortType: (rowA, rowB) => {
				const {
					original: { level: levelA },
				} = rowA;
				const {
					original: { level: levelB },
				} = rowB;
				let result = 0;

				if (levelA === levelB) {
					result = 0;
				} else if (
					(levelA === "high" && levelB !== "high") ||
					(levelA === "medium" && levelB === "low")
				) {
					result = 1;
				} else {
					result = -1;
				}

				return result;
			},
		},
		{
			Cell: ({ value }: { value: IDataTableMockData["hasOnCallBeeper"] }) => {
				let icon: IconNamesType = "undo";
				let label = "unknown";

				if (value === true) {
					icon = "check";
					label = "Yes";
				} else if (value === false) {
					icon = "close";
					label = "No";
				}

				return <Icon icon={icon} aria-label={label} />;
			},
			Header: "Has On Call Beeper",
			accessor: "hasOnCallBeeper",
			disableFilters: true,
			sortType: (row) => (row.original.hasOnCallBeeper ? 1 : -1), // `boolean` is not supported by default
			width: 75,
		},
		{
			Cell: ({ value }: { value: IDataTableMockData["date"] }) => (
				<>{value?.toLocaleDateString()}</>
			),
			Header: "Date",
			accessor: "date",
			disableFilters: true,
			sortType: "datetime",
		},
		{
			Cell: ({ value }: { value: IDataTableMockData["status"] }) => {
				let icon: IconNamesType = "add-circle";

				switch (value) {
					case "active":
						icon = "check";
						break;
					case "inactive":
						icon = "close";
						break;
					case "awc":
						icon = "away";
						break;
					case "in call":
						icon = "agents";
						break;
					default:
						icon = "queue";
						break;
				}

				return <Chip icon={icon}>{value?.toUpperCase() || ""}</Chip>;
			},
			Filter: ({
				column: { setFilter, preFilteredRows, id },
			}: {
				column: ColumnInstance<IDataTableMockData>;
			}) => {
				const options = useMemo(() => {
					const optionSet = new Set();
					preFilteredRows.forEach((row) => {
						optionSet.add(row.values[id]);
					});
					return Array.from(optionSet.values());
				}, [id, preFilteredRows]);

				return (
					<div style={{ margin: "0px 0px -8px 0px" }}>
						<SelectNative
							aria-label="Status"
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
								setFilter(e.target.value || undefined);
							}}
						>
							<option value="">All</option>

							{options.map((option, i) => (
								<option key={i} value={option as string}>
									{(option as string).toUpperCase()}
								</option>
							))}
						</SelectNative>
					</div>
				);
			},
			Header: "Status",
			accessor: "status",
			disableSortBy: true,
			filter: "exactTextCase",
		},
		{
			Cell: ({ value }: { value: IDataTableMockData["longText"] }) =>
				value ? (
					<Tooltip label={value}>
						<div
							style={{
								whiteSpace: "nowrap",
								width: 50,
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{value}
						</div>
					</Tooltip>
				) : (
					<>---</>
				),
			Header: "Long Text",
			accessor: "longText",
			disableFilters: true,
		},
	];

	return (
		<section>
			<h3>How to setup Advanced Filtering and Sorting</h3>

			<p>
				The Table component has several advanced features that you can use to
				customize how data is displayed in the Table.
			</p>

			<p>
				You can use use the <code>sortType</code> for a given column to specifiy
				how the columns data should be sorted. This field can take the following
				types:
			</p>
			<div>
				<code>
					"string" | "number" | "alphanumeric" | "datetime" | "basic" | method
				</code>
			</div>

			<p>
				To use a custom method for <code>sortType</code>, you can use the
				following format:
			</p>
			<div>
				<code>
					{
						"(rowA: Row<D>, rowB: Row<D>, columnId: IdType<D>, desc?: boolean | undefined) => number"
					}
				</code>
			</div>

			<p>
				If <code>sortType</code> is not passed, it defaults to "basic"; and when
				a column header is clicked, a dropdown will be shown that includes four
				options. Clear, Ascending, Descending, and "Filter Column". These sort
				by "string".
			</p>

			<p>
				In this example, the following columns have specified a specific type of
				sorting due to their data type.
			</p>
			<ul style={{ paddingLeft: 15 }}>
				<li>Column "Other" has been disabled</li>
				<li>Column "Date" has been set to "datetime"</li>
				<li>Column "Color" has been set to "alphanumeric"</li>
				<li>
					Column "Level" and "Has on Call Beeper" have custom sorting methods
					passed
				</li>
				<li>
					Column "Status" does not use a sort and instead passes a "Filter"
					method that matches via "exactTextCase"
				</li>
			</ul>

			<Table
				allowColumnFilter
				columns={columns}
				data={[...FilledFields.data]}
			/>
		</section>
	);
};

export const TableInTabs = () => (
	<section>
		<h3>Table inside of a Tab</h3>

		<Tabs>
			<TabList>
				<Tab id="tab1">Nothing</Tab>

				<Tab id="tab2">Table</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<p>Nothing of consequence</p>
				</TabPanel>

				<TabPanel>
					<Table
						allowColumnFilter
						columns={[...FilledFields.columns]}
						data={[...FilledFields.data]}
					/>
				</TabPanel>
			</TabPanels>
		</Tabs>
	</section>
);

export const CustomActions = () => {
	const [checked, setChecked] = useState(false);
	const [multiple, setMultiple] = useState(false);

	return (
		<Table
			{...FilledFields}
			draggableRows={checked}
			selectableRows={multiple ? "multiple" : "none"}
			caption="Custom Actions"
			customActionsNode={
				<section>
					<Button
						onClick={() => alert("custom action number one")}
						variant="tertiary"
					>
						Example One
					</Button>
					<Button
						onClick={() => alert("custom action number two")}
						variant="tertiary"
					>
						Example Two
					</Button>
					<Switch
						checked={checked}
						onChange={(_e, updatedChecked) => setChecked(updatedChecked)}
					>
						Draggable Switch
					</Switch>
					<Switch
						checked={multiple}
						onChange={(_e, updatedChecked) => setMultiple(updatedChecked)}
					>
						Multiple Switch
					</Switch>
				</section>
			}
		/>
	);
};

export const EditableData = () => {
	const [data, setData] = useState(FilledFields.data);
	const [readonly, setReadonly] = useState(false);
	const [logItems, setLogItems] = useState<string[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: self explanatory
	useEffect(() => {
		setLogItems([`data modified, new length: ${data.length}`, ...logItems]);
	}, [data]);

	return (
		<section>
			<Table
				caption="Editable Rows Table Example"
				columns={FilledFields.columns}
				data={data}
				readonly={readonly}
				selectableRows="multiple"
				initialStatePageSize={5}
				draggableRows
				handlePageChange={(newPageIndex, newPageSize) => {
					setLogItems([
						`page change - index:${newPageIndex} | size:${newPageSize}`,
						...logItems,
					]);
				}}
				handleCreate={() => {
					const newRow: IDataTableMockData = {
						id: `new-row-${Math.random()}`,
						name: "The new guy",
						label: "New Row",
						other: "Lorem Ipsum",
						date: new Date(),
						status: "inactive",
						hexValue: "003300",
						level: "high",
						hasOnCallBeeper: false,
					};
					setData([...data, newRow]);
				}}
				handleDelete={(rowIds: string[]) => {
					setData(data.filter((row) => !rowIds.includes(row.id)));
				}}
				handleEdit={(row: IDataTableMockData) => {
					const rowToEditIndex = data.findIndex((r) => r.id === row.id);
					const dataCopy = [...data];
					dataCopy[rowToEditIndex].name =
						`${dataCopy[rowToEditIndex]?.name} (edited)`;

					setData(dataCopy);
				}}
				handleRefresh={() => {
					setReadonly(true);
					setData([]);
					setTimeout(() => {
						setData(FilledFields.data);
						setReadonly(false);
					}, 1000);
				}}
			/>

			<section style={{ paddingTop: 20 }}>
				<h3>data modifications:</h3>

				<List>
					{logItems.map((item, index) => (
						<ListItem key={`${item}-${index}`}>{item}</ListItem>
					))}
				</List>
			</section>
		</section>
	);
};

export const EmptyDataSet = () => (
	<Table
		caption="Storybook Empty Date Set Table Example"
		columns={FilledFields.columns}
		data={[]}
		handleRefresh={() => undefined}
	/>
);

export const PaginationPushedDown = () => (
	<Table
		caption="Storybook Pagination Pushed Down Table Example"
		columns={FilledFields.columns}
		data={[FilledFields.data[0]]}
		handleRefresh={() => undefined}
		showPagination
		pushPaginationDown
	/>
);

export const BareBones = () => (
	<Table
		columns={FilledFields.columns}
		showSearch={false}
		data={[...FilledFields.data]}
	/>
);

export const WithRowSeparator = () => (
	<Table
		showRowSeparator
		columns={FilledFields.columns}
		data={[...FilledFields.data]}
	/>
);

export const PreSelectedRows = () => {
	const defaultSelectedRowIds = [
		FilledFields.data[1].id.toString(),
		FilledFields.data[3].id.toString(),
	];
	const [selectedRows, setSelectedRows] = useState(defaultSelectedRowIds);
	const [logItems, setLogItems] = useState<string[]>([]);

	const handleToggle = (selectedRowIds: string[], row?: IDataTableMockData) => {
		setSelectedRows(selectedRowIds);

		if (row) {
			const rowExists = selectedRowIds.find((id) => id === row.id.toString());
			setLogItems([
				`Row '${row.name}' was toggled ${rowExists ? "ON" : "OFF"}`,
				...logItems,
			]);
		} else {
			setLogItems([
				`All rows were toggled ${selectedRowIds.length ? "ON" : "OFF"}`,
				...logItems,
			]);
		}
	};

	return (
		<section>
			<section style={{ paddingBottom: 20 }}>
				<h3>selected rows:</h3>

				<code>{JSON.stringify(selectedRows)}</code>
			</section>

			<Table
				caption="Storybook Selectable Rows Table Example"
				columns={FilledFields.columns}
				data={FilledFields.data}
				handleRowToggled={handleToggle}
				selectableRows="multiple"
				defaultSelectedRowIds={defaultSelectedRowIds}
			/>

			<section style={{ paddingTop: 20 }}>
				<h3>`onChange` logs:</h3>

				<List>
					{logItems.map((item, index) => (
						<ListItem key={`${item}-${index}`}>{item}</ListItem>
					))}
				</List>
			</section>
		</section>
	);
};

// NOTE: passing `props` here to make a "toolbar functionality" test easier
export const SecondPage = (props: object) => {
	const initialPageIndex = 2;
	const pageSizes = [2, 5];
	const [data, setData] = useState(FilledFields.data);
	const [readonly, setReadonly] = useState(false);
	const [pageIndex, setPageIndex] = useState(initialPageIndex);
	const [pageSize, setPageSize] = useState(pageSizes[0]);

	return (
		<section>
			<div style={{ marginBottom: "3rem", maxWidth: "31rem" }}>
				<h3>Explanation of functionality</h3>

				<p>
					This table shows the functionality related to defaulting to the second
					page and keeping track of the current page index (zero based).
				</p>

				<ul style={{ marginLeft: "2rem" }}>
					<li>
						If the table's data is refreshed, it will return to the last
						selected page.
					</li>

					<li>
						If a row is added, edited, or removed, it will stay on the currently
						selected page.
					</li>

					<li>
						If you are on the final page available and remove a row or increase
						the number of rows shown per page, the table will jump to the "new"
						final page.
					</li>

					<li>
						If you need to keep track of the current page index and/or page
						size, you can use the <code>onPageChange</code> method.
						<div style={{ backgroundColor: "cyan" }}>
							The currently selected page index is: <code>{pageIndex}</code>
						</div>
						<div style={{ backgroundColor: "cyan" }}>
							The current page size is: <code>{pageSize}</code>
						</div>
					</li>
				</ul>
			</div>

			<Table
				caption="Second Page Table Example"
				columns={FilledFields.columns}
				data={data}
				readonly={readonly}
				selectableRows="multiple"
				itemsPerPageOptions={pageSizes}
				initialStatePageIndex={initialPageIndex}
				handlePageChange={(newPageIndex, newPageSize) => {
					setPageIndex(newPageIndex);
					setPageSize(newPageSize);
				}}
				handleCreate={() => {
					const newRow: IDataTableMockData = {
						id: `new-row-${Math.random()}`,
						name: "The new guy",
						label: "New Row",
						other: "Lorem Ipsum",
						date: new Date(),
						status: "inactive",
						hexValue: "003300",
						level: "high",
						hasOnCallBeeper: false,
					};
					setData([...data, newRow]);
				}}
				handleDelete={(rowIds: string[]) => {
					setData(data.filter((row) => !rowIds.includes(row.id)));
				}}
				handleEdit={(row: IDataTableMockData) => {
					const rowToEditIndex = data.findIndex((r) => r.id === row.id);
					const dataCopy = [...data];
					dataCopy[rowToEditIndex].name =
						`${dataCopy[rowToEditIndex]?.name} (edited)`;

					setData(dataCopy);
				}}
				handleRefresh={() => {
					setReadonly(true);
					setData([]);
					setTimeout(() => {
						setData(FilledFields.data);
						setReadonly(false);
					}, 1000);
				}}
				{...props}
			/>
		</section>
	);
};

export const DisabledRows = () => {
	const [data, setData] = useState(FilledFields.dataWithDisabledRows);
	const [readonly, setReadonly] = useState(false);

	const [logItems, setLogItems] = useState<string[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: self explanatory
	useEffect(() => {
		setLogItems([`data modified, new length: ${data.length}`, ...logItems]);
	}, [data]);

	return (
		<section>
			<Table
				caption="Table with Disabled Rows"
				columns={FilledFields.columns}
				data={data}
				readonly={readonly}
				selectableRows="multiple"
				initialStatePageSize={5}
				draggableRows
				handlePageChange={(newPageIndex, newPageSize) => {
					setLogItems([
						`page change - index:${newPageIndex} | size:${newPageSize}`,
						...logItems,
					]);
				}}
				handleCreate={() => {
					const newRow: IDataTableMockData = {
						id: `new-row-${Math.random()}`,
						name: "The new guy",
						label: "New Row",
						other: "Lorem Ipsum",
						date: new Date(),
						status: "inactive",
						hexValue: "003300",
						level: "high",
						hasOnCallBeeper: false,
					};
					setData([...data, newRow]);
				}}
				handleDelete={(rowIds: string[]) => {
					setData(
						data.filter((row: IDataTableMockData) => !rowIds.includes(row.id)),
					);
				}}
				handleEdit={(row: IDataTableMockData) => {
					const rowToEditIndex = data.findIndex(
						(r: IDataTableMockData) => r.id === row.id,
					);
					const dataCopy = [...data];
					dataCopy[rowToEditIndex].name =
						`${dataCopy[rowToEditIndex]?.name} (edited)`;

					setData(dataCopy);
				}}
				handleRefresh={() => {
					setReadonly(true);
					setData([]);
					setTimeout(() => {
						setData(FilledFields.data);
						setReadonly(false);
					}, 1000);
				}}
			/>

			<section style={{ paddingTop: 20 }}>
				<h3>data modifications:</h3>

				<List>
					{logItems.map((item, index) => (
						<ListItem key={`${item}-${index}`}>{item}</ListItem>
					))}
				</List>
			</section>
		</section>
	);
};

const Template: Story<TableProps<IDataTableMockData>> = (
	props: TableProps<IDataTableMockData>,
) => <Table {...props} />;

export const Templated = Template.bind({});
Templated.args = {
	id: "templated-table",

	columns: FilledFields.columns,
	data: [...FilledFields.data],
	selectableRows: "none",
	showPagination: true,
};
