import clsx from "clsx";
import { KeyboardEventHandler, KeyboardEvent } from "react";
import useControlled from "utils/useControlled";
import "./OptionWithCheckbox_shim.css";
import { Keys } from "utils";
export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  defaultSelected?: boolean;
}
export const OptionWithCheckbox = ({
  disabled,
  selected,
  defaultSelected,
  defaultChecked,
  onChange,
  tabIndex = 0,
  children,
  ...rest
}: OptionProps) => {
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
      tabIndex={tabIndex}
      className={clsx(
        "neo-option",
        state && "neo-option--selected",
        disabled && "neo-option--disabled"
      )}
      onClick={() => setState(!state)}
      onKeyDown={handleKeyDown}
      aria-selected={state}
      selected={state}
      onChange={onChange}
      disabled={disabled}
      {...rest}
    >
      {children}
    </option>
  );
};
