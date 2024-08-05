import { useContext } from "react";
import type { TableInstance } from "react-table";

import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";
import { IconButton } from "components/IconButton";
import { Sheet } from "components/Sheet";

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
	const clear = translations.clear || defaultTranslations.toolbar.clear;
	const close =
		translations.close || defaultTranslations.toolbar.close || "Close";
	const filterColumns =
		translations.filterColumns ||
		defaultTranslations.toolbar.filterColumns ||
		"Filter Columns";

	const { allColumns, setHiddenColumns } = instance;

	const { filterSheetVisible, toggleFilterSheetVisible } =
		useContext(FilterContext);

	const buttons = [
		<IconButton
			aria-label={close}
			icon="close"
			shape="circle"
			style={{ color: "black" }}
			variant="tertiary"
			onClick={toggleFilterSheetVisible}
			key="table-filter-close-icon-button"
		/>,
	];

	return (
		<>
			<IconButton
				aria-label={filterColumns}
				icon="filter"
				variant="tertiary"
				shape="square"
				className="neo-btn-tbl-toolbar"
				size="large"
				onClick={toggleFilterSheetVisible}
			/>

			<Sheet
				actions={buttons}
				className="neo-table__filters--sheet"
				open={filterSheetVisible}
				slide={filterSheetVisible}
				title={filterColumns}
			>
				<section>
					{allColumns.map((column) => (
						<Checkbox key={column.id} {...column.getToggleHiddenProps()}>
							{column.Header}
						</Checkbox>
					))}
				</section>

				<div
					className="neo-table__filters--sheet__footer"
					style={{ flexWrap: "wrap" }}
				>
					<Button
						onClick={() => setHiddenColumns([])}
						size="wide"
						status="alert"
						variant="tertiary"
					>
						{clear}
					</Button>

					<Button
						onClick={toggleFilterSheetVisible}
						size="wide"
						variant="tertiary"
					>
						{close}
					</Button>
				</div>
			</Sheet>
		</>
	);
};
