import { Table } from "@tanstack/react-table";
import { useMemo } from "react";

import { Pagination } from "components/Pagination";
import { PaginationTranslations } from "components/Pagination/PaginationTypes";
import { TooltipPosition } from "components/Tooltip";

import { translations as defaultTranslations } from "../../helpers";

export const TablePagination = ({
  table,
  itemsPerPageOptions,
  itemDisplayTooltipPosition,
  itemsPerPageTooltipPosition,
  translations,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;

  itemsPerPageOptions?: number[];
  itemDisplayTooltipPosition?: TooltipPosition;
  itemsPerPageTooltipPosition?: TooltipPosition;

  translations?: PaginationTranslations;
}) => {
  const paginationTranslations = useMemo(() => {
    return {
      ...defaultTranslations.pagination,
      ...translations,
    };
  }, [translations]);

  const { getPageCount, getRowCount, getState, setPageIndex, setPageSize } =
    table;
  const { pageIndex, pageSize } = getState().pagination;

  const rowCount = getRowCount();

  return getPageCount() < 1 ? undefined : (
    <Pagination
      currentPageIndex={pageIndex + 1}
      itemCount={rowCount}
      itemsPerPage={pageSize}
      itemsPerPageOptions={itemsPerPageOptions}
      onPageChange={(e, newIndex) => {
        e?.preventDefault();
        setPageIndex(newIndex - 1);
      }}
      onItemsPerPageChange={(e, newItemsPerPage) => {
        e?.preventDefault();
        setPageSize(newItemsPerPage);

        // when the user has chosen more rows, and there are thus fewer pages, check if we need to update the current page
        const maxPageIndex = Math.ceil(rowCount / newItemsPerPage);
        if (pageIndex > maxPageIndex) {
          setPageIndex(maxPageIndex - 1);
        }
      }}
      backIconButtonText={paginationTranslations.backIconButtonText}
      itemsPerPageLabel={paginationTranslations.itemsPerPageLabel}
      nextIconButtonText={paginationTranslations.nextIconButtonText}
      tooltipForCurrentPage={paginationTranslations.tooltipForCurrentPage}
      tooltipForShownPagesSelect={
        paginationTranslations.tooltipForShownPagesSelect
      }
      itemDisplayTooltipPosition={itemDisplayTooltipPosition}
      itemsPerPageTooltipPosition={itemsPerPageTooltipPosition}
    />
  );
};
