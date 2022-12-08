import { Meta, Story } from "@storybook/react/types-6-0";

import { OptionWithCheckbox, OptionProps } from "./OptionWithCheckbox";

export default {
  title: "Components/Select/OptionWithCheckbox",
  component: OptionWithCheckbox,
} as Meta<OptionProps>;

export const Default = () => {
  return <OptionWithCheckbox defaultChecked>Option</OptionWithCheckbox>;
};

const Template: Story<OptionProps> = (props: OptionProps) => {
  return <OptionWithCheckbox {...props}>Option</OptionWithCheckbox>;
};

export const Templated = Template.bind({});
Templated.args = {
  selected: true,
  disabled: true,
};
