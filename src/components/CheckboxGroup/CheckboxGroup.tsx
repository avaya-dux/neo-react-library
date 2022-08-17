import { useEffect, useState } from "react";

import { Checkbox, CheckboxProps } from "components/Checkbox";
import { NeoInputWrapper } from "components/NeoInputWrapper";

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
  defaultChecked,
  inline,
  helperText,
  error,
  required,
  onChange,
}: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (defaultChecked) {
      setSelectedValues((selectedValues) => [
        ...selectedValues,
        ...defaultChecked,
      ]);
    }
  }, [defaultChecked]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedValues.includes(e.target.value)) {
      setSelectedValues(
        selectedValues.filter(
          (selectedValue) => selectedValue !== e.target.value
        )
      );
    } else {
      setSelectedValues((selectedValues) => [
        ...selectedValues,
        e.target.value,
      ]);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const computeCheckboxesJsx = () => {
    return (
      <>
        {checkboxes
          ? checkboxes.map((checkbox, index) => {
              return (
                <Checkbox
                  aria-describedby={helperText}
                  checked={checkbox.checked}
                  disabled={checkbox.disabled}
                  id={checkbox.id}
                  key={index}
                  label={checkbox.label || ""}
                  name={groupName}
                  onChange={onChangeHandler}
                  value={checkbox.value}
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
