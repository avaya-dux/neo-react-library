import type { Meta, Story } from "@storybook/react";
import clsx from "clsx";
import {
	Chip,
	Form,
	Icon,
	IconButton,
	List,
	ListItem,
	Menu,
	MenuItem,
	Select,
	SelectOption,
	Switch,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	TextInput,
	Tooltip,
} from "components";
import { Button } from "components/Button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Column, Row, TableInstance } from "react-table";
import { useDebouncedCallback } from "use-debounce";
import type { IconNamesType } from "utils";

import { Table, type TableProps } from "./";
import { DefaultColumnFilter, TableFilterDrawer } from "./TableComponents";
import {
	FilledFields,
	type IDataTableMockData,
	type IRecordingTableMockData,
	makeData,
	recordingColumns,
} from "./helpers";

import log from "loglevel";
const logger = log.getLogger("TableStories");
logger.disableAll();

import "./TableStories_shim.css";
import type { SortType } from "./types";

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
	const totalRecords = 10000;
	const originalData = useMemo(() => makeData(totalRecords), []);
	const [numOfRecords, setNumberOfRecords] = useState(totalRecords);
	const [serverData, setServerData] = useState([...originalData]);
	const [pageData, setPageData] = useState<IRecordingTableMockData[]>([]);
	const [pageCount, setPageCount] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [dateTimeTarget, setDateTimeTarget] = useState("");
	const [searchString, setSearchString] = useState("");
	const [sortType, setSortType] = useState<SortType>("unsorted");
	const [columnToSort, setColumnToSort] = useState<
		keyof IRecordingTableMockData | undefined
	>(undefined);
	const fetchIdRef = useRef(0);

	const compareValues = (
		a: IRecordingTableMockData,
		b: IRecordingTableMockData,
		columnToSort: keyof IRecordingTableMockData,
	): number => {
		const aValue = a[columnToSort];
		const bValue = b[columnToSort];

		if (typeof aValue === "string" && typeof bValue === "string") {
			return aValue.localeCompare(bValue);
		}
		if (typeof aValue === "number" && typeof bValue === "number") {
			return aValue - bValue;
		}
		if (typeof aValue === "boolean" && typeof bValue === "boolean") {
			const aValueNumber = aValue ? 1 : 0;
			const bValueNumber = bValue ? 1 : 0;
			return aValueNumber - bValueNumber;
		}
		if (aValue instanceof Date && bValue instanceof Date) {
			return aValue.getTime() - bValue.getTime();
		}
		return 0;
	};

	// simulate fetch server data per global search string and a column filter value
	const searchDebounced = useDebouncedCallback(
		(
			search: string,
			pageSize: number,
			columnFilter: string = dateTimeTarget,
			sort: SortType = sortType,
		) => {
			logger.log({ searchString: search, pageSize, dateTimeTarget });
			if (search !== searchString) {
				setSearchString(search);
			}
			let data = [];
			if (!search) {
				data = [...originalData];
			} else {
				data = originalData.filter((row) => {
					return Object.values(row).some((value) =>
						value.toString().includes(search),
					);
				});
			}
			if (columnFilter) {
				data = data.filter((row) => {
					return row.date?.toLocaleDateString().includes(columnFilter);
				});
			}

			if (sort === "asc" && columnToSort) {
				data.sort((a, b) => {
					if (!columnToSort) {
						return 0;
					}
					return compareValues(a, b, columnToSort);
				});
			} else if (sort === "desc" && columnToSort) {
				data.sort((a, b) => {
					if (!columnToSort) {
						return 0;
					}
					return compareValues(b, a, columnToSort);
				});
			}
			setServerData(data);
			setNumberOfRecords(data.length);
			setPageData(data.slice(0, pageSize));
			const newPageCount = Math.ceil(data.length / pageSize);
			setPageCount(newPageCount);
		},
		1000,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: generated data doesn't change once created
	const fetchData = useCallback(
		(pageIndex: number, pageSize: number) => {
			setPageSize(pageSize);
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
					setPageData(serverData.slice(startRow, endRow));

					// Your server could send back total page count.
					// For now we'll just fake it, too
					const newPageCount = Math.ceil(serverData.length / pageSize);
					setPageCount(newPageCount);
				}
			}, 500);
		},
		[fetchIdRef, serverData],
	);

	useEffect(() => {
		fetchData(0, 10);
	}, [fetchData]);

	const onApplyFilterValue = useCallback(
		(columnId: string, value: unknown) => {
			logger.debug("Filter Applied", { columnId, value });
			const filterValue = value as string;
			setDateTimeTarget(filterValue);
			searchDebounced(searchString, pageSize, filterValue);
		},
		[searchString, pageSize, searchDebounced],
	);

	const onManualSortBy = useCallback(
		(columnId: string, sortType: SortType) => {
			logger.debug("Sort Applied", { columnId, sortType });
			setColumnToSort(columnId as keyof IRecordingTableMockData);
			setSortType(sortType);
			searchDebounced(searchString, pageSize, dateTimeTarget, sortType);
		},
		[searchString, pageSize, dateTimeTarget, searchDebounced],
	);

	const columns: Column<IRecordingTableMockData>[] = useMemo(
		() => [
			...recordingColumns,
			{
				Cell: ({ value }: { value: IRecordingTableMockData["date"] }) => (
					<>{value?.toLocaleDateString()}</>
				),
				Header: "Date recorded",
				accessor: "date",
				disableFilters: false,
				sortType: "datetime",
				Filter: ({ column, onFilterValueChange }) => {
					return (
						<DefaultColumnFilter
							label="Date"
							placeholder="Search by date"
							helperText="Only rows with exactly matching date will be shown.  Clear to show all."
							column={column}
							onChange={onFilterValueChange}
						/>
					);
				},
			},
		],
		[],
	);

	return (
		<section>
			<h3>Server Side Pagination and Search Example</h3>
			<h4>How the example work:</h4>
			<ul>
				<li>
					Simulate page load one at a time from server when clicking the page
					number.
				</li>
				<li>
					Simulate server side filtering when searching by a full or partial
					value, such as transcribed, of the "Recording Status" column.
				</li>
			</ul>
			<h4>
				How to implement server side pagination and search in your application:
			</h4>
			<ul>
				<li>
					For server side pagination, implement handPageChange callback that
					sends page index, page size, and/or search string to the server. The
					server should return the page data, the total number of records, and
					the page count, to the callback.
				</li>
				<li>
					For server side search, implement handleSearch callback that sends the
					search string and the page size to the server. The server should
					return the first page of data, the total number of records, and the
					page count, to the callback.
				</li>
				<li>
					For server side column filter, implement a customer Filter,
					onApplyFilterValue, and set manualColumnFilters to true. In this
					example, the Date recorded column has a custom filter that simulates
					server side filtering by exact date match.
				</li>
				<li>
					For server side column sort, set manualSortBy to true and implement
					onManualSortBy callback.
				</li>
			</ul>
			<Table
				data={pageData}
				columns={columns}
				manualPagination={true} // Very important to set manualPagination to true.
				manualRowCount={numOfRecords} // Must provide total row count when using server side pagination.
				manualColumnFilters={true} // Must provide manualColumnFilters to true when using server side column filtering.
				onApplyFilterValue={onApplyFilterValue}
				manualSortBy={true} // Must set manualSortBy to true when using server side column sorting.
				onManualSortBy={onManualSortBy}
				initialStatePageSize={10}
				pageCount={pageCount}
				handlePageChange={fetchData}
				handleSearch={searchDebounced}
				itemsPerPageOptions={[5, 10, 20, 50]}
				allowToggleColumnVisibility
			/>
		</section>
	);
};

export const AdvancedFilteringAndSorting = () => {
	const columns: Array<Column<IDataTableMockData>> = [
		...FilledFields.columns,
		{
			Header: "Level",
			accessor: "level",
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
			sortType: (row) => (row.original.hasOnCallBeeper ? 1 : -1), // `boolean` is not supported by default
			width: 75,
			filter: "includesValue",
		},
		{
			Cell: ({ value }: { value: IDataTableMockData["date"] }) => (
				<>{value?.toLocaleDateString()}</>
			),
			Header: "Date",
			accessor: "date",
			sortType: "datetime",
			filter: "includesValue",
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
				column: { preFilteredRows, id, filterValue },
				onFilterValueChange,
			}) => {
				const options = useMemo(() => {
					const optionSet = new Set();
					preFilteredRows.forEach((row) => {
						optionSet.add(row.values[id]);
					});
					return Array.from(optionSet.values());
				}, [id, preFilteredRows]);

				const all = useMemo(
					() => (
						<SelectOption key="All" value="All">
							All
						</SelectOption>
					),
					[],
				);

				const rest = useMemo(() => {
					return options.map((option) => (
						<SelectOption key={option as string} value={option as string}>
							{(option as string).toUpperCase()}
						</SelectOption>
					));
				}, [options]);

				return (
					<div style={{ margin: "0px 0px -8px 0px" }}>
						<Select
							aria-label="Status"
							value={filterValue || ""}
							onChange={(value) => {
								logger.debug("Status Filter onChange", value);
								if (onFilterValueChange) {
									onFilterValueChange(value === "All" ? "" : value);
								}
							}}
						>
							{all}
							{rest}
						</Select>
					</div>
				);
			},
			Header: "Status",
			accessor: "status",
			filter: "exactText",
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
			show: false,
		},
	];

	return (
		<section className="extra-spacing">
			<h3>How to setup Advanced Filtering and Sorting</h3>

			<p>
				The Table component has several advanced features that you can use to
				customize how data is displayed in the Table.
			</p>

			<p>
				If you want to hide a column, you can add <code>show: false</code> to
				the column definition. The table below hides its "Long Text" column by
				default.
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
				allowToggleColumnVisibility
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
						allowToggleColumnVisibility
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
	const [expandable, setExpandable] = useState(false);
	const [dark, setDark] = useState(false);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const renderInsetTable = (row: any) => {
		// inset table of 3 rows for name starting with "Sir"
		if (row.original.name.startsWith("Sir"))
			return (
				<Table
					columns={FilledFields.columns}
					showSearch={false}
					readonly
					showPagination={false}
					pageCount={3}
					data={[...FilledFields.data.slice(row.index, 3)]}
				/>
			);
		// inline form for name starting with "Madam"
		if (row.original.name.startsWith("Madam"))
			return (
				<Form aria-label="Playground form" inline>
					<TextInput
						clearable
						label="Name"
						placeholder="Type your name here."
						defaultValue={row.original.name}
						type="text"
					/>
					<TextInput
						clearable
						label="Color"
						defaultValue={row.original.hexValue}
						type="text"
					/>
					<Button id="btn-submit-inline" variant="primary">
						Submit
					</Button>
					<Button id="btnCancel" variant="secondary">
						Cancel
					</Button>
				</Form>
			);
		return <p>Name: {row.original.name}</p>;
	};
	return (
		<div className={clsx(dark && "neo-dark")}>
			<Table
				{...FilledFields}
				draggableRows={checked}
				selectableRows={multiple ? "multiple" : "none"}
				caption="Custom Actions"
				renderInsetTable={expandable ? renderInsetTable : undefined}
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
							checked={dark}
							onChange={(_e, updatedChecked) => setDark(updatedChecked)}
						>
							Dark Mode
						</Switch>
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
						<Switch
							checked={expandable}
							onChange={(_e, updatedChecked) => setExpandable(updatedChecked)}
						>
							Expandable Switch
						</Switch>
					</section>
				}
			/>
		</div>
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
				itemsPerPageOptions={[5, 10, 50]}
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

export const EmptyDataSet = () => {
	const [draggable, setDraggable] = useState(false);
	const [multiple, setMultiple] = useState(false);

	return (
		<div>
			<Table
				caption="Storybook Empty Date Set Table Example"
				columns={FilledFields.columns}
				data={[]}
				handleRefresh={() => undefined}
				draggableRows={draggable}
				selectableRows={multiple ? "multiple" : "none"}
				customActionsNode={
					<section>
						<Switch
							checked={draggable}
							onChange={(_e, updatedChecked) => setDraggable(updatedChecked)}
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
		</div>
	);
};

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

export const CustomBasicTableFilterDrawer = () => {
	const [openColumnsFilterDrawer, setOpenColumnsFilterDrawer] =
		useState<boolean>(false);
	const handleShowColumnsFilter = () => setOpenColumnsFilterDrawer((v) => !v);
	const closeFilterDrawer = () => {
		setOpenColumnsFilterDrawer(false);
	};

	const [filtersToApply, setFiltersToApply] = useState([]);

	const handleApply = () => {
		const theFilters = [
			{ id: "name", value: "Williams" },
			{ id: "other", value: "Lorem" },
		];
		setFiltersToApply(theFilters);
		closeFilterDrawer();
	};

	return (
		<>
			<Table
				columns={FilledFields.columns}
				handleShowColumnsFilter={handleShowColumnsFilter}
				allowToggleColumnVisibility
				data={[...FilledFields.data]}
				allFilters={filtersToApply}
			/>
			<TableFilterDrawer
				title="Custom Table Filter Drawer"
				open={openColumnsFilterDrawer}
				handleCancel={closeFilterDrawer}
				handleApply={handleApply}
			>
				<TextInput clearable label="Name" type="text" />
				<TextInput clearable label="Goals" type="text" />
			</TableFilterDrawer>
		</>
	);
};

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
				allowToggleColumnVisibility
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

export const EmbeddedSelects = () => {
	const addten = "addten";
	const minusten = "minusten";
	const reset = "reset";

	type IData = {
		id: string;
		name: string;
		number: string;
		lastAction?: string;
	};
	const columns: Array<Column<IData>> = [
		{
			Header: "Name",
			accessor: "name",
		},
		{
			Header: "Number",
			accessor: "number",
		},
		{
			Header: "Actions",
			Cell: ({ row }: { row: Row<IData> }) => {
				const { lastAction } = row.original;

				return (
					<Select
						aria-label="Actions"
						value={lastAction}
						onChange={(action) => {
							handleSelectedValueChange(action, row.original);
						}}
					>
						<SelectOption value={addten}>Add 10</SelectOption>
						<SelectOption value={minusten}>Minus Ten</SelectOption>
						<SelectOption value={reset}>Reset</SelectOption>
					</Select>
				);
			},
		},
	];
	const mockdata: IData[] = [
		{
			id: "1",
			name: "John Doe",
			number: "1",
		},
		{
			id: "2",
			name: "Jane Doe",
			number: "2",
			lastAction: reset,
		},
		{
			id: "3",
			name: "Joe Schmoe",
			number: "3",
		},
		{
			id: "4",
			name: "Jill Schmoe",
			number: "4",
		},
	];

	const [data, setData] = useState(mockdata);

	const handleSelectedValueChange = (
		action: null | string | string[],
		row: IData,
	) => {
		// HACK: (NEO-2351) actions are being called twice, this fixes that issue
		if (action === row.lastAction) return;

		switch (action) {
			case addten:
				setData(
					data.map((d) => {
						if (d.id === row.id) {
							return {
								...d,
								number: (Number.parseInt(d.number, 10) + 10).toString(),
								lastAction: addten,
							};
						}
						return d;
					}),
				);
				break;

			case minusten:
				setData(
					data.map((d) => {
						if (d.id === row.id) {
							return {
								...d,
								number: (Number.parseInt(d.number, 10) - 10).toString(),
								lastAction: minusten,
							};
						}
						return d;
					}),
				);
				break;

			case reset: {
				const originalData = mockdata.find((d) => d.id === row.id) as IData;
				setData(
					data.map((d) =>
						d.id === row.id ? { ...originalData, lastAction: reset } : d,
					),
				);
				break;
			}

			default:
				break;
		}
	};

	return (
		<Table
			data={data}
			columns={columns}
			showRowHeightMenu={false}
			showSearch={false}
			showPagination={false}
		/>
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
