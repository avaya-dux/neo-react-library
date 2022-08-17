import { Story } from "@storybook/react";

import { CheckboxGroup, CheckboxGroupProps } from "./CheckboxGroup";
import { DefaultCheckboxArray } from "./helpers";

export default {
  title: "Components/Checkbox Group",
  component: CheckboxGroup,
};

const Template: Story<CheckboxGroupProps> = (args: CheckboxGroupProps) => (
  <CheckboxGroup {...args} />
);

export const DefaultCheckboxGroup = Template.bind({});
DefaultCheckboxGroup.args = {
  checkboxes: DefaultCheckboxArray,
  groupName: "Default Checkbox Group",
  defaultChecked: ["Check 1", "Check 4", "Check 6"],
  onChange: () => null,
};

export const InlineCheckboxGroup = Template.bind({});
InlineCheckboxGroup.args = {
  checkboxes: DefaultCheckboxArray,
  groupName: "Inline Checkbox Group",
  defaultChecked: ["Check 1", "Check 4", "Check 6"],
  inline: true,
  onChange: () => null,
};
