import { Checkbox } from "components/Checkbox";
import { CheckboxGroup } from "components/CheckboxGroup";
import {
	type ChangeEvent,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import type { ColumnInstance } from "react-table";
import { FilterContext } from "../helpers";
import { TableFilterDrawer } from "./TableFilterDrawer";

// given a column, return a default filter UI wrapped in TableFilterDrawer
export const TableColumnFilterDrawer = () => {
	const { filterColumn: column, setFilterColumn } = useContext(FilterContext);
	const [newFilterValue, setNewFilterValue] = useState(column?.filterValue);

	const handleFilterValueOnChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setNewFilterValue(value);
		},
		[],
	);

	const filterComponent = useMemo(() => {
		if (!column) return null;
		const { filter } = column || {};

		if (filter === "checkbox") {
			return <CheckboxGroupFilter column={column} />;
		}
		return (
			<DefaultColumnFilter
				column={column}
				onChange={handleFilterValueOnChange}
			/>
		);
	}, [column, handleFilterValueOnChange]);

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
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const DefaultColumnFilter = <T extends Record<string, any>>({
	column: { filterValue, preFilteredRows },
	onChange,
}: { column: ColumnInstance<T>; onChange: React.ChangeEventHandler }) => {
	const [value, setValue] = useState(filterValue);
	const count = preFilteredRows.length;

	return (
		<input
			value={value}
			onChange={(e) => {
				const value = e.target.value || undefined;
				onChange(e);
				setValue(value);
			}}
			placeholder={`Search ${count} records...`}
		/>
	);
};
/**
 * Define a CheckboxGroupFilter that renders a CheckboxGroup of unique values from a column
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const CheckboxGroupFilter = <T extends Record<string, any>>({
	column,
}: { column: ColumnInstance<T> }) => {
	const {
		// id is the unique id of the column
		id,
		// filterValue is the value of the filter
		filterValue = [],
		// setFilter is a function that sets the filter value
		setFilter,
		// preFilteredRows is an array of rows before filtering
		preFilteredRows,
	} = column;
	const options = useMemo(() => {
		const options = new Set<string>();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return Array.from(options);
	}, [id, preFilteredRows]);
	return (
		<CheckboxGroup
			label={id}
			groupName={id}
			onChange={(e) => {
				const value = e.target.value;
				if (filterValue.includes(value)) {
					setFilter(filterValue.filter((val: string) => val !== value));
				} else {
					setFilter([...filterValue, value]);
				}
			}}
		>
			{options.map((option, index) => (
				<Checkbox
					key={`${index}-${option}`}
					value={option}
					checked={filterValue.includes(option)}
				>
					{option}
				</Checkbox>
			))}
		</CheckboxGroup>
	);
};
