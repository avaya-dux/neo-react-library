import { AriaAttributes } from "react";

/**
 * If the table is sorted, return the aria-sort value.
 * @param {boolean} isSorted - boolean
 * @param {"descending" | "ascending"} [sortedDir] - The direction of the sort.
 * @returns "none"
 */
export const calculateAriaSortValue = (
  isSorted: boolean,
  sortedDir?: "descending" | "ascending"
): AriaAttributes["aria-sort"] => {
  let result: AriaAttributes["aria-sort"] = "none";

  if (isSorted && sortedDir === "descending") {
    result = "descending";
  } else if (isSorted && sortedDir === "ascending") {
    result = "ascending";
  } else if (isSorted) {
    result = "other";
  }

  return result;
};

/**
 * Given an array of row ids, return an object with the same keys and values.
 * @param rowIds - string[]
 * @returns An object with the rowIds as keys and true as values.
 */
export const convertRowIdsArrayToObject = (rowIds: string[]) => {
  const result: Record<string, boolean> = {};
  rowIds.forEach((rowId) => {
    result[rowId] = true;
  });

  return result;
};
