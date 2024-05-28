/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import type { TableInstance, TableOptions } from "react-table";

import type { TooltipPosition } from "components/Tooltip/TooltipTypes";
import type {
	IBodyTranslations,
	ITableHeaderTranslations,
	ITableTranslations,
	IToolbarTranslations,
} from ".";

interface ToolbarSharedProps<T extends Record<string, any>> {
	readonly?: boolean;
	selectableRows?: "none" | "single" | "multiple";
	customActionsNode?: ReactNode;
	handleCreate?: () => Promise<void> | void;
	handleDelete?: (selectedRowIds: string[]) => Promise<void> | void;
	handleEdit?: (selectedRow: T) => Promise<void> | void;
	handleRefresh?: () => Promise<void> | void;
	showRowHeightMenu?: boolean;
	rowHeight?: RowHeight;
}
export type TableToolbarProps<T extends Record<string, any>> = {
	instance: TableInstance<T>;
	translations: IToolbarTranslations;
	handleRowHeightChange: (newHeight: RowHeight) => Promise<void> | void;
} & ToolbarSharedProps<T>;

interface TableHeaderBodySharedProps<T extends Record<string, any>> {
	handleRowToggled?: (selectedRowIds: string[], row?: T) => void;
	instance: TableInstance<T>;
	selectableRows: "none" | "single" | "multiple";
}

export type TableHeaderProps<T extends Record<string, any>> = {
	translations: ITableHeaderTranslations;
} & TableHeaderBodySharedProps<T>;

export type TableBodyProps<T extends Record<string, any>> = {
	translations: IBodyTranslations;
} & TableHeaderBodySharedProps<T>;

export interface IFilterContext {
	allowColumnFilter: boolean;

	filterSheetVisible: boolean;
	setFilterSheetVisible: (visible: boolean) => void;
	toggleFilterSheetVisible: () => void;
}

export type RowHeight = "compact" | "medium" | "large";

export type TableProps<T extends Record<string, any>> = {
	caption?: string;
	id?: string;
	showPagination?: boolean;
	pushPaginationDown?: boolean;
	itemDisplayTooltipPosition?: TooltipPosition;
	itemsPerPageTooltipPosition?: TooltipPosition;
	itemsPerPageOptions?: number[];
	initialStatePageIndex?: number;
	defaultSelectedRowIds?: string[];
	showRowSeparator?: boolean;
	summary?: string;
	containerClassName?: string;
	translations?: ITableTranslations;
} & ToolbarSharedProps<T> &
	TableOptions<T> &
	Pick<TableBodyProps<T>, "handleRowToggled"> &
	Partial<Pick<IFilterContext, "allowColumnFilter">>;
