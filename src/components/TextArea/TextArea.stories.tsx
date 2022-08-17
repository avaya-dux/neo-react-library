import { Meta, Story } from "@storybook/react/types-6-0";

import { TextArea, TextAreaProps } from "./TextArea";

export default {
  title: "Components/Text Area",
  component: TextArea,
} as Meta<TextAreaProps>;

const Template: Story<TextAreaProps> = (props: TextAreaProps) => (
  <TextArea {...props} />
);

const testTextAreaProps: TextAreaProps = {
  placeholder: "Placeholder",
  helperText: "Some helper text.",
  maxLength: 10,
  translations: {
    remaining: "remaining",
    over: "over",
  },
};

export const Default = Template.bind({});
Default.args = {
  ...testTextAreaProps,
};

export const TextAreaWithErrorState = Template.bind({});
TextAreaWithErrorState.args = {
  label: "Text Area with Error Example",
  helperText: "There is an error",
  maxLength: 10,
  defaultValue: "This is a longer string than max value",
};

export const LockedTextArea = Template.bind({});
LockedTextArea.args = {
  label: "Locked Text Area Example",
  locked: true,
};

export const DisabledTextArea = Template.bind({});
DisabledTextArea.args = {
  placeholder: "Disabled Text Area Example",
  disabled: true,
};
