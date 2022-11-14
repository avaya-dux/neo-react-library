import log from "loglevel";
import { Children, ReactElement, useCallback, useMemo } from "react";

import { Checkbox, CheckboxProps } from "components/Checkbox";
import { NeoInputWrapper } from "components/NeoInputWrapper";
import { handleAccessbilityError } from "utils";

const logger = log.getLogger("checkboxgroup-logger");
logger.disableAll();

export interface CheckboxGroupDefaultProps {
  children: ReactElement<CheckboxProps> | ReactElement<CheckboxProps>[];
  groupName: string;
  inline?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type EnforcedAccessibleLabel =
  | {
      ["aria-labelledby"]: string;
      label?: string;
    }
  | {
      ["aria-labelledby"]?: string;
      label: string;
    };

export type CheckboxGroupProps = CheckboxGroupDefaultProps &
  EnforcedAccessibleLabel;

/**
 * Checkbox group is used to render a group of related Checkbox Components.
 * It can be passed label text, or a `groupName` that matches the `htmlFor` of an existing `<label>` tag.
 *
 * @example
<CheckboxGroup
  label="Checkbox Group"
  groupName="checkbox-group"
  onChange={(e) => setChecked(e.target.value)},
>
  <Checkbox value="gift">Gift</Checkbox>
  <Checkbox value="prime" defaultChecked>Prime</Checkbox>
</CheckboxGroup>
 *
 * @example
<label id="checkbox-group-label">Checkbox Group</label>
<CheckboxGroup
  groupName="checkbox-group"
  aria-labelledby="checkbox-group-label"
  onChange={(e) => setChecked(e.target.value)},
>
  <Checkbox value="gift">Gift</Checkbox>
  <Checkbox value="prime" defaultChecked>Prime</Checkbox>
</CheckboxGroup>
 *
 * @see https://design.avayacloud.com/components/web/checkbox-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-checkbox-group
 */
export const CheckboxGroup = ({
  children,
  groupName,
  ["aria-labelledby"]: ariaLabelledBy,
  label,
  inline,
  helperText,
  error,
  required,
  onChange,
}: CheckboxGroupProps) => {
  const labelId = useMemo(
    () => ariaLabelledBy || `${groupName}-label`,
    [groupName, ariaLabelledBy]
  );

  const helperTextId = useMemo(
    () => (helperText ? `${groupName}-helper-text` : undefined),
    [groupName, helperText]
  );

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      logger.debug(e.target.value);
      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  if (!label && !ariaLabelledBy) {
    handleAccessbilityError(
      "CheckboxGroup must have a `label` or `aria-labelledby`"
    );
  }

  const computeCheckboxesJsx = () =>
    Children.map(children, (child, index) => (
      <Checkbox
        aria-describedby={helperTextId}
        key={index}
        name={groupName}
        onChange={onChangeHandler}
        {...child.props}
      />
    ));

  return (
    <NeoInputWrapper
      required={required}
      error={error}
      role="group"
      aria-labelledby={labelId}
    >
      {label && <label id={labelId}>{label}</label>}

      {inline ? (
        <div className="neo-input-group--inline">{computeCheckboxesJsx()}</div>
      ) : (
        <>{computeCheckboxesJsx()}</>
      )}

      {helperText && (
        <div id={helperTextId} className="neo-input-hint">
          {helperText}
        </div>
      )}
    </NeoInputWrapper>
  );
};
