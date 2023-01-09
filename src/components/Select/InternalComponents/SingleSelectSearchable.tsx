import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import { useContext, useEffect } from "react";

import { Chip } from "components/Chip";
import { Keys } from "utils";

import { SelectContext } from "../utils/SelectContext";
import { SelectOptionProps } from "../utils/SelectTypes";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

export const SingleSelectSearchable = () => {
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
    },
  } = useContext(SelectContext);
  const {
    closeMenu,
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    inputValue,
    isOpen,
    reset,
    selectItem,
    setInputValue,
  } = downshiftProps as UseComboboxReturnValue<SelectOptionProps>;

  const { id, onKeyDown, ...restInputProps } = getInputProps();

  // clear the search when dropdown closes (when the user selects an item or clicks away)
  useEffect(() => {
    if (isOpen === false) {
      setInputValue("");
    }
  }, [isOpen, setInputValue]);

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
        {selectedItems[0] && (
          <Chip
            closable
            closeButtonAriaLabel={`Remove ${selectedItems[0].children}`}
            onClose={(e) => {
              e.stopPropagation();
              reset();
            }}
          >
            {selectedItems[0].children}
          </Chip>
        )}

        <input
          {...restInputProps}
          className="neo-input"
          disabled={disabled}
          onKeyDown={(e) => {
            if (
              e.key === Keys.ENTER &&
              filteredOptions.length === 1 &&
              !filteredOptions[0].disabled
            ) {
              e.preventDefault();
              selectItem(filteredOptions[0]);
              closeMenu();
            } else if (e.key === Keys.BACKSPACE && inputValue.length === 0) {
              reset();
            }

            onKeyDown(e);
          }}
        />

        <input
          className="neo-display-none"
          id={id}
          readOnly
          tabIndex={-1}
          value={selectedItems[0]?.value || ""}
        />
      </span>

      <div
        className="neo-multiselect__content"
        aria-label={ariaLabel}
        {...getMenuProps()}
      >
        <ul role="group">
          <OptionsWithEmptyMessageFallback />
        </ul>
      </div>
    </div>
  );
};
