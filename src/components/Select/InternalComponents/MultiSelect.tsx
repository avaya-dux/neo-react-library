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
    },
  } = useContext(SelectContext);

  const selectedItemsAsChips = useMemo(
    () =>
      selectedItems.length
        ? selectedItems.map((item, index) => (
            <Chip
              closable
              key={`${item.children}-${index}`}
              onClick={() => toggleItem(item)}
            >
              {item.children}
            </Chip>
          ))
        : null,
    [selectedItems]
  );

  return (
    <div
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
    >
      <span className="neo-multiselect-combo__header">
        {selectedItemsAsChips}

        <button
          {...getToggleButtonProps()}
          className="neo-multiselect__header"
          type="button"
        >
          {selectedItemsAsChips ? <>&nbsp;</> : placeholder}
        </button>
      </span>

      <div
        aria-label={ariaLabel}
        className="neo-multiselect__content"
        {...getMenuProps()}
      >
        <OptionsWithEmptyMessageFallback />
      </div>
    </div>
  );
};
