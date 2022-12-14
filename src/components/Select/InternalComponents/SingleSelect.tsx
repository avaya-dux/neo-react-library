import clsx from "clsx";
import { useContext } from "react";

import { SelectContext } from "../utils/SelectContext";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

export const SingleSelect = () => {
  const {
    downshiftProps: { getMenuProps, getToggleButtonProps, isOpen },
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
        <button
          {...getToggleButtonProps()}
          className="neo-multiselect__header"
          type="button"
          aria-label={ariaLabel}
        >
          {selectedItems[0]?.children || placeholder}
        </button>
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
