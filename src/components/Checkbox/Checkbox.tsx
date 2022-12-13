import clsx from "clsx";
import log from "loglevel";
import React, { forwardRef, ReactNode, useCallback, useId } from "react";

import { handleAccessbilityError } from "utils";
import useControlled from "utils/useControlled";

const logger = log.getLogger("checkbox-logger");
logger.disableAll();

interface BaseCheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "defaultChecked" | "checked" | "type" | "value"
  > {
  defaultChecked?: boolean | "mixed"; // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
  checked?: boolean | "mixed"; // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
  value: string | number;
}

type EnforcedAccessibleLabel =
  | {
      children: ReactNode;
      "aria-label"?: string;
      "aria-labelledby"?: string;
    }
  | {
      children?: ReactNode;
      "aria-label": string;
      "aria-labelledby"?: string;
    }
  | {
      children?: ReactNode;
      "aria-label"?: string;
      "aria-labelledby": string;
    };

export type CheckboxProps = BaseCheckboxProps & EnforcedAccessibleLabel;

/**
 * Checkboxes are used when several choices are available and multiple selections are allowed.
 *
 * @example
 * <Checkbox value="1" name="group-name">Checkbox 1</Checkbox>
 * <Checkbox value="2" name="group-name" aria-label="Checkbox 2" />
 *
 * @see https://design.avayacloud.com/components/web/checkbox-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-checkbox
 */
export const Checkbox = forwardRef(
  (
    {
      checked,
      defaultChecked,
      readOnly,
      className,
      id,
      children,
      onChange = () => null,
      "aria-label": ariaLabel,
      ...rest
    }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const generatedId = useId();
    id = id || generatedId;
    if (!children && !ariaLabel && !rest["aria-labelledby"]) {
      handleAccessbilityError(
        "Checkbox must have an have an accessible label. Please add `children`, an `aria-label`, or an `aria-labelledby` prop."
      );
    }
    const [state, setState] = useControlled({
      controlled: checked,
      default: defaultChecked,
      name: "Checkbox",
    });
    const onChangeHandler = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        logger.debug(
          "clicked",
          state,
          ref && "current" in ref && ref.current && ref.current.checked
        );
        if (state === "mixed") {
          setState(true);
        } else {
          setState(!state);
        }
        onChange(e);
      },
      [state, setState, onChange, ref]
    );

    logger.debug({ checked, defaultChecked, state });
    return (
      <>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          checked={state === "mixed" || state || false}
          aria-checked={state || "false"}
          aria-label={
            ariaLabel ||
            (typeof children === "string" ? (children as string) : undefined)
          }
          className={clsx(
            "neo-check",
            readOnly && "neo-check-readonly",
            state === "mixed" && "neo-check--indeterminate",
            className
          )}
          onChange={onChangeHandler}
          {...rest}
        />

        {/* NOTE: the Neo styles are all on the `label` element, so if there isn't a `label` tag, there's no checkbox. Which is bad. */}
        <label htmlFor={id}>{children}</label>
      </>
    );
  }
);
Checkbox.displayName = "Checkbox";
