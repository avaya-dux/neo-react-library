import { Story } from "@storybook/react";
import { CheckboxProps } from "components/Checkbox/Checkbox";
import { useCallback, useState } from "react";
import { CheckboxGroup, CheckboxGroupProps } from "./CheckboxGroup";
import { checkboxes, disabledCheckboxes, readonlyCheckboxes } from "./helpers";

export default {
  title: "Components/Checkbox Group",
  component: CheckboxGroup,
};

const DefaultTemplate: Story<CheckboxGroupProps> = (args: CheckboxGroupProps) => {
  const [checked4, setchecked4] = useState<CheckboxProps["checked"]>(true);
  const [checked5, setchecked5] = useState<CheckboxProps["checked"]>("mixed");
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checkboxId = e.target.id
      console.log(checkboxId)
      if (checkboxId === "check4") {
        setchecked4(!checked4)
      } else if (checkboxId === "check5") {
        if (checked5 === "mixed") {
          setchecked5(true)
        } else {
          setchecked5(!checked5)
        }
      }
    },
    [checked4, checked5, setchecked4, setchecked5]
  )

  return (<CheckboxGroup {...args} onChange={onChange} >
    {checkboxes(checked4, checked5)}
  </CheckboxGroup>
  );
}


export const DefaultCheckboxGroup = DefaultTemplate.bind({});
DefaultCheckboxGroup.args = {
  groupName: "default checkbox group",
};

export const InlineDefaultCheckboxGroup = DefaultTemplate.bind({});
InlineDefaultCheckboxGroup.args = {
  groupName: "inline checkbox group",
  inline: true,
};

const Template: Story<CheckboxGroupProps> = ({children, ...args}: CheckboxGroupProps) => (
  <CheckboxGroup {...args}>
    {children}
  </CheckboxGroup>
)
export const DisabledCheckboxGroup = Template.bind({});
DisabledCheckboxGroup.args = {
  groupName: "disabled checkbox group",
  children: disabledCheckboxes,
  onChange: () => null,
};

export const InlineDisabledCheckboxGroup = Template.bind({});
InlineDisabledCheckboxGroup.args = {
  groupName: "inline disabled checkbox group",
  children: disabledCheckboxes,
  inline: true,
  onChange: () => null,
};

export const ReadonlyCheckboxGroup = Template.bind({});
ReadonlyCheckboxGroup.args = {
  groupName: "readonly checkbox group",
  children: readonlyCheckboxes,
  onChange: () => null,
};

export const InlineReadonlyCheckboxGroup = Template.bind({});
InlineReadonlyCheckboxGroup.args = {
  groupName: "inline readonly checkbox group",
  children: readonlyCheckboxes,
  inline: true,
  onChange: () => null,
};
