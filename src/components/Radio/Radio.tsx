import { useMemo, useId } from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  id?: string;
}

export const Radio: React.FC<RadioProps> = ({
  children,
  id = useId(),
  checked,
  value,
  ...rest
}: RadioProps) => {
  const idForLabel = useMemo(() => `Radio-label-${value}`, [value]);

  return (
    <>
      <input
        {...rest}
        className="neo-radio"
        type="radio"
        id={id}
        checked={checked}
        value={value}
        aria-labelledby={idForLabel}
        aria-label={value?.toString()}
      />
      <label id={idForLabel} htmlFor={id}>
        {children}
      </label>
    </>
  );
};

Radio.displayName = "Radio";
