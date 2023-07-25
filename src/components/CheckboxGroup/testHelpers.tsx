import { Checkbox, CheckboxProps } from "components/Checkbox";
import { ReactElement } from "react";

export const checkboxes = (
  groupName: string,
  checked4: CheckboxProps["checked"],
  checked5: CheckboxProps["checked"],
): ReactElement<CheckboxProps>[] => [
  <Checkbox key="check1" name={groupName} value="unchecked">
    Check 1 unchecked
  </Checkbox>,
  <Checkbox
    key="check2"
    name={groupName}
    value="default checked"
    defaultChecked
  >
    Check 2 default checked
  </Checkbox>,
  <Checkbox
    key="check3"
    name={groupName}
    value="default mixed"
    defaultChecked="mixed"
  >
    Check 3 default mixed
  </Checkbox>,
  <Checkbox
    key="check4"
    name={groupName}
    value="checked"
    id="check4"
    checked={checked4}
  >
    Check 4 checked (controlled)
  </Checkbox>,
  <Checkbox
    key="check5"
    name={groupName}
    value="mixed"
    id="check5"
    checked={checked5}
  >
    Check 5 mixed (controlled)
  </Checkbox>,
];
export const disabledCheckboxes = (
  groupName: string,
): ReactElement<CheckboxProps>[] => [
  <Checkbox key="check1" name={groupName} value="disabled unchecked" disabled>
    disabled unchecked
  </Checkbox>,
  <Checkbox
    key="check2"
    name={groupName}
    value="disabled default checked"
    disabled
    defaultChecked
  >
    disabled default checked
  </Checkbox>,
  <Checkbox
    key="check3"
    name={groupName}
    value="disabled default mixed"
    disabled
    defaultChecked="mixed"
  >
    disabled default mixed
  </Checkbox>,
  <Checkbox
    key="check4"
    name={groupName}
    value="disabled checked"
    disabled
    checked
  >
    disabled checked (controlled)
  </Checkbox>,
  <Checkbox
    key="check5"
    name={groupName}
    value="disabled mixed"
    disabled
    checked="mixed"
  >
    disabled mixed (controlled)
  </Checkbox>,
];
export const readonlyCheckboxes = (
  groupName: string,
): ReactElement<CheckboxProps>[] => [
  <Checkbox key="check1" name={groupName} value="readonly unchecked" readOnly>
    readonly unchecked
  </Checkbox>,
  <Checkbox
    key="check2"
    name={groupName}
    value="readonly default checked"
    readOnly
    defaultChecked
  >
    readonly default checked
  </Checkbox>,
  <Checkbox
    key="check3"
    name={groupName}
    value="readonly default mixed"
    readOnly
    defaultChecked="mixed"
  >
    readonly default mixed
  </Checkbox>,
  <Checkbox
    key="check4"
    name={groupName}
    value="readonly checked"
    readOnly
    checked
  >
    readonly checked (controlled)
  </Checkbox>,
  <Checkbox
    key="check5"
    name={groupName}
    value="readonly mixed"
    readOnly
    checked="mixed"
  >
    readonly mixed (controlled)
  </Checkbox>,
];
