import { useEffect, useId, useRef, useState } from "react";

import {
  PaginationItemDisplay,
  PaginationItemsPerPageSelection,
  PaginationNavigation,
} from "./Nodes/";
import { PaginationProps } from "./PaginationTypes";

import "./Pagination.css";

/**
 * This component is used to render pagination.
 * It can be used as a standalone component.
 * Is also used by the Table component.
 * It is up to the implementer to provide the correct data,
 * Eg, `currentPageIndex`, `itemsPerPage`, ect.
 *
 * @example
 * <Pagination
    currentPageIndex={pageIndex}
    itemCount={itemArray.length}
    itemsPerPage={itemsPerPage}
    itemsPerPageOptions={[1, 5, 10]}
    onPageChange={(e, newIndex) => {
      e?.preventDefault();
      setPageIndex(newIndex);
    }}
    onItemsPerPageChange={(e, newItemsPerPage) => {
      e?.preventDefault();
      setItemsPerPage(newItemsPerPage);
    }}
 * />
 *
 * @see https://design.avayacloud.com/components/web/tables-web
 */
export const Pagination = ({
  id,

  currentPageIndex,
  itemCount,
  itemsPerPage,
  itemsPerPageLabel,
  itemsPerPageOptions,

  alwaysShowPagination,
  itemDisplayType,

  onPageChange,
  onItemsPerPageChange,

  // translations
  backIconButtonText,
  nextIconButtonText,
  tooltipForCurrentPage,
  tooltipForShownPagesSelect,

  // default overrides
  centerNode,
  leftNode,
  rightNode,
}: PaginationProps) => {
  const generatedId = `pagination-${useId()}`;
  id = id || generatedId;
  const rootRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  const [rootWidth, setRootWidth] = useState(0);
  useEffect(() => {
    // TODO: could add a debounce/throttle here
    // example: https://github.com/maslianok/react-resize-detector/blob/ccdb602d683e891386302e5436bf599645a16ba6/src/utils.ts#L16
    const updateRootWidth = () => {
      if (rootRef.current) {
        setRootWidth(rootRef.current.offsetWidth);
      }
    };

    // update root width on window resize
    window.addEventListener("resize", updateRootWidth);
    updateRootWidth();
    return () => window.removeEventListener("resize", updateRootWidth);
  }, [rootRef]);

  return (
    <div className="neo-pagination__row" id={id} ref={rootRef}>
      {leftNode || (
        <PaginationItemDisplay
          tooltipForCurrentPage={tooltipForCurrentPage}
          currentPageIndex={currentPageIndex}
          itemCount={itemCount}
          itemDisplayType={itemDisplayType}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
        />
      )}

      {centerNode || (
        <PaginationNavigation
          backIconButtonText={backIconButtonText}
          nextIconButtonText={nextIconButtonText}
          alwaysShowPagination={alwaysShowPagination}
          currentPageIndex={currentPageIndex}
          totalPages={totalPages}
          onPageChange={onPageChange}
          paginationRootWidth={rootWidth}
        />
      )}

      {rightNode || (
        <PaginationItemsPerPageSelection
          itemsPerPage={itemsPerPage}
          itemsPerPageLabel={itemsPerPageLabel}
          itemsPerPageOptions={itemsPerPageOptions}
          onItemsPerPageChange={onItemsPerPageChange}
          tooltipForShownPagesSelect={tooltipForShownPagesSelect}
        />
      )}
    </div>
  );
};

Pagination.displayName = "Pagination";
