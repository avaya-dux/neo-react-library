import { Tooltip } from "components/Tooltip";

import { PaginationProps } from "..";

export const PaginationItemsPerPageSelection = ({
	itemsPerPage,
	itemsPerPageLabel = "Show: ",
	itemsPerPageOptions = [],
	itemsPerPageTooltipPosition = "auto",
	onItemsPerPageChange,
	tooltipForShownPagesSelect = "items per page",
}: Pick<
	PaginationProps,
	| "itemsPerPage"
	| "itemsPerPageLabel"
	| "itemsPerPageOptions"
	| "onItemsPerPageChange"
	| "tooltipForShownPagesSelect"
	| "itemsPerPageTooltipPosition"
>) => {
	if (itemsPerPageOptions.length <= 0) {
		return null;
	}

	return (
		<Tooltip
			id={`pagination-items-per-page-selection-${tooltipForShownPagesSelect}`}
			label={tooltipForShownPagesSelect}
			position={itemsPerPageTooltipPosition}
		>
			<label>{itemsPerPageLabel}</label>

			{/* // TODO-618: use our Select component when it is available */}
			<select
				aria-label={tooltipForShownPagesSelect}
				defaultValue={itemsPerPage}
				onBlur={(e) => {
					onItemsPerPageChange &&
						onItemsPerPageChange(e, parseInt(e.target.value, 10));
				}}
				onChange={(e) => {
					onItemsPerPageChange &&
						onItemsPerPageChange(e, parseInt(e.target.value, 10));
				}}
			>
				{itemsPerPageOptions.map((option, i) => (
					<option key={`option-${i}-${option}`} value={option}>
						{option}
					</option>
				))}
			</select>
		</Tooltip>
	);
};
