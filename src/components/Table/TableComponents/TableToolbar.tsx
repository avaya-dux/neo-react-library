import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Menu, MenuItem } from "components/Menu";
import { TextInput } from "components/TextInput";

import { FilterContext } from "../helpers";
import { TableToolbarProps } from "../types";
import { TableFilter } from "./TableFilter";

/**
 * TableToolbar is used by the Table component to render the search and action inputs for the table
 *
 * @example
 * <TableToolbar
 *  handleRefresh={handleRefresh}
 *  instance={instance}
 *  readonly={true}
 *  translations={translations}
 * />
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableToolbar = <T extends Record<string, any>>({
  customActionsNode,
  handleCreate,
  handleDelete,
  handleEdit,
  handleRefresh,
  handleRowHeightChange,
  showRowHeightMenu,
  rowHeight,
  instance,
  readonly = false,
  translations,
}: TableToolbarProps<T>) => {
  const {
    data,
    setGlobalFilter,
    rowsById,
    state: { globalFilter, selectedRowIds },
  } = instance;

  const { setRootLevelPageIndex } = useContext(FilterContext);

  const selectedRowIdsStringArray = useMemo(
    () => Object.keys(selectedRowIds),
    [selectedRowIds],
  );

  const [search, setSearch] = useState<string>(globalFilter || "");
  const setSearches = useCallback(
    (searchString: string) => {
      setSearch(searchString);
      setGlobalFilter(searchString);
    },
    [setSearch, setGlobalFilter],
  );

  useEffect(() => {
    // handle data update (e.g. new/more data pulled from server)
    setSearches(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setSearches]);

  const editDisabled = readonly || selectedRowIdsStringArray.length !== 1;
  const deleteDisabled = readonly || selectedRowIdsStringArray.length === 0;

  const { allowColumnFilter } = useContext(FilterContext);

  return (
    <div className="neo-table__actions">
      <div className="neo-table__actions--left neo-table__actions--links">
        {handleCreate && (
          <Button
            disabled={readonly}
            icon="add"
            variant="primary"
            onClick={handleCreate}
          >
            {translations.create}
          </Button>
        )}

        {customActionsNode}

        {handleEdit && editDisabled === false && (
          <Button
            icon="edit"
            variant="tertiary"
            onClick={() => {
              const selectedRowId = selectedRowIdsStringArray[0];
              const selectedRow = rowsById[selectedRowId].original;
              handleEdit(selectedRow);
            }}
          >
            {translations.edit}
          </Button>
        )}

        {handleDelete && deleteDisabled === false && (
          <Button
            icon="trash"
            variant="tertiary"
            status="alert"
            onClick={() => {
              handleDelete(selectedRowIdsStringArray);

              // update row index if necessary
              const currentRowCount = instance.rows.length;
              const currentPageCount = instance.state.pageSize;

              const newRowCount =
                currentRowCount - selectedRowIdsStringArray.length;
              const newPageCount = Math.ceil(newRowCount / currentPageCount);

              const currentPageIndex = instance.state.pageIndex;
              if (currentPageIndex >= newPageCount) {
                setRootLevelPageIndex(newPageCount - 1); // HACK: should be able to use `gotoPage` but it's not working as expected
              }
            }}
          >
            {translations.delete}
          </Button>
        )}
      </div>

      <div
        className="neo-table__actions--right"
        style={{ position: "relative" }}
      >
        <div className="neo-form">
          <TextInput
            aria-label={translations.searchInputPlaceholder}
            placeholder={translations.searchInputPlaceholder}
            startIcon="search"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSearches(e.currentTarget.value);
            }}
          />
        </div>

        {allowColumnFilter && (
          <TableFilter translations={translations} instance={instance} />
        )}

        {handleRefresh && (
          <IconButton
            aria-label={translations.refresh || "Refresh"}
            icon="refresh"
            onClick={handleRefresh}
            shape="square"
            variant="tertiary"
          />
        )}

        {showRowHeightMenu && (
          <Menu
            itemAlignment="right"
            menuRootElement={
              <IconButton
                icon="preferences"
                aria-label={translations.selectRowHeight || "Select row height"}
                variant="tertiary"
                shape="square"
              />
            }
          >
            <MenuItem
              isActive={rowHeight === "large"}
              onClick={() => {
                handleRowHeightChange("large");
              }}
            >
              {translations.large || "Large"}
            </MenuItem>
            <MenuItem
              isActive={rowHeight === "medium"}
              onClick={() => handleRowHeightChange("medium")}
            >
              {translations.medium || "Medium"}
            </MenuItem>
            <MenuItem
              isActive={rowHeight === "compact"}
              onClick={() => handleRowHeightChange("compact")}
            >
              {translations.small || "Small"}
            </MenuItem>
          </Menu>
        )}
      </div>
    </div>
  );
};
