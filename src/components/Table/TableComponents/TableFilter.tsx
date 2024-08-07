import { useContext } from "react";
import type { TableInstance } from "react-table";

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
						return (
							<Checkbox key={column.id} {...column.getToggleHiddenProps()}>
								{column.Header}
							</Checkbox>
						);
					})}
				</section>
			</Drawer>
		</>
	);
};
