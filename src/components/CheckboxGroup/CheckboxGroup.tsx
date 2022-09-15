import { useCallback, useEffect, useState } from "react";

import log from "loglevel";

import { Checkbox, CheckboxProps } from "components/Checkbox";
import { NeoInputWrapper } from "components/NeoInputWrapper";

const logger = log.getLogger("checkboxgroup-logger");
logger.disableAll();

export interface CheckboxGroupProps {
  checkboxes: CheckboxProps[];
  groupName: string;
  defaultChecked?: string[];
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
    defaultChecked=["Check 1", "Check 4", "Check 6"]
    onChange=() => null,
    />
 *
 */
export const CheckboxGroup = ({
  checkboxes,
  groupName,
  inline,
  helperText,
  error,
  required,
  onChange,
}: CheckboxGroupProps) => {

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      logger.debug(e.target.value)
      if (onChange) {
        onChange(e);
      }
    },
    [onChange],
  )
  
  const computeCheckboxesJsx = () => {
    return (
      <>
        {checkboxes
          ? checkboxes.map(({label = "", ...rest}, index) => {
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
