import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
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
export const TableToolbar = <T extends Record<string, any>>({
  customActionsNode,
  handleCreate,
  handleDelete,
  handleEdit,
  handleRefresh,
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

  const selectedRowIdsStringArray = useMemo(
    () => Object.keys(selectedRowIds),
    [selectedRowIds]
  );

  const [search, setSearch] = useState<string>(globalFilter || "");
  const setSearches = useCallback(
    (searchString) => {
      setSearch(searchString);
      setGlobalFilter(searchString);
    },
    [setSearch, setGlobalFilter]
  );

  useEffect(() => {
    // handle data update (e.g. new/more data pulled from server)
    setSearches(search);
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
            style={{ color: "blue" }}
            variant="tertiary"
          />
        )}
      </div>
    </div>
  );
};
