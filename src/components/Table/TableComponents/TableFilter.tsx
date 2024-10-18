import { useCallback, useContext, useEffect, useState } from "react";
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
	handleShowColumnsFilter?: () => void;
};

type FilterColumns = {
	id: string;
	checkboxDisplayText: string | undefined | null;
	checked: boolean | "mixed";
};

// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export const TableFilter = <T extends Record<string, any>>({
	translations,
	instance,
	handleShowColumnsFilter,
}: TableFilterProps<T>) => {
	// translations
	const apply = translations.apply || defaultTranslations.toolbar.apply;
	const cancel = translations.cancel || defaultTranslations.toolbar.cancel;
	const filterColumns =
		translations.filterColumns ||
		defaultTranslations.toolbar.filterColumns ||
		"Filter Columns";

	const { allColumns } = instance;

	const { setHiddenColumns } = useContext(FilterContext);

	const { filterSheetVisible, toggleFilterSheetVisible } =
		useContext(FilterContext);

	// filteredColumns is a temporary array that is used while the filter Drawer is open.
	const [filteredColumns, setNewAllColumns] = useState<FilterColumns[]>([]);
	const [originalVisibleColIds, setOriginalVisibleColIds] = useState<
		IdType<T>[]
	>([]);
	const [applyBtnEnabled, setApplyBtnEnabled] = useState<boolean>(false);

	const onOpenColumnsFilter = useCallback(() => {
		if (handleShowColumnsFilter !== undefined) {
			handleShowColumnsFilter();
		} else {
			toggleFilterSheetVisible();
		}
	}, [handleShowColumnsFilter, toggleFilterSheetVisible]);

	const didColumnsSelectionsChange = useCallback(
		(newVisibleColIds: IdType<T>[]) => {
			if (newVisibleColIds.length < 1) return false; // disable Apply button if no columns are selected.

			if (newVisibleColIds.length !== originalVisibleColIds.length) return true;

			const arraysAreEqual = newVisibleColIds.every((id) =>
				originalVisibleColIds.includes(id),
			);
			return !arraysAreEqual;
		},
		[originalVisibleColIds],
	);

	const handleColumnVisibilityChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { checked, value } = e.target;
			const visibleColumnIds: IdType<T>[] = [];

			//Update filteredColumns array checked value
			const nextColumns = filteredColumns.map((col) => {
				if (
					(col.id === value && checked) ||
					(col.id !== value && col.checked)
				) {
					visibleColumnIds.push(col.id); // Only push visible columns
				}
				return {
					id: col.id,
					checkboxDisplayText: col.checkboxDisplayText,
					checked: col.id === value ? checked : col.checked,
				};
			});

			setNewAllColumns(nextColumns);
			setApplyBtnEnabled(didColumnsSelectionsChange(visibleColumnIds));
		},
		[didColumnsSelectionsChange, filteredColumns],
	);

	useEffect(() => {
		const newAllCols: FilterColumns[] = [];
		const visibleColumnIds: IdType<T>[] = [];

		allColumns.map((col) => {
			const colProps = { ...col.getToggleHiddenProps() };
			newAllCols.push({
				id: col.id,
				checkboxDisplayText: col.Header?.toString(),
				checked: colProps.checked,
			});
			if (colProps.checked) {
				visibleColumnIds.push(col.id);
			}
		});
		setNewAllColumns(newAllCols);
		setOriginalVisibleColIds(visibleColumnIds);
	}, [allColumns]);

	const handleApplyChanges = useCallback(() => {
		const newHiddenColIds: IdType<T>[] = [];
		filteredColumns.forEach((col) => {
			if (!col.checked) {
				newHiddenColIds.push(col.id);
			}
		});
		// notifiy the parent component of the new hidden columns
		setHiddenColumns(newHiddenColIds);
		setApplyBtnEnabled(false);
		toggleFilterSheetVisible();
	}, [filteredColumns, setHiddenColumns, toggleFilterSheetVisible]);

	const actionButtons = [
		<Button
			aria-label={cancel}
			variant="secondary"
			onClick={toggleFilterSheetVisible}
			key="table-filter-cancel-button"
		>
			{cancel}
		</Button>,
		<Button
			aria-label={apply}
			onClick={handleApplyChanges}
			disabled={!applyBtnEnabled}
			key="table-filter-apply-button"
		>
			{apply}
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
				onClick={onOpenColumnsFilter}
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
									{col.checkboxDisplayText}
								</Checkbox>
							);
						})}
					</CheckboxGroup>
				</section>
			</Drawer>
		</>
	);
};
