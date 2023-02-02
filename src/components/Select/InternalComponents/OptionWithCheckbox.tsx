import clsx from "clsx";
import { forwardRef, Ref, useContext } from "react";

import { SelectContext } from "../utils/SelectContext";

import "./OptionWithCheckbox_shim.css";

export interface OptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {
  index: number;
  helperId?: string;
  helperText?: string;
  defaultSelected?: boolean;
}
export const OptionWithCheckbox = forwardRef(
  (
    { disabled, index, helperText, helperId, children }: OptionProps,
    ref: Ref<HTMLOptionElement>
  ) => {
    const {
      downshiftProps: { getItemProps, highlightedIndex },

      optionProps: { selectedItemsValues },

      selectProps: { filteredOptions },
    } = useContext(SelectContext);

    const optionSelf = filteredOptions[index] || {};
    const itemProps = getItemProps({
      item: optionSelf,
      index,
      "aria-selected": optionSelf.value
        ? selectedItemsValues.includes(optionSelf.value)
        : false,
      "aria-describedby": helperText && helperId,
      onClick: (event) => {
        if (disabled) (event.nativeEvent as any).preventDownshiftDefault = true;
      },
      onKeyDown: (event) => {
        if (disabled) (event.nativeEvent as any).preventDownshiftDefault = true;
      },
    });

    return (
      <li
        ref={ref}
        className={clsx(
          "neo-option",
          selectedItemsValues.includes(optionSelf.value) &&
            "neo-option--selected",
          disabled && "neo-option--disabled",
          index === highlightedIndex && "neo-option--focused"
        )}
        {...itemProps}
        disabled={disabled}
      >
        {children}
      </li>
    );
  }
);
OptionWithCheckbox.displayName = "OptionWithCheckbox";
