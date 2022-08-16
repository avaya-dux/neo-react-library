import { useMemo } from "react";

import { Tooltip } from "components/Tooltip";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  selected?: string; // TODO: and use `checked` (having `RadioGroup` set it)
  tooltip?: string; // TODO: remove and add tooltip in story and test
  label: string;
}

export const Radio = ({
  selected,
  tooltip,
  label,
  checked,
  value,
  ...rest
}: RadioProps) => {
  const idForLabel = useMemo(() => `radio-id-${value}`, [value]);
  const radioTestId = useMemo(() => `Radio-root-${value}`, [value]);
  const labelTestId = useMemo(() => `Radio-label-root-${value}`, [value]);

  const Label = () => {
    return (
      <label htmlFor={idForLabel} data-testid={labelTestId}>
        {label}
      </label>
    );
  };

  return (
    <>
      <input
        {...rest}
        data-testid={radioTestId}
        className="neo-radio"
        type="radio"
        id={idForLabel}
        checked={checked || selected === value}
        value={value}
      />
      {tooltip ? (
        <Tooltip label={tooltip}>
          <Label />
        </Tooltip>
      ) : (
        <Label />
      )}
    </>
  );
};
