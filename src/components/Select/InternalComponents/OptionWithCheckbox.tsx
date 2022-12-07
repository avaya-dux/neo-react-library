import clsx from "clsx";
import {
  forwardRef,
  KeyboardEventHandler,
  KeyboardEvent,
  Ref,
} from "react";
import useControlled from "utils/useControlled";
import "./OptionWithCheckbox_shim.css";
import { Keys } from "utils";
export interface OptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {
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
      children,
      ...rest
    }: OptionProps,
    ref: Ref<HTMLOptionElement>
  ) => {
    const [state, setState] = useControlled({
      controlled: selected,
      default: defaultSelected || defaultChecked,
      name: "OptionWithCheckbox",
    });

    const handleKeyDown: KeyboardEventHandler = (
      event: KeyboardEvent<HTMLOptionElement>
    ) => {
      if (!disabled) {
        switch (event.key) {
          case Keys.SPACE:
          case Keys.ENTER:
            setState(!state);
            break;
        }
      }
    };
    return (
      <option
        ref={ref}
        tabIndex={tabIndex}
        className={clsx(
          "neo-option",
          state && "neo-option--selected",
          disabled && "neo-option--disabled"
        )}
        onClick={() => setState(!state)}
        onKeyDown={handleKeyDown}
        aria-selected={state}
        disabled={disabled}
        {...rest}
      >
        {children}
      </option>
    );
  }
);
OptionWithCheckbox.displayName = "OptionWithCheckbox";
