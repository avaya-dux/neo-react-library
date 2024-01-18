import clsx from "clsx";
import { useContext, useMemo } from "react";

import { Chip } from "components/Chip";

import { SelectContext } from "../utils/SelectContext";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

import "./MultiSelect.css";

export const MultiSelect = () => {
  const {
    downshiftProps: {
      getMenuProps,
      getToggleButtonProps,
      isOpen,
      selectItem: toggleItem, // NOTE: I've adjusted the hook for this case (multi-select) such that the "select" is actually a "toggle" now
    },
    optionProps: { selectedItems, setSelectedItems },
    selectProps: {
      filteredOptions,
      ariaLabel,
      disabled,
      helperId,
      helperText,
      loading,
      size,
    },
  } = useContext(SelectContext);

  const selectedItemsAsChips = useMemo(
    () =>
      selectedItems.length
        ? selectedItems.map((item, index) => (
            <Chip
              key={`${item.children}-${index}`}
              closable
              disabled={disabled}
              closeButtonAriaLabel={`Remove ${item.children}`}
              onClose={() => toggleItem(item)}
            >
              {item.children}
            </Chip>
          ))
        : null,
    [selectedItems, disabled, toggleItem],
  );
  const {
    role,
    "aria-activedescendant": ariaActiveDescendant,
    "aria-labelledby": ariaLabelledby,
    ...restToggleProps
  } = getToggleButtonProps();

  const computedAriaProperty = useMemo(() => {
    if (selectedItems && selectedItems.length > 0) {
      return {
        "aria-label": selectedItems
          .map((item) => item.value)
          .join(" and ")
          .concat(
            `, ${selectedItems.length} of ${filteredOptions.length} selected`,
          ),
      };
    }
    if (ariaLabel) {
      return { "aria-label": ariaLabel };
    }
    return { "aria-labelledby": ariaLabelledby };
  }, [selectedItems, ariaLabel, ariaLabelledby, filteredOptions]);

  return (
    <div
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        size === "sm" && "neo-multiselect--small",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active",
      )}
    >
      <span className="neo-multiselect-combo__header neo-multiselect-combo__header--no-after">
        <span className="neo-multiselect__padded-container">
          <div className="neo-multiselect-combo__buttons-container">
            <button
              {...restToggleProps}
              {...computedAriaProperty}
              className="neo-multiselect__header"
              type="button"
            >
              &nbsp;
            </button>

            <button
              aria-label="clear selections"
              className={clsx(
                "neo-input-edit__icon neo-icon-end",
                "neo-multiselect-clear-icon-button",
                selectedItems.length === 0 && "neo-display-none",
              )}
              type="button"
              disabled={selectedItems.length === 0}
              onClick={() => setSelectedItems([])}
            />
          </div>

          {selectedItemsAsChips}
        </span>
      </span>

      <div
        aria-label={ariaLabel}
        className={clsx(
          "neo-multiselect__content",
          isOpen && "neo-set-keyboard-focus",
        )}
        aria-multiselectable={true}
        {...getMenuProps()}
      >
        <ul role="group">
          <OptionsWithEmptyMessageFallback />
        </ul>
      </div>
    </div>
  );
};
