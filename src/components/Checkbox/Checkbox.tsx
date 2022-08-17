import clsx from "clsx";
import { useId } from "react";

import { handleAccessbilityError } from "utils";

interface BaseCheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "checked" | "type" | "value"
  > {
  checked?: boolean | "mixed"; // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
  value: string | number;
}

type EnforcedAccessibleLabel =
  | {
      label: string | JSX.Element;
      "aria-label"?: string;
      "aria-labelledby"?: string;
    }
  | {
      label?: string | JSX.Element;
      "aria-label": string;
      "aria-labelledby"?: string;
    }
  | {
      label?: string | JSX.Element;
      "aria-label"?: string;
      "aria-labelledby": string;
    };

export type CheckboxProps = BaseCheckboxProps & EnforcedAccessibleLabel;

/**
 * Checkboxes are used when several choices are available and multiple selections are allowed.
 *
 * @example
 * <Checkbox label="Checkbox 1" value="Checkbox 1" name="Checkbox Group Name"/>
 *
 * @see https://design.avayacloud.com/components/web/checkbox-web
 */

export const Checkbox = ({
  checked,
  className,
  id = useId(),
  label,

  ...rest
}: CheckboxProps) => {
  if (!label && !rest["aria-label"] && !rest["aria-labelledby"]) {
    handleAccessbilityError(
      "Checkbox must have an have an accessible label. Please add a `label`, `aria-label`, or `aria-labelledby` prop."
    );
  }

  if (checked !== undefined && !rest.onChange) {
    handleAccessbilityError(
      "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
    );
  }

  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked === "mixed" || checked}
        className={clsx(
          "neo-check",
          checked === "mixed" && "neo-check--indeterminate",
          className
        )}
        {...rest}
      />

      {/*
        BUG: the Neo styles are all on the `label` element, so if there isn't a `label`,
        there's no checkbox. Which is bad.
      */}
      <label htmlFor={id}>{label}</label>
    </>
  );
};
