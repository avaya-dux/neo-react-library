import clsx from "clsx";
import { forwardRef, KeyboardEvent, KeyboardEventHandler, Ref, useContext, useEffect, useState } from "react";

import { Keys } from "utils";
import useControlled from "utils/useControlled";

import { SelectContext } from "../utils/SelectContext";

import "./OptionWithCheckbox_shim.css";

export interface OptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {
  index: number,
  helperId?: string,
  helperText?: string,
  defaultSelected?: boolean;
}
export const OptionWithCheckbox = forwardRef(
  (
    {
      disabled,
      selected,
      defaultSelected,
      defaultChecked,
      tabIndex = -1,
      index,
      helperText,
      helperId,
      children,
      ...rest
    }: OptionProps,
    ref: Ref<HTMLOptionElement>
  ) => {

    const {
      downshiftProps: { getItemProps, highlightedIndex },

      optionProps: { selectedItemsValues },

      selectProps: { filteredOptions },
    } = useContext(SelectContext);

    // const [state, setState] = useControlled({
    //   controlled: selected,
    //   default: defaultSelected || defaultChecked,
    //   name: "OptionWithCheckbox",
    // });

    // const handleKeyDown: KeyboardEventHandler = (
    //   event: KeyboardEvent<HTMLOptionElement>
    // ) => {
    //   if (!disabled) {
    //     switch (event.key) {
    //       case Keys.SPACE:
    //       case Keys.ENTER:
    //         console.log("Key pressed");
    //         setState(!state);
    //         break;
    //     }
    //   }
    // };

    console.log(highlightedIndex)

    console.log(filteredOptions)

    const optionSelf = filteredOptions[index];
    const itemProps = getItemProps({
      item: optionSelf,
      index,
      // disabled,
      // selected: selectedItemsValues.includes(optionSelf.value),
      // value: optionSelf.value,
      "aria-selected": selectedItemsValues.includes(optionSelf.value),
      "aria-describedby": helperText && helperId
    });

    return (
      <li
        ref={ref}
        className={clsx(
          "neo-option",
          itemProps.selected && "neo-option--selected",
          disabled && "neo-option--disabled",
          index === highlightedIndex && "neo-option--focused"

        )}
        // onClick={() => setState(!state)}
        // onKeyDown={handleKeyDown}

        // {...rest}
        {...itemProps}
        disabled={disabled}
      >
        {children}
      </li>
    );
  }
);
OptionWithCheckbox.displayName = "OptionWithCheckbox";
