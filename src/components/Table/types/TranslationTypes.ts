export interface ITableFilterTranslations {
	clear?: string;
	close?: string;
	apply?: string;
	cancel?: string;
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
}

export interface ITableHeaderTranslations {
	clearSort?: string;
	filterColumn?: string;
	sortAscending?: string;
	sortDescending?: string;
	toggleSortBy?: string;
	dragHandle?: string;
	expandToggle?: string;

	// menu translations
	tableSelectionDropdown: string;
	selectPage: string;
	clearPage: string;
	selectAllPages: string;
	clearAllPages: string;
	selectAll: string;
	clearAll: string;

	// column filter translations
	checkboxGroupFilterLabel: string;
	filterApplied: string;
}

export interface ITableTranslations {
	toolbar: IToolbarTranslations;
	header: ITableHeaderTranslations;
	body: IBodyTranslations;
	pagination: IPaginationTranslations;
}
