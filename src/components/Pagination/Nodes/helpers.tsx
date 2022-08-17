import { PaginationProps } from "../PaginationTypes";
import { NavListItemButton } from "./NavListItemButton";

/**
 * @param paginationRootWidth the width of the pagination root element
 *
 * @returns a number that represents how many nodes can fit on the screen
 */
export const calculateMaxNavNodes = (paginationRootWidth: number) => {
  const leftNodeWidth = 40;
  const rightNodeWidth = 40;
  const arrowWidth = 40;
  const navItemWidth = 60;

  const unavailableWidth = leftNodeWidth + rightNodeWidth + arrowWidth * 2;
  const availableWidth = paginationRootWidth - unavailableWidth;
  const availableNodes = Math.floor(availableWidth / navItemWidth);

  return Math.max(availableNodes, 0);
};

/**
 * @param currentPageIndex the currently viewed page
 * @param onPageChange the method that must be called when a nav node is clicked
 * @param totalPages the total number of pages
 *
 * @returns an array of nav nodes (no seperators)
 */
export const buildAllNavItems = (
  currentPageIndex: number,
  onPageChange: PaginationProps["onPageChange"],
  totalPages: number
) => {
  const result = [];

  for (let i = 1; i <= totalPages; i++) {
    result.push(
      <NavListItemButton
        isCurrentPage={i === currentPageIndex}
        key={i}
        onPageChange={onPageChange}
        pageToNavigateTo={i}
      />
    );
  }

  return result;
};

/**
 * Assumes that there are at minimum five nodes available as that is the minimum
 * number of nodes needed to render pagination properly.
 * Also assumes that there are at least five pages, as this method is _only_
 * called by `buildNavItems`, which handles the case of <5 pages.
 *
 * @param currentPageIndex the currently viewed page
 * @param maxNavNodes the maximum number of nodes we can return
 * @param onPageChange the method that must be called when a nav node is clicked
 * @param totalPages the total number of pages
 *
 * @returns an array of nav nodes
 */
export const buildNavItemsWithSeparators = (
  currentPageIndex: number,
  maxNavNodes: number,
  onPageChange: PaginationProps["onPageChange"],
  totalPages: number
) => {
  const result = [];

  const isCurrentIndexWithinThreeOfEnd = totalPages - 3 < currentPageIndex;
  const isCurrentIndexWithinThreeOfStart = currentPageIndex <= 3;

  // NOTE: these are complicated, see tests for implemenation details
  if (isCurrentIndexWithinThreeOfStart && maxNavNodes >= 7) {
    for (let i = 1; i <= 4; i++) {
      result.push(
        <NavListItemButton
          isCurrentPage={i === currentPageIndex}
          key={i}
          onPageChange={onPageChange}
          pageToNavigateTo={i}
        />
      );
    }

    result.push(
      <li key="nav-dots-center">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );

    for (let i = totalPages - 1; i <= totalPages; i++) {
      result.push(
        <NavListItemButton
          key={i}
          onPageChange={onPageChange}
          pageToNavigateTo={i}
        />
      );
    }
  } else if (isCurrentIndexWithinThreeOfEnd && maxNavNodes >= 7) {
    for (let i = 1; i <= 2; i++) {
      result.push(
        <NavListItemButton
          key={i}
          onPageChange={onPageChange}
          pageToNavigateTo={i}
        />
      );
    }

    result.push(
      <li key="nav-dots-center">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );

    for (let i = totalPages - 3; i <= totalPages; i++) {
      result.push(
        <NavListItemButton
          isCurrentPage={i === currentPageIndex}
          key={i}
          onPageChange={onPageChange}
          pageToNavigateTo={i}
        />
      );
    }
  } else if (maxNavNodes >= 7) {
    result.push(
      <NavListItemButton
        key={1}
        onPageChange={onPageChange}
        pageToNavigateTo={1}
      />
    );

    result.push(
      <li key="nav-dots-left">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );

    for (let i = currentPageIndex - 1; i <= currentPageIndex + 1; i++) {
      result.push(
        <NavListItemButton
          isCurrentPage={i === currentPageIndex}
          key={i}
          onPageChange={onPageChange}
          pageToNavigateTo={i}
        />
      );
    }

    result.push(
      <li key="nav-dots-right">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );

    result.push(
      <NavListItemButton
        key={totalPages}
        onPageChange={onPageChange}
        pageToNavigateTo={totalPages}
      />
    );
  } else if (isCurrentIndexWithinThreeOfStart && maxNavNodes >= 5) {
    for (let i = 1; i <= 3; i++) {
      result.push(
        <NavListItemButton
          isCurrentPage={i === currentPageIndex}
          key={i}
          onPageChange={onPageChange}
          pageToNavigateTo={i}
        />
      );
    }

    result.push(
      <li key="nav-dots-center">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );

    result.push(
      <NavListItemButton
        key={totalPages}
        onPageChange={onPageChange}
        pageToNavigateTo={totalPages}
      />
    );
  } else if (isCurrentIndexWithinThreeOfEnd && maxNavNodes >= 5) {
    result.push(
      <NavListItemButton
        key={1}
        onPageChange={onPageChange}
        pageToNavigateTo={1}
      />
    );

    result.push(
      <li key="nav-dots-center">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );

    for (let i = totalPages - 2; i <= totalPages; i++) {
      result.push(
        <NavListItemButton
          isCurrentPage={i === currentPageIndex}
          key={i}
          onPageChange={onPageChange}
          pageToNavigateTo={i}
        />
      );
    }
  } else if (maxNavNodes >= 5) {
    result.push(
      <NavListItemButton
        key={1}
        onPageChange={onPageChange}
        pageToNavigateTo={1}
      />
    );

    result.push(
      <li key="nav-dots-left">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );

    result.push(
      <NavListItemButton
        isCurrentPage
        key={currentPageIndex}
        onPageChange={onPageChange}
        pageToNavigateTo={currentPageIndex}
      />
    );

    result.push(
      <li key="nav-dots-right">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );

    result.push(
      <NavListItemButton
        key={totalPages}
        onPageChange={onPageChange}
        pageToNavigateTo={totalPages}
      />
    );
  } else {
    result.push(
      <NavListItemButton
        isCurrentPage
        key={currentPageIndex}
        onPageChange={onPageChange}
        pageToNavigateTo={currentPageIndex}
      />
    );

    /**
     * Zero is a valid state, it signifies that the page is still being rendered.
     * However, if `maxNavNodes` is any other number at this point in the if-else,
     * then something is wrong.
     */
    if (maxNavNodes !== 0) {
      console.error(
        `\`buildNavItemsWithSeparators\` hit unexexpected use-case: \`maxNavNodes < 5\` \nmaxNavNodes=${maxNavNodes}`
      );
    }
  }

  return result;
};

/**
 * This function calculates the number of pages that can be shown in the
 * pagination navigation and returns an array of nav nodes. It assumes
 * that there are at minimum five nodes available as that is the minimum
 * number of nodes needed to render pagination properly.
 *
 * @param currentPageIndex the currently viewed page
 * @param maxNavNodes the maximum number of nodes we can return
 * @param onPageChange the method that must be called when a nav node is clicked
 * @param totalPages the total number of pages
 *
 * @returns an array of nav nodes
 */
export const buildNavItems = (
  currentPageIndex: number,
  maxNavNodes: number,
  onPageChange: PaginationProps["onPageChange"],
  totalPages: number,
  buildAllNavItemsOverride?: () => React.ReactNode[], // for testing
  buildNavItemsWithSeparatorsOverride?: () => React.ReactNode[] // for testing
) => {
  let result = [];

  if (totalPages < 5 || maxNavNodes >= totalPages) {
    result = buildAllNavItemsOverride
      ? buildAllNavItemsOverride()
      : buildAllNavItems(currentPageIndex, onPageChange, totalPages);
  } else {
    result = buildNavItemsWithSeparatorsOverride
      ? buildNavItemsWithSeparatorsOverride()
      : buildNavItemsWithSeparators(
          currentPageIndex,
          maxNavNodes,
          onPageChange,
          totalPages
        );
  }

  return result;
};
