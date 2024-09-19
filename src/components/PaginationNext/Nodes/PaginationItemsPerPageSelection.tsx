import { Select, SelectOption } from "components/Select";

import type { PaginationSharedProps } from "../PaginationTypes";

export const PaginationItemsPerPageSelection = ({
	itemsPerPage = 10,
	itemsPerPageOptions = [5, 10, 25, 50],
	onItemsPerPageChange,

	// translations
	itemsPerPageLabel = "Rows",
}: PaginationSharedProps) => {
	if ((itemsPerPageOptions || []).length <= 0) {
		return null;
	}

	return (
		<Select
			defaultValue={itemsPerPage?.toString()}
			label={itemsPerPageLabel as string}
			onChange={(value) => {
				onItemsPerPageChange?.(Number.parseInt(value as string, 10));
			}}
		>
			{itemsPerPageOptions?.map((option, i) => (
				<SelectOption key={`option-${i}-${option}`} value={option.toString()}>
					{option.toString()}
				</SelectOption>
			))}
		</Select>
	);
};
