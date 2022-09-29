import { useMemo, useId } from "react";

export interface RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "id" | "type" | "checked" | "defaultChecked"
  > {
  id?: string;
}
/**
 * A Radio is a control that allows the user to select one option from a set.
 * Should be used with a RadioGroup.
 *
 * @example
 * <RadioGroup
    groupName="Example Radio Group"
    onChange={(e) => console.log(e.target.value)}
  >
    <Radio value="Radio 1">Radio 1</Radio>
    <Radio value="Radio 2" disabled>
      Radio 2
    </Radio>
    <Radio value="Radio 3">Radio 3</Radio>
    <Tooltip label="Radio 4" position="right">
      <Radio value="Radio 4">Radio 4</Radio>
    </Tooltip>
  </RadioGroup>
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-radio-group
 * @see https://design.avayacloud.com/components/web/radio-web
 */
export const Radio: React.FC<RadioProps> = ({
  children,
  id = useId(),
  ...rest
}: RadioProps) => {
  const { value, "aria-label": ariaLabel, disabled } = rest;

  const idForLabel = useMemo(() => `Radio-label-${value}`, [value]);

  return (
    <>
      <input
        {...rest}
        className="neo-radio"
        type="radio"
        id={id}
        disabled={disabled}
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
