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
	const close =
		translations.close || defaultTranslations.toolbar.close || "Close";
	const filterColumns =
		translations.filterColumns ||
		defaultTranslations.toolbar.filterColumns ||
		"Filter Columns";

	const { allColumns, setHiddenColumns } = instance;
	console.log({ instance });

	const { filterSheetVisible, toggleFilterSheetVisible } =
		useContext(FilterContext);

	const actionButtons = [
		<Button
			aria-label={apply}
			style={{ color: "black" }}
			variant="primary"
			onClick={toggleFilterSheetVisible}
			key="table-filter-apply-button"
		>
			{apply}
		</Button>,
		<Button
			aria-label={close}
			variant="tertiary"
			onClick={toggleFilterSheetVisible}
			key="table-filter-close-button"
		>
			{close}
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
						console.log(column.getToggleHiddenProps);
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
