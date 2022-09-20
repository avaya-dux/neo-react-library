import { Meta, Story } from "@storybook/react/types-6-0";
import { useCallback, useRef, useState } from "react";

import { Checkbox, CheckboxProps } from "./";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta<CheckboxProps>;

export const Default = () => {
  return (
    <>
      <Checkbox label="example label" name="example" value="1" />
      <Checkbox label="example label" name="example" value="1" defaultChecked />
    </>
  );
};

const ControlledTemplate: Story<CheckboxProps> = ({
  checked: checkedProp = false,
  ...rest
}: CheckboxProps) => {
  const ref = useRef(null);
  const [checked, setChecked] = useState<"mixed" | boolean>(checkedProp);
  const onChange = useCallback(() => {
    if (checked === "mixed") {
      setChecked(true);
    } else {
      setChecked((prev) => !prev);
    }
  }, [checked, setChecked]);
  const allProps = { ...rest, onChange, checked };
  return <Checkbox ref={ref} {...allProps} />;
};

const UncontrolledTemplate: Story<CheckboxProps> = ({
  defaultChecked,
  ...rest
}: CheckboxProps) => {
  const ref = useRef(null);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  }, []);

  return (
    <Checkbox
      ref={ref}
      defaultChecked={defaultChecked}
      onChange={onChange}
      {...rest}
    />
  );
};

export const CheckedAndControlled = ControlledTemplate.bind({});
CheckedAndControlled.args = {
  checked: true,
  label: "example label",
  value: "1",
  disabled: false,
};

export const CheckedAndUncontrolled = UncontrolledTemplate.bind({});
CheckedAndUncontrolled.args = {
  defaultChecked: true,
  label: "example label",
  value: "1",
  disabled: false,
};

export const UncheckedAndControlled = ControlledTemplate.bind({});
UncheckedAndControlled.args = {
  checked: false,
  label: "example label",
  value: "1",
  disabled: false,
};

export const UncheckedAndUncontrolled = UncontrolledTemplate.bind({});
UncheckedAndUncontrolled.args = {
  defaultChecked: false,
  label: "example label",
  value: "1",
  disabled: false,
};

export const MixedAndControlled = ControlledTemplate.bind({});
MixedAndControlled.args = {
  checked: "mixed",
  label: "example label",
  value: "1",
  disabled: false,
};

export const MixedAndUncontrolled = UncontrolledTemplate.bind({});
MixedAndUncontrolled.args = {
  defaultChecked: "mixed",
  label: "example label",
  value: "1",
  disabled: false,
};

export const VoiceOverTest = () => (
  <form>
    <fieldset>
      <legend>Plain checkbox</legend>
      <p>
        VoiceOver announcew [state], [label], [checkbox], after a state change.
      </p>
      <input type="checkbox" id="topping1" />
      <label htmlFor="topping1">Announcing</label>
    </fieldset>
    <fieldset>
      <legend>Neo checkbox</legend>
      <p>
        CSS neo-check breaks VoiceOver announcement. Only [label] is
        announcement.
      </p>
      <input type="checkbox" id="topping2" className="neo-check" />
      <label htmlFor="topping2">Broken</label>
    </fieldset>
    <fieldset>
      <legend>Neo checkbox fixed</legend>
      <p>Assign [aria-label] fixes VoiceOver announcement</p>
      <input
        type="checkbox"
        id="topping3"
        className="neo-check"
        aria-label="Fixed"
      />
      <label htmlFor="topping3">Fixed</label>
    </fieldset>
  </form>
);
