import { useCallback, useEffect, useContext, useState } from "react";
import type { IdType, TableInstance } from "react-table";

import {
	Button,
	Checkbox,
	CheckboxGroup,
	Drawer,
	IconButton,
} from "components";
import { FilterContext, translations as defaultTranslations } from "../helpers";
import type { ITableFilterTranslations } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
type TableFilterProps<T extends Record<string, any>> = {
	translations: ITableFilterTranslations;
	instance: TableInstance<T>;
};

type FilterColumns = {
	id: string;
	hdr: string | undefined | null;
	checked: boolean | "mixed";
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

	const { allColumns, setHiddenColumns } = instance;

	const { filterSheetVisible, toggleFilterSheetVisible } =
		useContext(FilterContext);

	// filteredColumns is a temporary array that is used while the filter Drawer is open.
	const [filteredColumns, setNewAllColumns] = useState<FilterColumns[]>([]);
	const [applyEnabled, setApplyEnabled] = useState<boolean>(false);

	const handleColumnVisibilityChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { checked, value } = e.target;

			//Update filteredColumns array checked value
			const nextColumns = filteredColumns.map((col) => {
				return {
					id: col.id,
					hdr: col.hdr,
					checked: col.id === value ? checked : col.checked,
				};
			});

			setNewAllColumns(nextColumns);
			setApplyEnabled(true);
		},
		[filteredColumns],
	);

	useEffect(() => {
		const newAllCols: FilterColumns[] = [];

		allColumns.map((col) => {
			const colProps = { ...col.getToggleHiddenProps() };
			newAllCols.push({
				id: col.id,
				hdr: col.Header?.toString(),
				checked: colProps.checked,
			});
		});
		setNewAllColumns(newAllCols);
	}, [allColumns]);

	const handleApplyChanges = useCallback(() => {
		const newHiddenColIds: IdType<T>[] = [];
		filteredColumns.forEach((col) => {
			if (!col.checked) {
				newHiddenColIds.push(col.id);
			}
		});

		setHiddenColumns(newHiddenColIds); // Using Table api to hide unchecked columns.
		setApplyEnabled(false);
		toggleFilterSheetVisible();
	}, [
		filteredColumns,
		setHiddenColumns,
		toggleFilterSheetVisible,
	]);

	const actionButtons = [
		<Button
			aria-label={apply}
			onClick={handleApplyChanges}
			disabled={!applyEnabled}
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
				<section id="column-filter">
					<CheckboxGroup
						groupName="TableColumns"
						aria-labelledby="column-filter"
						onChange={handleColumnVisibilityChange}
					>
						{filteredColumns.map((col) => {
							return (
								<Checkbox value={col.id} key={col.id} checked={col.checked}>
									{col.hdr}
								</Checkbox>
							);
						})}
					</CheckboxGroup>
				</section>
			</Drawer>
		</>
	);
};
