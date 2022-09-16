import { Story } from "@storybook/react";
import { Button, TextArea } from "components";
import { Checkbox, CheckboxProps } from "components/Checkbox/Checkbox";
import { FormEvent, useCallback, useState } from "react";
import { CheckboxGroup, CheckboxGroupProps } from "./CheckboxGroup";
import { checkboxes, disabledCheckboxes, readonlyCheckboxes } from "./helpers";

export default {
  title: "Components/Checkbox Group",
  component: CheckboxGroup,
};

export const Default = () => {
  return (
    <CheckboxGroup groupName="Single checkbox">
      <Checkbox label="example label" value="1" />
    </CheckboxGroup>
  );
};

const DefaultTemplate: Story<CheckboxGroupProps> = (
  args: CheckboxGroupProps
) => {
  const [checked4, setchecked4] = useState<CheckboxProps["checked"]>(true);
  const [checked5, setchecked5] = useState<CheckboxProps["checked"]>("mixed");
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checkboxId = e.target.id;
      console.log(checkboxId);
      if (checkboxId === "check4") {
        setchecked4(!checked4);
      } else if (checkboxId === "check5") {
        if (checked5 === "mixed") {
          setchecked5(true);
        } else {
          setchecked5(!checked5);
        }
      }
    },
    [checked4, checked5, setchecked4, setchecked5]
  );
  const [checkedValues, setcheckedValues] = useState("");
  const [ariaCheckedValues, setariaCheckedValues] = useState("");
  const [nameCount, setnameCount] = useState(0);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cv = [];
    const av = [];
    const nv = [];
    for (let i = 0; i < 5; i++) {
      const elm = e.currentTarget.elements.item(i) as HTMLInputElement;
      cv.push(elm.checked);
      av.push(elm.ariaChecked);
      nv.push(elm.name === args.groupName ? 1 : 0);
    }
    setcheckedValues(cv.join(", "));
    setariaCheckedValues(av.join(", "));
    setnameCount(nv.reduce((sum, current) => (sum += current)));
  };
  return (
    <>
      <form className="neo-form" onSubmit={onSubmit}>
        <CheckboxGroup {...args} onChange={onChange}>
          {checkboxes(args.groupName, checked4, checked5)}
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </form>
      <TextArea
        id="checkedOutput"
        label="checked values:"
        value={checkedValues}
        readOnly
      />
      <TextArea
        id="ariacheckedOutput"
        label="aria-checked values:"
        value={ariaCheckedValues}
        readOnly
      />
      <TextArea
        id="nameOutput"
        label={`"${args.groupName}" occurence:`}
        value={nameCount}
        readOnly
      />
    </>
  );
};

export const DefaultCheckboxGroup = DefaultTemplate.bind({});
DefaultCheckboxGroup.args = {
  groupName: "default checkbox group",
  required: true,
};

export const InlineDefaultCheckboxGroup = DefaultTemplate.bind({});
InlineDefaultCheckboxGroup.args = {
  groupName: "inline checkbox group",
  inline: true,
};

const DisabledTemplate: Story<CheckboxGroupProps> = ({
  ...args
}: CheckboxGroupProps) => {
  const children = disabledCheckboxes(args.groupName);
  return <CheckboxGroup {...args}>{children}</CheckboxGroup>;
};
export const DisabledCheckboxGroup = DisabledTemplate.bind({});
DisabledCheckboxGroup.args = {
  groupName: "disabled checkbox group",
  onChange: () => null,
};

export const InlineDisabledCheckboxGroup = DisabledTemplate.bind({});
InlineDisabledCheckboxGroup.args = {
  groupName: "inline disabled checkbox group",
  inline: true,
  onChange: () => null,
};

const ReadonlyTemplate: Story<CheckboxGroupProps> = ({
  ...args
}: CheckboxGroupProps) => {
  const children = readonlyCheckboxes(args.groupName);
  return <CheckboxGroup {...args}>{children}</CheckboxGroup>;
};
export const ReadonlyCheckboxGroup = ReadonlyTemplate.bind({});
ReadonlyCheckboxGroup.args = {
  groupName: "readonly checkbox group",
  onChange: () => null,
};

export const InlineReadonlyCheckboxGroup = ReadonlyTemplate.bind({});
InlineReadonlyCheckboxGroup.args = {
  groupName: "inline readonly checkbox group",
  inline: true,
  onChange: () => null,
};
