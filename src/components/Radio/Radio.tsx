import { useMemo, useId } from "react";

export interface RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "id" | "type" | "checked"
  > {
  id?: string;
}

export const Radio: React.FC<RadioProps> = ({
  children,
  id = useId(),
  ...rest
}: RadioProps) => {
  const { value, "aria-label": ariaLabel } = rest;

  const idForLabel = useMemo(() => `Radio-label-${value}`, [value]);

  return (
    <>
      <input
        {...rest}
        className="neo-radio"
        type="radio"
        id={id}
        aria-labelledby={idForLabel}
        aria-label={ariaLabel ? ariaLabel : value?.toString()}
      />
      <label id={idForLabel} htmlFor={id}>
        {children}
      </label>
    </>
  );
};

Radio.displayName = "Radio";
