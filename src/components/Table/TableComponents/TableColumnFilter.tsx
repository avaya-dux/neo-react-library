import { Checkbox } from "components/Checkbox";
import { CheckboxGroup } from "components/CheckboxGroup";
import log from "loglevel";
import { useCallback, useContext, useMemo, useState } from "react";
import type { ColumnInstance, IdType, Row } from "react-table";
import { FilterContext } from "../helpers";
import type {
	AnyRecord,
	ITableHeaderTranslations,
	TableColumnFilterProps,
} from "../types";
import { TableFilterDrawer } from "./TableFilterDrawer";
import { TextInput } from "components/TextInput";

const logger = log.getLogger("table-column-filter-logger");
logger.disableAll();

export { logger as tableColumnFilterLogger };

// Utility function to get the string representation of a column header
const getColumnHeaderString = (column?: ColumnInstance<AnyRecord>) => {
	return column?.render("Header") ?? "";
};

// given a column, return a default filter UI wrapped in TableFilterDrawer
export const TableColumnFilterDrawer = ({
	translations,
	onApplyFilterValue,
	onCancelFilterValue,
}: TableColumnFilterProps) => {
	const { filterColumn: column, setFilterColumn } = useContext(FilterContext);
	const [newFilterValue, setNewFilterValue] = useState(column?.filterValue);

	const handleOnChange = useCallback((value: string | string[]) => {
		logger.debug("handleOnChange value", value);
		setNewFilterValue(value);
	}, []);

	const filterComponent = useMemo(() => {
		if (!column) return null;
		const { Filter } = column || {};
		if (Filter) {
			return column.render("Filter", { onFilterValueChange: handleOnChange });
		}

		const { filter } = column || {};
		if (filter === "includesValue") {
			return (
				<CheckboxGroupFilter
					column={column}
					onChange={handleOnChange}
					translations={translations}
				/>
			);
		}
		return <DefaultColumnFilter column={column} onChange={handleOnChange} />;
	}, [column, translations, handleOnChange]);

	const handleCancel = useCallback(() => {
		if (!column) return;
		const { setFilter, filterValue, id: columnId } = column;
		setFilter?.(filterValue);
		setFilterColumn?.(undefined);
		onCancelFilterValue?.(columnId, filterValue);
	}, [column, setFilterColumn, onCancelFilterValue]);

	const handleApply = useCallback(() => {
		if (!column) return;
		// apply filter
		const { setFilter, id: columnId } = column;
		logger.debug("handleApply newFilterValue", newFilterValue);
		setFilter?.(newFilterValue);
		// clear filter column in context
		setFilterColumn?.(undefined);
		onApplyFilterValue?.(columnId, newFilterValue);
	}, [column, newFilterValue, setFilterColumn, onApplyFilterValue]);

	return (
		<TableFilterDrawer
			title={`Filter by column: ${getColumnHeaderString(column)}`}
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
	label = "Search",
	placeholder,
	helperText = "",
}: {
	column: ColumnInstance<T>;
	onChange: (value: string | string[]) => void;
	label?: string;
	placeholder?: string;
	helperText?: string;
}) => {
	const [value, setValue] = useState(filterValue || "");
	const count = preFilteredRows.length;

	return (
		<TextInput
			label={label}
			value={value}
			helperText={helperText}
			onChange={(e) => {
				const value = e.target.value || "";
				onChange(value);
				setValue(value);
			}}
			placeholder={placeholder || `Search ${count} records...`}
		/>
	);
};

const convertValueToString = (value: unknown): string => {
	if (value instanceof Date) {
		return value.toLocaleDateString();
	}
	return value?.toString() ?? "";
};
/**
 * Define a CheckboxGroupFilter that renders a CheckboxGroup of unique values from a column
 */
export const CheckboxGroupFilter = <T extends AnyRecord>({
	column,
	onChange,
	translations,
}: {
	column: ColumnInstance<T>;
	onChange: (value: string | string[]) => void;
	translations: ITableHeaderTranslations;
}) => {
	const { id, preFilteredRows } = column;
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
			label={translations.checkboxGroupFilterLabel}
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
			{options.map((option: unknown, index: unknown) => {
				const convertedValue = convertValueToString(option);
				return (
					<Checkbox
						key={`${index}-${convertedValue}`}
						value={convertedValue}
						checked={filterValue.includes(convertedValue)}
					>
						{convertedValue}
					</Checkbox>
				);
			})}
		</CheckboxGroup>
	);
};

export const includesValue = <T extends Record<string, unknown>>(
	rows: Row<T>[],
	ids: IdType<T>[],
	filterValue: unknown[],
): Row<T>[] => {
	logger.debug("includesValue filterValue", filterValue);
	return rows.filter((row) => {
		return ids.some((id) => {
			const rowValue = convertValueToString(row.values[id]);
			logger.debug("includesValue rowValue", rowValue);
			return filterValue.includes(rowValue);
		});
	});
};

includesValue.autoRemove = (val: unknown[]): boolean => !val || !val.length;
