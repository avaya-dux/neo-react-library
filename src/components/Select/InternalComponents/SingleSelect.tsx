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
    },
  } = useContext(SelectContext);

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
      <button
        {...getToggleButtonProps()}
        className="neo-multiselect__header"
        type="button"
      >
        {selectedItems[0]?.children || placeholder}
      </button>

      <div className="neo-multiselect__content">
        <ul aria-label={ariaLabel} {...getMenuProps()}>
          <OptionsWithEmptyMessageFallback />
        </ul>
      </div>
    </div>
  );
};
