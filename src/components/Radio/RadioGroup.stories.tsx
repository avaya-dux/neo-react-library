import { Story } from "@storybook/react";

import { RadioGroup, RadioGroupProps } from "./RadioGroup";

export default {
  title: "Components/Radio Group",
  component: RadioGroup,
};

const DefaultRadioArray = [
  {
    label: "Radio 1",
    value: "Radio 1",
  },
  {
    label: "Radio 2",
    value: "Radio 2",
  },
  {
    label: "Radio 3",
    value: "Radio 3",
  },
  {
    label: "Radio 4",
    value: "Radio 4",
    disabled: true,
  },
  {
    label: "Radio 5",
    value: "Radio 5",
    disabled: true,
    tooltip: "Tooltip for Radio",
    position: "down",
  },
];

const Template: Story<RadioGroupProps> = (args: RadioGroupProps) => (
  <RadioGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  radios: DefaultRadioArray,
  groupName: "Default Radio Group",
  checked: "Radio 1",
};
