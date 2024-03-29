import { useContext } from "react";
import { TableInstance } from "react-table";

import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";
import { IconButton } from "components/IconButton";
import { Sheet } from "components/Sheet";

import { translations as defaultTranslations, FilterContext } from "../helpers";
import { ITableFilterTranslations } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableFilterProps<T extends Record<string, any>> = {
  translations: ITableFilterTranslations;
  instance: TableInstance<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableFilter = <T extends Record<string, any>>({
  translations,
  instance,
}: TableFilterProps<T>) => {
  // translations
  const clear = translations.clear || defaultTranslations.toolbar.clear;
  const close =
    translations.close || defaultTranslations.toolbar.close || "Close";
  const filterColumns =
    translations.filterColumns ||
    defaultTranslations.toolbar.filterColumns ||
    "Filter Columns";

  const { allColumns, setHiddenColumns } = instance;

  const { filterSheetVisible, toggleFilterSheetVisible } =
    useContext(FilterContext);

  const buttons = [
    <IconButton
      aria-label={close}
      icon="close"
      shape="circle"
      style={{ color: "black" }}
      variant="tertiary"
      onClick={toggleFilterSheetVisible}
      key="table-filter-close-icon-button"
    />,
  ];

  return (
    <>
      <IconButton
        aria-label={filterColumns}
        icon="filter"
        shape="square"
        onClick={toggleFilterSheetVisible}
      />

      <Sheet
        actions={buttons}
        className="neo-table__filters--sheet"
        open={filterSheetVisible}
        slide={filterSheetVisible}
        title={filterColumns}
      >
        <section>
          {allColumns.map((column) => (
            <Checkbox key={column.id} {...column.getToggleHiddenProps()}>
              {column.Header}
            </Checkbox>
          ))}
        </section>

        <div
          className="neo-table__filters--sheet__footer"
          style={{ flexWrap: "wrap" }}
        >
          <Button
            onClick={() => setHiddenColumns([])}
            size="wide"
            status="alert"
            variant="tertiary"
          >
            {clear}
          </Button>

          <Button
            onClick={toggleFilterSheetVisible}
            size="wide"
            variant="tertiary"
          >
            {close}
          </Button>
        </div>
      </Sheet>
    </>
  );
};
