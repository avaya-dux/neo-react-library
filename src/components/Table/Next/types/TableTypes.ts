import type { ColumnDef } from "@tanstack/react-table";

import type { RowHeight } from "../../types";
import type { TooltipPosition } from "components/Tooltip";
import type { ITableNextTranslations } from "./TranslationTypes";

export interface TableNextProps<T> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	columns: ColumnDef<T, any>[];
	data: T[];

	// visual options
	containerClassName?: string;
	rowHeight?: RowHeight;
	showRowHeightMenu?: boolean;
	showRowSeparator?: boolean;
	showSearch?: boolean;

	// pagination options
	itemsPerPageOptions?: number[];
	initialStatePageIndex?: number;
	itemDisplayTooltipPosition?: TooltipPosition;
	itemsPerPageTooltipPosition?: TooltipPosition;
	pushPaginationDown?: boolean;

	translations?: ITableNextTranslations;
}
