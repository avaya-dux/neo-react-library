import {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useId,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";

import "./RadioGroup_shim.css";

export interface RadioGroupProps {
  children: ReactElement | ReactElement[];
  groupName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  checked?: string;
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
  checked,
  label,
  inline,
  helperText,
  error,
  required,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(checked);

  const helperTextId = `${id}-helper-text`;

  useEffect(() => {
    setSelectedValue(checked);
  }, [checked]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    },
    [onChange, setSelectedValue]
  );

  const radios = useMemo(
    () =>
      Children.map(children, (child) => {
        let radio;

        const propsToPass = {
          name: groupName,
          "aria-describedby": helperText ? helperText : "",
          onChange: onChangeHandler,
        };

        // NOTE: The below seems kind of hacky, but I was unable to find a better way to make sure
        // that the correct props are passed to child Radios even when wrapped in a Tooltip

        if ((child.type as FC).displayName === "Tooltip") {
          radio = child.props.children as ReactElement;

          const childprops = {
            ...radio.props,
            ...propsToPass,
            checked: radio.props.value === selectedValue,
          };

          const radioWithProps = cloneElement(radio, childprops);

          return cloneElement(child, child.props, radioWithProps);
        } else {
          const childprops = {
            ...child.props,
            ...propsToPass,
            checked: child.props.value === selectedValue,
          };

          return cloneElement(child, childprops);
        }
      }),
    [children, selectedValue, groupName, helperText, onChangeHandler]
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
