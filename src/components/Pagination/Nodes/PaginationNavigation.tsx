import { useMemo } from "react";

import { IconButton } from "components/IconButton";

import { PaginationNavigationProps } from "../PaginationTypes";
import { buildNavItems, calculateMaxNavNodes } from "./helpers";

/**
 * Used to render the individual links that are displayed in
 * the Pagination component for the purpose of navigating to
 * individual "pages". This includes the "left" and "right"
 * arrows, and the "1", "2", "3", etc. links.
 *
 * @example
 * <PaginationNavigation
 *  backIconButtonText={backIconButtonText}
 *  nextIconButtonText={nextIconButtonText}
 *  currentPageIndex={currentPageIndex}
 *  totalPages={totalPages}
 *  onPageChange={onPageChange}
 *  paginationRootWidth={rootWidth}
 * />
 */
export const PaginationNavigation = ({
  backIconButtonText = "previous",
  nextIconButtonText = "next",
  alwaysShowPagination,
  currentPageIndex,
  totalPages,
  onPageChange,
  paginationRootWidth,
}: PaginationNavigationProps) => {
  const navListItems = useMemo(() => {
    const maxNavNodes = calculateMaxNavNodes(paginationRootWidth);

    return buildNavItems(
      currentPageIndex,
      maxNavNodes,
      onPageChange,
      totalPages
    );
  }, [currentPageIndex, totalPages, paginationRootWidth]);

  const leftArrowDisabled = currentPageIndex <= 1;
  const rightArrowDisabled = currentPageIndex >= totalPages;

  return totalPages <= 1 && !alwaysShowPagination ? null : (
    <nav className="neo-pagination" role="navigation" aria-label="pagination">
      <IconButton
        aria-label={backIconButtonText}
        disabled={leftArrowDisabled}
        icon="arrow-left"
        shape="square"
        variant="tertiary"
        style={{ color: leftArrowDisabled ? "gray" : "black" }}
        onClick={(e) => onPageChange(e, currentPageIndex - 1)}
      />

      <ul className="neo-pagination__list">{navListItems}</ul>

      <IconButton
        aria-label={nextIconButtonText}
        disabled={rightArrowDisabled}
        icon="arrow-right"
        shape="square"
        variant="tertiary"
        style={{ color: rightArrowDisabled ? "gray" : "black" }}
        onClick={(e) => onPageChange(e, currentPageIndex + 1)}
      />
    </nav>
  );
};
