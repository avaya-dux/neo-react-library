import clsx from "clsx";
import { useContext, useEffect, useMemo, useState } from "react";

import { Chip } from "components/Chip";
import { usePrevious } from "utils/hooks/usePrevious";

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
      isSmall,
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

  const [a11yMessage, setA11yMessage] = useState<string>("");

  const previousSelectedItems = usePrevious(selectedItems);

  // useEffect(() => {
  //   if (!previousSelectedItems) {
  //     return;
  //   }

  //   if (previousSelectedItems?.length < selectedItems.length) {

  //     const addedItems = selectedItems.filter(
  //       (item) => !previousSelectedItems.includes(item)
  //     );

  //     setA11yMessage(`${addedItems[0].value} has been selected`);

  //   } else {

  //     const removedItems = previousSelectedItems.filter(
  //       (item) => !selectedItems.includes(item)
  //     );

  //     setA11yMessage(`${removedItems[0].value} has been unselected`);
  //   }

  //   // console.log(`previous Selected: ${JSON.stringify(previousSelectedItems)}`);
  //   // console.log(`current Selected: ${JSON.stringify(selectedItems)}`);
  // }, [selectedItems]);

  return (
    <div
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        isSmall && "neo-multiselect--small",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
    >
      <span className="neo-multiselect-combo__header">
        <span className="neo-multiselect__padded-container">
          <button
            {...getToggleButtonProps()}
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
        <OptionsWithEmptyMessageFallback />
      </div>
      <div
        id="a11y-status-message"
        role="status"
        aria-live="polite"
        aria-relevant="additions text"
        tabIndex={-1}
        style={{
          border: "0px",
          clip: "rect(0px, 0px, 0px, 0px)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: "0px",
          position: "absolute",
          width: "1px",
        }}
      >
        {a11yMessage}
      </div>
    </div>
  );
};
