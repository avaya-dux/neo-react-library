import { Checkbox, CheckboxProps } from "components/Checkbox";
import { ReactElement } from "react";

export const checkboxes = (
  groupName: string,
  checked4: CheckboxProps["checked"],
  checked5: CheckboxProps["checked"]
): ReactElement<CheckboxProps>[] => [
  <Checkbox
    key="check1"
    name={groupName}
    label="Check 1 unchecked"
    value="unchecked"
  />,
  <Checkbox
    key="check2"
    name={groupName}
    label="Check 2 default checked"
    value="default checked"
    defaultChecked
  />,
  <Checkbox
    key="check3"
    name={groupName}
    label="Check 3 default mixed"
    value="default mixed"
    defaultChecked="mixed"
  />,
  <Checkbox
    key="check4"
    name={groupName}
    label="Check 4 checked (controlled)"
    value="checked"
    id="check4"
    checked={checked4}
  />,
  <Checkbox
    key="check5"
    name={groupName}
    label="Check 5 mixed (controlled)"
    value="mixed"
    id="check5"
    checked={checked5}
  />,
];
export const disabledCheckboxes = (
  groupName: string
): ReactElement<CheckboxProps>[] => [
  <Checkbox
    key="check1"
    name={groupName}
    label="disabled unchecked"
    value="disabled unchecked"
    disabled
  />,
  <Checkbox
    key="check2"
    name={groupName}
    label="disabled default checked"
    value="disabled default checked"
    disabled
    defaultChecked
  />,
  <Checkbox
    key="check3"
    name={groupName}
    label="disabled default mixed"
    value="disabled default mixed"
    disabled
    defaultChecked="mixed"
  />,
  <Checkbox
    key="check4"
    name={groupName}
    label="disabled checked (controlled)"
    value="disabled checked"
    disabled
    checked
  />,
  <Checkbox
    key="check5"
    name={groupName}
    label="disabled mixed (controlled)"
    value="disabled mixed"
    disabled
    checked="mixed"
  />,
];
export const readonlyCheckboxes = (
  groupName: string
): ReactElement<CheckboxProps>[] => [
  <Checkbox
    key="check1"
    name={groupName}
    label="readonly unchecked"
    value="readonly unchecked"
    readOnly
  />,
  <Checkbox
    key="check2"
    name={groupName}
    label="readonly default checked"
    value="readonly default checked"
    readOnly
    defaultChecked
  />,
  <Checkbox
    key="check3"
    name={groupName}
    label="readonly default mixed"
    value="readonly default mixed"
    readOnly
    defaultChecked="mixed"
  />,
  <Checkbox
    key="check4"
    name={groupName}
    label="readonly checked (controlled)"
    value="readonly checked"
    readOnly
    checked
  />,
  <Checkbox
    key="check5"
    name={groupName}
    label="readonly mixed (controlled)"
    value="readonly mixed"
    readOnly
    checked="mixed"
  />,
];
