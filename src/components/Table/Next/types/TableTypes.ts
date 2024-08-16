import type { ColumnDef } from "@tanstack/react-table";

import type { RowHeight } from "../../types";
import type { ITableNextTranslations } from "./TranslationTypes";

export interface TableNextProps<T> {
	// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
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
	pushPaginationDown?: boolean;

	translations?: ITableNextTranslations;
}
