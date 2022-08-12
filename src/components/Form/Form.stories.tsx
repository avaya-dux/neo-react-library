import { Meta, Story } from "@storybook/react/types-6-0";

import { TextInput } from "components";

import { Form, FormProps } from ".";

export default {
  title: "Components/Form Base",
  component: Form,
} as Meta<FormProps>;

const Template: Story<FormProps> = (props) => (
  <Form {...props}>
    <TextInput
      label="Read Only"
      defaultValue="8881112222"
      startAddon="+1"
      readOnly
    />

    <TextInput
      label="Clearable Field"
      defaultValue="Initial Value"
      clearable
      helperText="Click the clear icon inside the input."
    />
  </Form>
);

export const Templated = Template.bind({});
Templated.args = {};
