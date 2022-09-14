import log from "loglevel";
import clsx from "clsx";
import React, { forwardRef, useCallback, useId } from "react";

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

export const Checkbox = forwardRef(
  ({
    checked,
    defaultChecked,
    className,
    id = useId(),
    label,
    onChange = () => null,
    ...rest
  }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>) => {
    if (!label && !rest["aria-label"] && !rest["aria-labelledby"]) {
      handleAccessbilityError(
        "Checkbox must have an have an accessible label. Please add a `label`, `aria-label`, or `aria-labelledby` prop."
      );
    }
    const [state, setstate] = useControlled({ controlled: checked, default: defaultChecked, name: "Checkbox" })
    const onChangeHandler = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        logger.debug("clicked", state, ref && "current" in ref && ref.current && ref.current.checked)
        if (state === "mixed") {
          setstate(true)
        } else {
          setstate(!state)
        }
        onChange(e);
      },
      [state, setstate, onChange]
    )

    logger.debug({ checked, defaultChecked, state });

      return (
      <>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          checked={state === "mixed" || state}
          aria-checked={state}
          className={clsx(
            "neo-check",
            state === "mixed" && "neo-check--indeterminate",
            className
          )}
          onChange={onChangeHandler}
          {...rest}
        />

        {/*
        BUG: the Neo styles are all on the `label` element, so if there isn't a `label`,
        there's no checkbox. Which is bad.
      */}
        <label htmlFor={id}>{label}</label>
      </>
    )
  });
Checkbox.displayName = "Checkbox"