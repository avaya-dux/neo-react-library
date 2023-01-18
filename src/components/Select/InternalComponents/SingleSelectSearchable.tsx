import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import log from "loglevel";
import { useContext, useEffect } from "react";

import { Chip } from "components/Chip";
import { Keys } from "utils";

import { SelectContext } from "../utils/SelectContext";
import { SelectOptionProps } from "../utils/SelectTypes";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

const logger = log.getLogger("single-select-searchable");
logger.disableAll();

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
      placeholder,
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

  logger.debug(selectedItems[0]);

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
        <span className="neo-multiselect__padded-container">
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
                e.preventDefault();
                selectItem(filteredOptions[0]);
                closeMenu();
              } else if (e.key === Keys.BACKSPACE && inputValue.length === 0) {
                reset();
              }

              onKeyDown(e);
            }}
          />

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
            className="neo-display-none"
            id={id}
            readOnly
            tabIndex={-1}
            value={selectedItems[0]?.value || ""}
          />
        </span>
      </span>

      <div
        className={clsx(
          "neo-multiselect__content",
          isOpen && "neo-set-keyboard-focus"
        )}
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
