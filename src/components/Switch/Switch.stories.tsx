import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Button } from "components/Button";
import { Form } from "components/Form";

import { Switch, SwitchProps } from "./";

export default {
  title: "Components/Switch",
  component: Switch,
} as Meta<SwitchProps>;

interface DirectionTemplateProps {
  dir: "ltr" | "rtl";
}
const DirectionTemplate: Story<DirectionTemplateProps> = ({
  dir = "ltr",
}: DirectionTemplateProps) => {
  const [checked, setChecked] = useState(false);
  const longText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus non elit eu mollis.";

  return (
    <section style={{ width: 200 }} dir={dir}>
      <Switch onChange={(_e, checked) => alert("Checked -> " + checked)}>
        Alert on toggle
      </Switch>

      <Switch
        checked={checked}
        onChange={(_e, updatedChecked) => setChecked(updatedChecked)}
      >
        Controlled Switch
      </Switch>

      <Switch defaultChecked>Default Checked</Switch>

      <Switch disabled>Disabled Unchecked</Switch>
      <Switch disabled defaultChecked>
        Disabled Checked
      </Switch>
      <Switch defaultChecked dir="rtl">
        Label fixed on left
      </Switch>
      <Switch multiline>
        Long multiline text controlled by parent: {longText}
      </Switch>
      <Switch multiline dir="rtl">
        Long multiline text fixed on left: {longText}
      </Switch>
      <Switch multiline dir="rtl">
        multiline 1 text fixed on left
        <br />
        multiline 2 <br />
        multiline 3
      </Switch>
      <Switch multiline>
        multiline 1 text controlled by parent
        <br />
        multiline 2 <br />
        multiline 3
      </Switch>
    </section>
  );
};

export const Default = DirectionTemplate.bind({});
Default.args = {
  dir: "ltr",
};
export const FormControl = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Form
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={(e: any) => {
        e.preventDefault();
        const tosValue = e.target.elements.ToS.value;
        setSubmitted(true);
        alert(`ToS '${tosValue}', form submitted successfully!`);
      }}
      style={{ width: 300 }}
    >
      <p style={{ paddingBottom: 20 }}>
        Terms of Service Example. User must accept ToS before being allowed to
        proceed.
      </p>

      <Switch required name="ToS" value="accepted">
        Do you accept the Terms of Service?
      </Switch>

      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="reset"
          variant="secondary"
          onClick={() => setSubmitted(false)}
        >
          Reset
        </Button>

        <Button type="submit">Submit</Button>
      </section>

      <p style={{ textAlign: "center" }}>
        Form Submitted: {submitted ? "TRUE" : "FALSE"}
      </p>
    </Form>
  );
};

export const Template: Story<SwitchProps> = (props) => <Switch {...props} />;
Template.args = {
  checked: false,
  children: "Switch Label Text",
  disabled: false,
  error: false,
  multiline: true,
  required: false,
};
