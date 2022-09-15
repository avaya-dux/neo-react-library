import { Checkbox, CheckboxProps } from "components/Checkbox";
import { ReactElement } from "react";

export const DefaultCheckboxArray: ReactElement<CheckboxProps>[] = [
  <Checkbox key = "check1" label="Check 1" value = "Check 1" defaultChecked />,
  <Checkbox key = "check2" label="Check 2" value = "Check 2" />,
  <Checkbox key = "check3" label="Check 3" value = "Check 3" id="checkbox-id" />,
  <Checkbox key = "check4" label="Check 4" value = "Check 4" disabled />,
  <Checkbox key = "check5" label="Check 5" value = "Check 5"  />,
  <Checkbox key = "check6" label="Check 6" value = "Check 6" disabled defaultChecked="mixed" />,
  <Checkbox key = "check7" label="Check 7" value = "Check 7" defaultChecked="mixed" />,
];
