import type { PaginationProps } from "..";

export const PaginationItemsPerPageSelection = ({
	itemsPerPage,
	itemsPerPageLabel = "Rows",
	itemsPerPageOptions = [],
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
		<label>
			{itemsPerPageLabel}

			{/* // TODO-618: use our Select component when it is available */}
			<select
				defaultValue={itemsPerPage}
				onBlur={(e) => {
					onItemsPerPageChange?.(e, Number.parseInt(e.target.value, 10));
				}}
				onChange={(e) => {
					onItemsPerPageChange?.(e, Number.parseInt(e.target.value, 10));
				}}
			>
				{itemsPerPageOptions.map((option, i) => (
					<option key={`option-${i}-${option}`} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
};
