import { Meta, Story } from "@storybook/react/types-6-0";

import { OptionProps, OptionWithCheckbox } from "./OptionWithCheckbox";

export default {
  title: "Components/Select/OptionWithCheckbox",
  component: OptionWithCheckbox,
} as Meta<OptionProps>;

export const Default = () => {
  return (
    <ul>
      <OptionWithCheckbox index={0} defaultChecked>
        Option
      </OptionWithCheckbox>
    </ul>
  );
};

const Template: Story<OptionProps> = (props: OptionProps) => {
  return (
    <ul>
      <OptionWithCheckbox {...props}>Option</OptionWithCheckbox>
    </ul>
  );
};

export const Templated = Template.bind({});
Templated.args = {
  selected: true,
  disabled: true,
};
