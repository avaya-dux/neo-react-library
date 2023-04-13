import clsx from "clsx";
import { useContext, useMemo } from "react";

import { Chip } from "components/Chip";

import { SelectContext } from "../utils/SelectContext";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

export const MultiSelect = () => {
  const {
    downshiftProps: {
      getMenuProps,
      getToggleButtonProps,
      isOpen,
      selectItem: toggleItem, // NOTE: I've adjusted the hook for this case (multi-select) such that the "select" is actually a "toggle" now
    },
    optionProps: { selectedItems },
    selectProps: {
      filteredOptions,
      ariaLabel,
      disabled,
      helperId,
      helperText,
      loading,
      placeholder,
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
    [selectedItems, disabled, toggleItem]
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
        "aria-label": selectedItems.map((item) => item.value).join(" and ").concat(`, ${selectedItems.length} of ${filteredOptions.length} selected`),
      };
    }
    if (ariaLabel) {
      return { "aria-label": ariaLabel };
    }
    return { "aria-labelledby": ariaLabelledby };
  }, [selectedItems, ariaLabel, ariaLabelledby]);

  return (
    <div
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        size === "sm" && "neo-multiselect--small",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
    >
      <span className="neo-multiselect-combo__header">
        <span className="neo-multiselect__padded-container">
          <button
            {...restToggleProps}
            {...computedAriaProperty}
            className="neo-multiselect__header neo-multiselect__header--no-after"
            type="button"
          >
            {selectedItemsAsChips ? <>&nbsp;</> : placeholder}
          </button>
          {selectedItemsAsChips}
        </span>
      </span>

      <div
        aria-label={ariaLabel}
        className={clsx(
          "neo-multiselect__content",
          isOpen && "neo-set-keyboard-focus"
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
