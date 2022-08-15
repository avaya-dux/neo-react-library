import { useCallback, useEffect, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";

import { Radio, RadioProps } from "./Radio";

export interface RadioGroupProps {
  radios: RadioProps[];
  groupName: string;
  checked: string;
  inline?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroup = ({
  radios,
  groupName,
  checked,
  inline,
  helperText,
  error,
  required,
  onChange,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(checked || "");

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

  const radioButtons = () => {
    return (
      <>
        {radios
          ? radios.map((radio, index) => {
              return (
                <Radio
                  key={index}
                  label={radio.label}
                  value={radio.value}
                  name={groupName}
                  selected={selectedValue}
                  tooltip={radio.tooltip}
                  aria-describedby={helperText}
                  disabled={radio.disabled}
                  onChange={onChangeHandler}
                />
              );
            })
          : null}
      </>
    );
  };

  return (
    <NeoInputWrapper
      data-testid="RadioGroup-root"
      required={required}
      error={error}
    >
      <label htmlFor={groupName}>{groupName}</label>
      {inline ? (
        <div className="neo-input-group--inline">{radioButtons()}</div>
      ) : (
        <>{radioButtons()}</>
      )}
      {helperText && <div className="neo-input-hint">{helperText}</div>}
    </NeoInputWrapper>
  );
};
