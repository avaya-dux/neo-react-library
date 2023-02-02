import { Meta, Story } from "@storybook/react/types-6-0";

import { SelectContext, SelectContextProps } from "../utils/SelectContext";
import { OptionProps, OptionWithCheckbox } from "./OptionWithCheckbox";

export default {
  title: "Components/Select/OptionWithCheckbox",
  component: OptionWithCheckbox,
} as Meta<OptionProps>;

const contextValue = {
  downshiftProps: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getItemProps: () => {},
  },
  optionProps: { selectedItemsValues: [] },
  selectProps: { filteredOptions: [] },
};

export const Default = () => {
  return (
    <SelectContext.Provider
      value={contextValue as unknown as SelectContextProps}
    >
      <ul>
        <OptionWithCheckbox index={0} defaultSelected>
          Option
        </OptionWithCheckbox>
      </ul>
    </SelectContext.Provider>
  );
};

const Template: Story<OptionProps> = (props: OptionProps) => {
  return (
    <SelectContext.Provider
      value={contextValue as unknown as SelectContextProps}
    >
      <ul>
        <OptionWithCheckbox {...props}>Option</OptionWithCheckbox>
      </ul>
    </SelectContext.Provider>
  );
};

export const Templated = Template.bind({});
Templated.args = {
  defaultSelected: true,
  disabled: true,
};
