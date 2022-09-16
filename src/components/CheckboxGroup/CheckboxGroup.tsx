import { useCallback, Children, ReactElement } from "react";

import log from "loglevel";

import { Checkbox, CheckboxProps } from "components/Checkbox";
import { NeoInputWrapper } from "components/NeoInputWrapper";

const logger = log.getLogger("checkboxgroup-logger");
logger.disableAll();

export interface CheckboxGroupProps {
  children: ReactElement<CheckboxProps>[];
  groupName: string;
  inline?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Checkbox group is used to render a group of related Checkbox Components.
 *
 * @example
 * <CheckboxGroup
 *  checkboxes=[
      label: "Check 1",
      value: "Check 1",
      checked: true,
      onChange: () => null,
    },
    {
      label: "Check 2",
      value: "Check 2",
      onChange: () => null,
    },
    ]
    groupName="Default Checkbox Group"
    onChange=() => null,
    />
 *
 */
export const CheckboxGroup = ({
  children,
  groupName,
  inline,
  helperText,
  error,
  required,
  onChange,
}: CheckboxGroupProps) => {
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      logger.debug(e.target.value);
      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  const computeCheckboxesJsx = () => {
    return (
      <>
        {children
          ? Children.map(children, (child, index) => {
              const { label, ...rest } = child.props as CheckboxProps;
              return (
                <Checkbox
                  aria-describedby={helperText}
                  key={index}
                  label={label || ""}
                  name={groupName}
                  onChange={onChangeHandler}
                  {...rest}
                />
              );
            })
          : null}
      </>
    );
  };

  return (
    <NeoInputWrapper
      data-testid="CheckboxGroup-root"
      required={required}
      error={error}
    >
      <label htmlFor={groupName}>{groupName}</label>
      {inline ? (
        <div className="neo-input-group--inline">{computeCheckboxesJsx()}</div>
      ) : (
        <>{computeCheckboxesJsx()}</>
      )}
      {helperText && <div className="neo-input-hint">{helperText}</div>}
    </NeoInputWrapper>
  );
};
