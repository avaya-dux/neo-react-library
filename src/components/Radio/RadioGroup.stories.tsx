import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";
import { Tooltip } from "components/Tooltip";
import React, { useState } from "react";

export default {
  title: "Components/Radio Group",
  component: RadioGroup,
};

export const RadioGroupExample = () => {
  const [selectedValue, setSelectedValue] = useState("Radio 1");

  function onRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value);
  }

  return (
    <>
      <RadioGroup
        groupName="Default Radio Group"
        checked="Radio 1"
        onChange={onRadioChange}
      >
        <Radio value="Radio 1">Radio 1</Radio>
        <Radio value="Radio 2" disabled>
          Radio 2
        </Radio>
        <Radio value="Radio 3">Radio 3</Radio>
        <Tooltip label="Radio 4" position="right">
          <Radio value="Radio 4">Radio 4</Radio>
        </Tooltip>
      </RadioGroup>
      <br />
      <p>Selected button is {selectedValue}</p>
    </>
  );
};

export const InlineRadioGroupExample = () => {
  const [selectedValue, setSelectedValue] = useState("Radio 1");

  function onRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value);
  }

  return (
    <>
      <RadioGroup
        groupName="Default Radio Group"
        checked="Radio 1"
        onChange={onRadioChange}
        inline
      >
        <Radio value="Radio 1">Radio 1</Radio>
        <Radio value="Radio 2" disabled>
          Radio 2
        </Radio>
        <Radio value="Radio 3">Radio 3</Radio>
        <Tooltip label="Radio 4">
          <Radio value="Radio 4">Radio 4</Radio>
        </Tooltip>
      </RadioGroup>
      <br />
      <p>Selected button is {selectedValue}</p>
    </>
  );
};
