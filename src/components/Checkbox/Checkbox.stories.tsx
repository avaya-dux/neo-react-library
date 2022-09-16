import { Meta, Story } from "@storybook/react/types-6-0";
import { useCallback, useRef, useState } from "react";

import { Checkbox, CheckboxProps } from "./";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta<CheckboxProps>;

export const Default = () => {
  return <Checkbox label="example label" name="example" value="1" />;
};

export const DefaultChecked = () => {
  return (
    <Checkbox label="example label" name="example" value="1" defaultChecked />
  );
};

const ControlledTemplate: Story<CheckboxProps> = ({
  checked: checkedProp = false,
  ...rest
}: CheckboxProps) => {
  const ref = useRef(null);
  const [checked, setchecked] = useState<"mixed" | boolean>(checkedProp);
  const onChange = useCallback(() => {
    if (checked === "mixed") {
      setchecked(true);
    } else {
      setchecked((prev) => !prev);
    }
  }, [checked, setchecked]);
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
