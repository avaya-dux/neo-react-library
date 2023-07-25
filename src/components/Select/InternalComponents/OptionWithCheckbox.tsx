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
    {
      disabled,
      index,
      helperText,
      helperId,
      defaultSelected,
      children,
    }: OptionProps,
    ref: Ref<HTMLOptionElement>,
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
      selected: selectedItemsValues.includes(optionSelf.value),
      "aria-selected": selectedItemsValues.includes(optionSelf.value),
      "aria-describedby": helperText && helperId,
      onClick: (event) => {
        // Missing type definitions in Downshift, see https://github.com/downshift-js/downshift/issues/734
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (disabled) (event.nativeEvent as any).preventDownshiftDefault = true;
      },
      onKeyDown: (event) => {
        // Same as above
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (disabled) (event.nativeEvent as any).preventDownshiftDefault = true;
      },
    });

    return (
      <li
        ref={ref}
        className={clsx(
          "neo-option",
          selectedItemsValues.includes(optionSelf.value) || defaultSelected
            ? "neo-option--selected"
            : "",
          disabled && "neo-option--disabled",
          index === highlightedIndex && "neo-option--focused",
        )}
        {...itemProps}
        disabled={disabled}
      >
        {children}
      </li>
    );
  },
);
OptionWithCheckbox.displayName = "OptionWithCheckbox";
