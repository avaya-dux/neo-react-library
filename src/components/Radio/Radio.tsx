import { useMemo, useId } from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  id?: string;
}

export const Radio: React.FC<RadioProps> = ({
  children,
  id = useId(),
  ...rest
}: RadioProps) => {
  const idForLabel = useMemo(() => `Radio-label-${rest.value}`, [rest.value]);

  return (
    <>
      <input
        {...rest}
        className="neo-radio"
        type="radio"
        id={id}
        aria-labelledby={idForLabel}
        aria-label={rest.value?.toString()}
      />
      <label id={idForLabel} htmlFor={id}>
        {children}
      </label>
    </>
  );
};

Radio.displayName = "Radio";
