import { Meta, Story } from "@storybook/react/types-6-0";

import { Checkbox, CheckboxProps } from "./";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta<CheckboxProps>;

export const Default = () => (
  <Checkbox label="example label" value="1" defaultChecked />
);

const Template: Story<CheckboxProps> = (props: CheckboxProps) => (
  <Checkbox {...props} />
);

export const Templated = Template.bind({});
Templated.args = {
  checked: "mixed",
  label: "example label",
  onChange: () => null,
  value: "1",
};
