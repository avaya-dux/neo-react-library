import { Table } from "@tanstack/react-table";

import type { IToolbarTranslations, RowHeight } from "components/Table/types";
import { IconButton } from "components/IconButton";
import { Menu, MenuItem } from "components/Menu";
import { TextInput } from "components/TextInput";

export const TableToolbar = ({
  handleRowHeightChange,
  rowHeight,
  showRowHeightMenu,
  showSearch,
  table,
  translations,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
  translations: IToolbarTranslations;

  handleRowHeightChange: (newHeight: RowHeight) => Promise<void> | void;

  rowHeight?: RowHeight;
  showRowHeightMenu?: boolean;
  showSearch?: boolean;
}) => {
  const { setGlobalFilter } = table;

  return (
    <div className="neo-table__actions">
      <div className="neo-table__actions--left"></div>

      <div className="neo-table__actions--right">
        {showSearch && (
          <TextInput
            aria-label={translations.searchInputPlaceholder}
            placeholder={translations.searchInputPlaceholder}
            startIcon="search"
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setGlobalFilter(String(e.target.value));
            }}
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
