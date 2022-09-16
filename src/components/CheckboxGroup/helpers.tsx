import { Checkbox, CheckboxProps } from "components/Checkbox";
import { ReactElement } from "react";

export const checkboxes = (
  checked4: CheckboxProps["checked"],
  checked5: CheckboxProps["checked"]
): ReactElement<CheckboxProps>[] => [
  <Checkbox key="check1" label="Check 1 unchecked" value="unchecked" />,
  <Checkbox
    key="check2"
    label="Check 2 default checked"
    value="default checked"
    defaultChecked
  />,
  <Checkbox
    key="check3"
    label="Check 3 default mixed"
    value="default mixed"
    defaultChecked="mixed"
  />,
  <Checkbox
    key="check4"
    label="Check 4 checked (controlled)"
    value="checked"
    id="check4"
    checked={checked4}
  />,
  <Checkbox
    key="check5"
    label="Check 5 mixed (controlled)"
    value="mixed"
    id="check5"
    checked={checked5}
  />,
];
export const disabledCheckboxes: ReactElement<CheckboxProps>[] = [
  <Checkbox
    key="check1"
    label="disabled unchecked"
    value="disabled unchecked"
    disabled
  />,
  <Checkbox
    key="check2"
    label="disabled default checked"
    value="disabled default checked"
    disabled
    defaultChecked
  />,
  <Checkbox
    key="check3"
    label="disabled default mixed"
    value="disabled default mixed"
    disabled
    defaultChecked="mixed"
  />,
  <Checkbox
    key="check4"
    label="disabled checked (controlled)"
    value="disabled checked"
    disabled
    checked
  />,
  <Checkbox
    key="check5"
    label="disabled mixed (controlled)"
    value="disabled mixed"
    disabled
    checked="mixed"
  />,
];
export const readonlyCheckboxes: ReactElement<CheckboxProps>[] = [
  <Checkbox
    key="check1"
    label="readonly unchecked"
    value="readonly unchecked"
    readOnly
  />,
  <Checkbox
    key="check2"
    label="readonly default checked"
    value="readonly default checked"
    readOnly
    defaultChecked
  />,
  <Checkbox
    key="check3"
    label="readonly default mixed"
    value="readonly default mixed"
    readOnly
    defaultChecked="mixed"
  />,
  <Checkbox
    key="check4"
    label="readonly checked (controlled)"
    value="readonly checked"
    readOnly
    checked
  />,
  <Checkbox
    key="check5"
    label="readonly mixed (controlled)"
    value="readonly mixed"
    readOnly
    checked="mixed"
  />,
];
