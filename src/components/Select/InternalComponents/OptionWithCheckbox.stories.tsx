import type { Meta, Story } from "@storybook/react";

import { SelectContext, type SelectContextProps } from "../utils/SelectContext";
import { type OptionProps, OptionWithCheckbox } from "./OptionWithCheckbox";

export default {
	title: "Components/Select/OptionWithCheckbox",
	component: OptionWithCheckbox,
} as Meta<OptionProps>;

const contextValue = {
	downshiftProps: {
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
