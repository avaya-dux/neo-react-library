import { useCallback, useContext, useState } from "react";
import type { IdType, TableInstance } from "react-table";

import { Button, Checkbox, Drawer, IconButton } from "components";
import { FilterContext, translations as defaultTranslations } from "../helpers";
import type { ITableFilterTranslations } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
type TableFilterProps<T extends Record<string, any>> = {
	translations: ITableFilterTranslations;
	instance: TableInstance<T>;
};

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export const TableFilter = <T extends Record<string, any>>({
	translations,
	instance,
}: TableFilterProps<T>) => {
	// translations
	const apply = translations.apply || defaultTranslations.toolbar.apply;
	const cancel =
		translations.cancel || defaultTranslations.toolbar.cancel || "Cancel";
	const filterColumns =
		translations.filterColumns ||
		defaultTranslations.toolbar.filterColumns ||
		"Filter Columns";

	const { allColumns, setHiddenColumns, visibleColumns } = instance;
	// console.log({ instance });
	console.log({ visibleColumns });

	const { filterSheetVisible, toggleFilterSheetVisible } =
		useContext(FilterContext);

	const actionButtons = [
		<Button
			aria-label={apply}
			onClick={toggleFilterSheetVisible}
			key="table-filter-apply-button"
		>
			{apply}
		</Button>,
		<Button
			aria-label={cancel}
			variant="secondary"
			onClick={toggleFilterSheetVisible}
			key="table-filter-cancel-button"
		>
			{cancel}
		</Button>,
	];

	const [visibleCols, setVisibleCols] = useState(visibleColumns);

	const handleColumnVisibilityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("column checked: ", e.target);
		const newCols:IdType<T>[]= [];

		visibleCols.map((col)=> {
			if (col.id !== "recordingName")
				newCols.push(col.id);
		})
		setHiddenColumns(newCols);
	}, []);

	return (
		<>
			<IconButton
				aria-label={filterColumns}
				icon="filter"
				variant="tertiary"
				shape="square"
				className="neo-table__toolbar-btn"
				size="large"
				onClick={toggleFilterSheetVisible}
			/>

			<Drawer
				title={filterColumns}
				open={filterSheetVisible}
				actions={actionButtons}
			>
				<section>
					{allColumns.map((column) => {
						const colProps = { ...column.getToggleHiddenProps() };
						console.log({colProps});
						console.log("column.id: ", column.id);
						return (
							<Checkbox
								key={column.id}
								id={column.id}
								checked={colProps.checked}
								title={colProps.title}
								onChange={handleColumnVisibilityChange}
							>
								{column.Header}
							</Checkbox>
						);
					})}
				</section>
			</Drawer>
		</>
	);
};
