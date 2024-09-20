import { Select, SelectOption } from "components/Select";

import type { PaginationProps } from "..";

export const PaginationItemsPerPageSelection = ({
	itemsPerPage,
	itemsPerPageLabel = "Rows",
	itemsPerPageOptions = [20, 50, 100],
	onItemsPerPageChange,
}: Pick<
	PaginationProps,
	| "itemsPerPage"
	| "itemsPerPageLabel"
	| "itemsPerPageOptions"
	| "onItemsPerPageChange"
>) => {
	if (itemsPerPageOptions.length <= 0) {
		return null;
	}

	return (
		<Select
			defaultValue={itemsPerPage.toString()}
			label={itemsPerPageLabel}
			onChange={(value) => {
				onItemsPerPageChange?.(Number.parseInt(value as string, 10));
			}}
		>
			{itemsPerPageOptions.map((option, i) => (
				<SelectOption key={`option-${i}-${option}`} value={option.toString()}>
					{option.toString()}
				</SelectOption>
			))}
		</Select>
	);
};
