import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import { useContext, useEffect, useMemo } from "react";

import { Chip } from "components/Chip";
import { Keys } from "utils";

import { SelectContext } from "../utils/SelectContext";
import { SelectOptionProps } from "../utils/SelectTypes";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

export const MultiSelectSearchable = () => {
  const {
    downshiftProps,
    optionProps: { selectedItems },
    selectProps: {
      ariaLabel,
      disabled,
      filteredOptions,
      helperId,
      helperText,
      loading,
      placeholder,
    },
  } = useContext(SelectContext);
  const {
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    inputValue,
    isOpen,
    selectItem: toggleItem, // NOTE: I've adjusted the hook for this case (multi-select) such that the "select" is actually a "toggle" now
    setInputValue,
  } = downshiftProps as UseComboboxReturnValue<SelectOptionProps>;

  const { id, onKeyDown, ...restInputProps } = getInputProps();

  // clear the search when dropdown closes (when the user selects an item or clicks away)
  useEffect(() => {
    if (isOpen === false) {
      setInputValue("");
    }
  }, [isOpen, setInputValue]);

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
      {...getComboboxProps()}
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
    >
      <span
        {...getToggleButtonProps()}
        className="neo-multiselect-combo__header"
      >
        {selectedItemsAsChips}

        <input
          {...restInputProps}
          className="neo-input"
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (
              e.key === Keys.ENTER &&
              filteredOptions.length === 1 &&
              !filteredOptions[0].disabled
            ) {
              toggleItem(filteredOptions[0]);
            } else if (e.key === Keys.BACKSPACE && inputValue.length === 0) {
              toggleItem(selectedItems[selectedItems.length - 1]);
            }

            onKeyDown(e);
          }}
        />

        <input
          className="neo-display-none"
          id={id}
          readOnly
          tabIndex={-1}
          value={selectedItems.map((item) => item.value as string)}
        />
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
