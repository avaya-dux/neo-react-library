import {
  Children,
  cloneElement,
  ReactElement,
  useCallback,
  useMemo,
  useId,
} from "react";

import { NeoInputWrapper, Tooltip } from "components";

import "./RadioGroup_shim.css";

export interface RadioGroupProps {
  children: ReactElement | ReactElement[];
  groupName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  disabled?: boolean;
  selected?: string;
  label?: boolean;
  inline?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
}

export const RadioGroup = ({
  children,
  groupName,
  onChange,
  id = useId(),
  disabled,
  selected,
  label,
  inline,
  helperText,
  error,
  required,
}: RadioGroupProps) => {
  const helperTextId = `${id}-helper-text`;

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  const radios = useMemo(
    () =>
      Children.map(children, (child) => {
        let radio;

        const propsToPass = {
          name: groupName,
          "aria-describedby": helperText ? helperText : "",
          onChange: onChangeHandler,
          disabled,
        };

        // NOTE: The below seems kind of hacky, but I was unable to find a better way to make sure
        // that the correct props are passed to child Radios even when wrapped in a Tooltip

        if (child.type === Tooltip) {
          radio = child.props.children as ReactElement;

          const childprops = {
            ...radio.props,
            ...propsToPass,
            disabled: disabled ? disabled : radio.props.disabled,
            checked: radio.props.value === selected,
          };

          const radioWithProps = cloneElement(radio, childprops);

          return cloneElement(child, child.props, radioWithProps);
        } else {
          const childprops = {
            ...child.props,
            ...propsToPass,
            disabled: disabled ? disabled : child.props.disabled,
            checked: child.props.value === selected,
          };

          return cloneElement(child, childprops);
        }
      }),
    [children, selected, groupName, helperText, onChangeHandler]
  );

  return (
    <NeoInputWrapper
      data-testid="RadioGroup-root"
      required={required}
      error={error}
    >
      {label && (
        <label id={id} htmlFor={groupName}>
          {groupName}
        </label>
      )}

      <div
        className={inline ? "neo-input-group--inline" : "neo-radio-group"}
        role="radiogroup"
        aria-labelledby={label ? id : ""}
        aria-label={!label ? groupName : ""}
        aria-describedby={helperText ? helperTextId : ""}
      >
        {radios}
      </div>

      {helperText && (
        <div className="neo-input-hint" id={helperTextId}>
          {helperText}
        </div>
      )}
    </NeoInputWrapper>
  );
};
