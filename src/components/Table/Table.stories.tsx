/* eslint-disable react/no-unescaped-entities */
import { Meta, Story } from "@storybook/react";
import { useEffect, useMemo, useState } from "react";
import { Column, ColumnInstance } from "react-table";

import {
  Chip,
  Icon,
  List,
  ListItem,
  Menu,
  MenuItem,
  SelectNative,
  Tooltip,
} from "components";
import { Button } from "components/Button";
import { IconNamesType } from "utils";

import { Table, TableProps } from "./";
import { FilledFields, IDataTableMockData } from "./helpers";

export default {
  title: "Components/Table",
  component: Table,
} as Meta<TableProps<IDataTableMockData>>;

export const Default = () => (
  <Table {...FilledFields} caption="Storybook Default Table Example" />
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

export const CustomActions = () => (
  <Table
    {...FilledFields}
    caption="Two Custom Actions and Create"
    handleCreate={() => alert("create")}
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
      </section>
    }
  />
);

export const EditableData = () => {
  const [data, setData] = useState(FilledFields.data);
  const [readonly, setReadonly] = useState(false);

  const [logItems, setLogItems] = useState<string[]>([]);

  useEffect(() => {
    setLogItems(["data modified, new length: " + data.length, ...logItems]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <section>
      <Table
        caption="Editable Rows Table Example"
        columns={FilledFields.columns}
        data={data}
        readonly={readonly}
        selectableRows="multiple"
        handleCreate={() => {
          const newRow: IDataTableMockData = {
            id: "new-row-" + Math.random(),
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
          dataCopy[
            rowToEditIndex
          ].name = `${dataCopy[rowToEditIndex]?.name} (edited)`;

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
  <Table columns={FilledFields.columns} data={[...FilledFields.data]} />
);

export const WithRowSeparator = () => (
  <Table
    showRowSeparator
    columns={FilledFields.columns}
    data={[...FilledFields.data]}
  />
);

// BUG: initial values work, but they are unchangable
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
        data={[...FilledFields.data]}
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
