export interface ITableFilterTranslations {
	clear?: string;
	close?: string;
	filterColumns?: string;
}
export interface IToolbarTranslations extends ITableFilterTranslations {
	create?: string;
	delete?: string;
	edit?: string;
	large?: string;
	medium?: string;
	noDataAvailable?: string;
	refresh?: string;
	rowsPerPage?: string;
	searchInputPlaceholder?: string;
	selectRowHeight?: string;
	small?: string;
}

export interface IBodyTranslations {
	noDataAvailable?: string;
	itemsSelected?: string;
	clearAll?: string;
	selectAll?: string;
}

export interface IPaginationTranslations {
	backIconButtonText?: string;
	itemsPerPageLabel?: string;
	nextIconButtonText?: string;
	tooltipForCurrentPage?: string;
	tooltipForShownPagesSelect?: string;
}

export interface ITableHeaderTranslations {
	clearSort?: string;
	filterColumn?: string;
	clearAll: string;
	selectAll: string;
	clearPage: string;
	selectPage: string;
	items: string;
	tableSelectionDropdown: string;
	sortAscending?: string;
	sortDescending?: string;
	toggleSortBy?: string;
	dragHandle?: string;
}

export interface ITableTranslations {
	toolbar: IToolbarTranslations;
	header: ITableHeaderTranslations;
	body: IBodyTranslations;
	pagination: IPaginationTranslations;
}
