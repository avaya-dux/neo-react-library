import { Meta, Story } from "@storybook/react/types-6-0";
import { useCallback, useEffect, useState } from "react";

import { Button, Form } from "components";

import { SelectNative, SelectNativeProps } from ".";

export default {
  title: "Components/Select/Native Select",
  component: SelectNative,
} as Meta<SelectNativeProps>;

const Template: Story<SelectNativeProps> = (props) => (
  <SelectNative {...props}>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </SelectNative>
);

export const Templated = Template.bind({});
Templated.args = {
  label: "Choose a car:",
  helperText: "Example of helper text",
  errorList: ["Error One", "Error Two"],
};

export const FormSubmission = () => {
  const helperTextExample = "example of helper text";
  const [helperText, setHelperText] = useState(helperTextExample);
  const [errorList, setErrorList] = useState<string[]>([]);
  const [chosenCar, setChosenCar] = useState("");

  useEffect(() => {
    if (chosenCar !== "") {
      setHelperText(helperTextExample);
      setErrorList([]);
    }
  }, [chosenCar]);

  return (
    <Form
      inline
      onSubmit={(e) => {
        e.preventDefault();
        alert(`you successfully submitted: ${chosenCar}`);
      }}
    >
      <SelectNative
        defaultValue=""
        errorList={errorList}
        helperText={helperText}
        label="Choose a car:"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setChosenCar(e.target.value)
        }
        required
      >
        <option value="" disabled hidden>
          select an option
        </option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </SelectNative>

      <Button
        style={{ marginRight: 10 }}
        type="submit"
        onClick={() => {
          if (chosenCar === "") {
            setHelperText("");
            setErrorList(["you must select an option"]);
          }
        }}
      >
        Submit
      </Button>

      <Button type="reset" onClick={() => setChosenCar("")}>
        Reset
      </Button>
    </Form>
  );
};

export const LoadOptions = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const fakeLoad = useCallback(() => {
    setLoading(true);
    setOptions([]);
    setTimeout(() => {
      setOptions(["volvo", "saab", "mercedes", "audi"]);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(fakeLoad, [fakeLoad]);

  return (
    <>
      <SelectNative
        label="Choose a car:"
        loading={loading}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setOptions([e.target.value])
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectNative>

      <Button disabled={loading} onClick={fakeLoad}>
        Fake load options
      </Button>
    </>
  );
};
