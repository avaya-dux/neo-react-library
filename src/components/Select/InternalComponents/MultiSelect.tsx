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
            closeButtonAriaLabel={`Remove ${item.children}`}
            onClose={() => toggleItem(item)}
          >
            {item.children}
          </Chip>
        ))
        : null,
    [selectedItems, toggleItem]
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { role, "aria-activedescendant": ariaActiveDescendant, ...restToggleProps } = getToggleButtonProps();
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
            className="neo-multiselect__header neo-multiselect__header--no-after"
            type="button"
            aria-label={ariaLabel}
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
