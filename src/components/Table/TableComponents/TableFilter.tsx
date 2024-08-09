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

	const { allColumns, setHiddenColumns, visibleColumns } = instance;
	// console.log({ instance });
	// console.log({ visibleColumns });

	const { filterSheetVisible, toggleFilterSheetVisible } =
		useContext(FilterContext);

	const [newAllColumns, setNewAllColumns] = useState<FilterColumns[]>([]);
	const [newVizColumnIds, setNewVizColumnIds] = useState<IdType<T>[]>([]);

	const handleColumnVisibilityChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			console.log("e.target: ", e.target);
			// const newColumnIds: IdType<T>[] = [...newVizColumnIds];

			const { checked, value } = e.target;

			//Update newAllColumns array checked value
			const nextColumns = newAllColumns.map((col) => {
					 return { id: col.id, hdr: col.hdr, checked: col.id === value ? checked : col.checked }
				}
			);

			setNewAllColumns(nextColumns);

			// if (e.target.checked) {
			// 	//Add column to newVizColumnIds array
			// 	setNewAllColumns([
			// 		...newAllColumns,
			// 		{ id: value, hdr: ariaLabel, checked: checked },
			// 	]);
			// 	// setNewVizColumnIds([...newColumnIds, e.target.id]);
			// } else {
			// 	console.log("Hiding colId: ", value);
			// 	// Remove column from newVizColumnIds array
			// 	// setNewVizColumnIds(newColumnIds.filter((id) => id !== e.target.id));
			// 	setNewAllColumns(newAllColumns.filter((col) => col.id !== value));
			// }
		},
		[newAllColumns],
	);

	useEffect(() => {
		const newAllCols: FilterColumns[] = [];
		// const newVizColIds: IdType<T>[] = [];
		// visibleColumns.map((col) => {
		// 	newVizColIds.push(col.id);
		// });

		allColumns.map((col) => {
			const colProps = { ...col.getToggleHiddenProps() };
			console.log({ colProps });
			newAllCols.push({
				key: col.id,
				id: col.id,
				hdr: col.Header?.toString(),
				checked: colProps.checked,
				title: colProps,
			});
		});
		setNewAllColumns(newAllCols);
		// setNewVizColumnIds(newColumnIds);
	}, [allColumns]);

	const handleApplyChanges = useCallback(() => {
		const newHiddenColumns = allColumns.filter(
			(col) => !newVizColumnIds.includes(col.id),
		);
		const newHiddenColIds = newHiddenColumns.map((col) => col.id);

		setHiddenColumns(newHiddenColIds);
		toggleFilterSheetVisible();
	}, [allColumns, newVizColumnIds, setHiddenColumns, toggleFilterSheetVisible]);

	const actionButtons = [
		<Button
			aria-label={apply}
			onClick={handleApplyChanges}
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
						{newAllColumns.map((col) => {
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
