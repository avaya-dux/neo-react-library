import log from "loglevel";
import { Children, ReactElement, useCallback, useMemo } from "react";

import { Checkbox, CheckboxProps } from "components/Checkbox";
import { NeoInputWrapper } from "components/NeoInputWrapper";
import { handleAccessbilityError } from "utils";

const logger = log.getLogger("checkboxgroup-logger");
logger.disableAll();

export interface BaseCheckboxGroupProps {
  children: ReactElement<CheckboxProps> | ReactElement<CheckboxProps>[];
  inline?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type EnforcedAccessibleLabel =
  | {
      label: string;
      groupName?: string;
    }
  | {
      label?: string;
      groupName: string;
    };

export type CheckboxGroupProps = BaseCheckboxGroupProps &
  EnforcedAccessibleLabel;

/**
 * Checkbox group is used to render a group of related Checkbox Components.
 * It can be passed label text, or a `groupName` that matches the `htmlFor` of an existing `<label>` tag.
 *
 * @example
<CheckboxGroup
  label="Default Checkbox Group"
  onChange={(e) => setChecked(e.target.value)},
>
  <Checkbox label="Gift" value="gift" />
  <Checkbox
    label="Prime"
    value="prime"
    defaultChecked
  />
</CheckboxGroup>
 *
 * @example
<label htmlFor="checkbox-group">Checkbox Group</label>
<CheckboxGroup
  groupName="checkbox-group"
  onChange={(e) => setChecked(e.target.value)},
>
  <Checkbox label="Gift" value="gift" />
  <Checkbox
    label="Prime"
    value="prime"
    defaultChecked
  />
</CheckboxGroup>
 *
 * @see https://design.avayacloud.com/components/web/checkbox-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-checkbox-group
 */
export const CheckboxGroup = ({
  children,
  groupName,
  label,
  inline,
  helperText,
  error,
  required,
  onChange,
}: CheckboxGroupProps) => {
  if (!groupName && !label) {
    handleAccessbilityError(
      "CheckboxGroup: You must provide either a `groupName` or a `label` prop."
    );
  }

  const htmlForName = useMemo(
    () => groupName || label?.toLowerCase().replace(" ", "-"),
    [groupName, label]
  );

  const helperTextId = useMemo(
    () => (helperText ? `${htmlForName}-helper-text` : undefined),
    [htmlForName, helperText]
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

  const computeCheckboxesJsx = () =>
    Children.map(children, (child, index) => (
      <Checkbox
        aria-describedby={helperTextId}
        key={index}
        name={htmlForName}
        onChange={onChangeHandler}
        {...child.props}
      />
    ));

  return (
    <NeoInputWrapper required={required} error={error}>
      {label && <label htmlFor={htmlForName}>{label}</label>}

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
