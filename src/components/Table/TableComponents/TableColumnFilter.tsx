import { Checkbox } from "components/Checkbox";
import { CheckboxGroup } from "components/CheckboxGroup";
import log from "loglevel";
import { useCallback, useContext, useMemo, useState } from "react";
import type { ColumnInstance, IdType, Row } from "react-table";

import { FilterContext } from "../helpers";
import type { AnyRecord } from "../types";
import { TableFilterDrawer } from "./TableFilterDrawer";
const logger = log.getLogger("table-column-filter-logger");
export { logger as tableColumnFilterLogger };
logger.disableAll();
// given a column, return a default filter UI wrapped in TableFilterDrawer
export const TableColumnFilterDrawer = () => {
	const { filterColumn: column, setFilterColumn } = useContext(FilterContext);
	const [newFilterValue, setNewFilterValue] = useState(column?.filterValue);

	const filterComponent = useMemo(() => {
		if (!column) return null;
		const { filter } = column || {};

		if (filter === "includesValue") {
			return (
				<CheckboxGroupFilter column={column} onChange={setNewFilterValue} />
			);
		}
		return <DefaultColumnFilter column={column} onChange={setNewFilterValue} />;
	}, [column]);

	const handleCancel = useCallback(() => {
		const { setFilter, filterValue } = column || {};
		setFilter?.(filterValue);
		setFilterColumn?.(undefined);
	}, [column, setFilterColumn]);

	const handleApply = useCallback(() => {
		// apply filter
		const { setFilter } = column || {};
		setFilter?.(newFilterValue);
		// clear filter column
		setFilterColumn?.(undefined);
	}, [column, newFilterValue, setFilterColumn]);

	return (
		<TableFilterDrawer
			title="Filter by column"
			open={!!filterComponent}
			handleApply={handleApply}
			handleCancel={handleCancel}
		>
			{filterComponent}
		</TableFilterDrawer>
	);
};
/**
 *  Define a default UI for filtering
 */
export const DefaultColumnFilter = <T extends AnyRecord>({
	column: { filterValue, preFilteredRows },
	onChange,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: { column: ColumnInstance<T>; onChange: React.Dispatch<any> }) => {
	const [value, setValue] = useState(filterValue);
	const count = preFilteredRows.length;

	return (
		<input
			value={value}
			onChange={(e) => {
				const value = e.target.value || undefined;
				onChange(value);
				setValue(value);
			}}
			placeholder={`Search ${count} records...`}
		/>
	);
};
/**
 * Define a CheckboxGroupFilter that renders a CheckboxGroup of unique values from a column
 */
export const CheckboxGroupFilter = <T extends AnyRecord>({
	column,
	onChange,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: { column: ColumnInstance<T>; onChange: React.Dispatch<any> }) => {
	const {
		// id is the unique id of the column
		id,
		// preFilteredRows is an array of rows before filtering
		preFilteredRows,
	} = column;
	logger.debug("CheckboxGroupFilter filterValue", column.filterValue);
	const [filterValue, setFilterValue] = useState(column.filterValue || []);
	logger.debug("CheckboxGroupFilter newFilterValue", filterValue);
	const options = useMemo(() => {
		const options = new Set<string>();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return Array.from(options);
	}, [id, preFilteredRows]);
	logger.debug("CheckboxGroupFilter options", options);
	return (
		<CheckboxGroup
			label={id}
			groupName={id}
			onChange={(e) => {
				const value = e.target.value;
				let newFilter = [];
				if (filterValue.includes(value)) {
					newFilter = filterValue.filter((val: string) => val !== value);
				} else {
					newFilter = [...filterValue, value];
				}
				setFilterValue(newFilter);
				onChange(newFilter);
			}}
		>
			{options.map((option, index) => (
				<Checkbox
					key={`${index}-${option}`}
					value={option}
					checked={filterValue.includes(option.toString())}
				>
					{option.toString()}
				</Checkbox>
			))}
		</CheckboxGroup>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const includesValue = <T extends Record<string, any>>(
	rows: Row<T>[],
	ids: IdType<T>[],
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	filterValue: any[],
): Row<T>[] => {
	logger.debug("includesValue filterValue", filterValue);
	return rows.filter((row) => {
		return ids.some((id) => {
			const rowValue = row.values[id];
			logger.debug("includesValue rowValue", rowValue);
			return filterValue.includes(rowValue.toString());
		});
	});
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
includesValue.autoRemove = (val: any): boolean => !val || !val.length;
