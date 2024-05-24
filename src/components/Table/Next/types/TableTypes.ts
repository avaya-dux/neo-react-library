import { ColumnDef } from "@tanstack/react-table";

import type { RowHeight } from "../../types";

export interface TableNextProps<T> {
  data: T[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];

  containerClassName?: string;
  pushPaginationDown?: boolean;
  rowHeight?: RowHeight;
  showPagination?: boolean;
  showRowSeparator?: boolean;
}
