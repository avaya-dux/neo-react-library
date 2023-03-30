import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import log from "loglevel";
import { useContext, useEffect, useMemo } from "react";
import AutosizeInput from "react-input-autosize";

import { Chip } from "components/Chip";
import { Keys } from "utils";

import { SelectContext } from "../utils/SelectContext";
import { SelectOptionProps } from "../utils/SelectTypes";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

const logger = log.getLogger("multiple-select-searchable");
logger.disableAll();
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
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    inputValue,
    isOpen,
    selectItem: toggleItem, // NOTE: I've adjusted the hook for this case (multi-select) such that the "select" is actually a "toggle" now
    setInputValue,
  } = downshiftProps as UseComboboxReturnValue<SelectOptionProps>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { "aria-expanded": toggleAriaExpanded, ...restToggleProps } =
    getToggleButtonProps();
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
              key={`${item.children}-${index}`}
              closable
              onClose={() => toggleItem(item)}
              closeButtonAriaLabel={`Remove ${item.children}`}
            >
              {item.children}
            </Chip>
          ))
        : null,
    [selectedItems, toggleItem]
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
      <span {...restToggleProps} className="neo-multiselect-combo__header">
        <span className="neo-multiselect__padded-container">
          <AutosizeInput
            {...restInputProps}
            value={inputValue}
            style={{
              border: 0,
              height: "36px",
              display: "inline-block",
              order: "2",
            }}
            inputClassName="neo-input"
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
              logger.debug(e);
              onKeyDown(e);
            }}
            onChange={(e) => {
              logger.debug({ onChangeCalled: e.target.value });
              setInputValue(e.target.value);
            }}
          />
          {selectedItemsAsChips}
        </span>
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
        className={clsx(
          "neo-multiselect__content",
          isOpen && "neo-set-keyboard-focus"
        )}
        {...getMenuProps()}
      >
        <OptionsWithEmptyMessageFallback />
      </div>
    </div>
  );
};
