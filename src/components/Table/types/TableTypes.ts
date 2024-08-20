import type { ReactNode } from "react";
import type { TableInstance, TableOptions } from "react-table";

import type {
	IBodyTranslations,
	ITableHeaderTranslations,
	ITableTranslations,
	IToolbarTranslations,
} from ".";

// biome-ignore lint/suspicious/noExplicitAny: We require maximum flexibility here
type AnyRecord = Record<string, any>;

interface ToolbarSharedProps<T extends AnyRecord> {
	readonly?: boolean;
	selectableRows?: "none" | "single" | "multiple";
	customActionsNode?: ReactNode;
	handleCreate?: () => Promise<void> | void;
	handleDelete?: (selectedRowIds: string[]) => Promise<void> | void;
	handleEdit?: (selectedRow: T) => Promise<void> | void;
	handleRefresh?: () => Promise<void> | void;
	showRowHeightMenu?: boolean;
	showSearch?: boolean;
	rowHeight?: RowHeight;
}
export type TableToolbarProps<T extends AnyRecord> = {
	instance: TableInstance<T>;
	translations: IToolbarTranslations;
	handleRowHeightChange: (newHeight: RowHeight) => Promise<void> | void;
} & ToolbarSharedProps<T>;

interface TableHeaderBodySharedProps<T extends AnyRecord> {
	handleRowToggled?: (selectedRowIds: string[], row?: T) => void;
	instance: TableInstance<T>;
	selectableRows: "none" | "single" | "multiple";
}

export type TableHeaderProps<T extends AnyRecord> = {
	translations: ITableHeaderTranslations;
} & TableHeaderBodySharedProps<T>;

export type TableBodyProps<T extends AnyRecord> = {
	showRowSelectionHelper?: boolean;
	translations: IBodyTranslations;
} & TableHeaderBodySharedProps<T>;

export type DataSyncOptionType = "no" | "clear" | "asc" | "desc";
export interface IFilterContext {
	allowColumnFilter: boolean;
	draggableRows: boolean;
	filterSheetVisible: boolean;
	setFilterSheetVisible: (visible: boolean) => void;
	toggleFilterSheetVisible: () => void;
	dataSyncOption: DataSyncOptionType;
	setDataSyncOption: (dataSyncOption: DataSyncOptionType) => void;
	clearSortByFuncRef: React.MutableRefObject<(() => void) | null>;
	hasInsetTable: boolean;
	renderInsetTable: (row: AnyRecord) => ReactNode;
}

export type RowHeight = "compact" | "medium" | "large";

export type TableProps<T extends AnyRecord> = {
	caption?: string;
	id?: string;
	manualPagination?: boolean;
	manualRowCount?: number;
	showPagination?: boolean;
	pushPaginationDown?: boolean;
	draggableRows?: boolean;
	handlePageChange?: (pageIndex: number, pageSize: number) => void;
	itemsPerPageOptions?: number[];
	initialStatePageIndex?: number;
	initialStatePageSize?: number;
	defaultSelectedRowIds?: string[];
	showRowSeparator?: boolean;
	showRowSelectionHelper?: boolean;
	summary?: string;
	containerClassName?: string;
	translations?: ITableTranslations;
} & ToolbarSharedProps<T> &
	TableOptions<T> &
	Pick<TableBodyProps<T>, "handleRowToggled"> &
	Partial<Pick<IFilterContext, "allowColumnFilter">> &
	Partial<Pick<IFilterContext, "renderInsetTable">>;
