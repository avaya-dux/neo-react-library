import type { Story } from "@storybook/react";
import { type FormEvent, useCallback, useState } from "react";

import { Button, TextArea } from "components";
import { Checkbox, type CheckboxProps } from "components/Checkbox/Checkbox";

import { CheckboxGroup, type CheckboxGroupProps } from "./CheckboxGroup";
import {
	checkboxes,
	disabledCheckboxes,
	readonlyCheckboxes,
} from "./testHelpers";

export default {
	title: "Components/Checkbox Group",
	component: CheckboxGroup,
};

export const Default = () => {
	return (
		<CheckboxGroup groupName="checkbox-group" label="Checkbox Group">
			<Checkbox value="1">example value</Checkbox>
			<Checkbox value="2">another value</Checkbox>
		</CheckboxGroup>
	);
};

export const UseOfSeperateLabel = () => {
	return (
		<>
			<div id="checkbox-group-label">Seperate Label for Group</div>
			<CheckboxGroup
				groupName="checkbox-group"
				aria-labelledby="checkbox-group-label"
			>
				<Checkbox value="1">example value</Checkbox>
				<Checkbox value="2">another value</Checkbox>
			</CheckboxGroup>
		</>
	);
};

const DefaultTemplate: Story<CheckboxGroupProps> = (
	args: CheckboxGroupProps,
) => {
	const [checked4, setChecked4] = useState<CheckboxProps["checked"]>(true);
	const [checked5, setChecked5] = useState<CheckboxProps["checked"]>("mixed");
	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const checkboxId = e.target.id;
			console.log(checkboxId);
			if (checkboxId === "check4") {
				setChecked4(!checked4);
			} else if (checkboxId === "check5") {
				if (checked5 === "mixed") {
					setChecked5(true);
				} else {
					setChecked5(!checked5);
				}
			}
		},
		[checked4, checked5],
	);
	const [checkedValues, setCheckedValues] = useState("");
	const [ariaCheckedValues, setAriaCheckedValues] = useState("");
	const [nameValues, setNameValues] = useState("");
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const cv = [];
		const av = [];
		const nv = [];
		for (let i = 0; i < 5; i++) {
			const elm = e.currentTarget.elements.item(i) as HTMLInputElement;
			cv.push(elm.checked);
			av.push(elm.ariaChecked);
			nv.push(elm.name === args.groupName);
		}
		setCheckedValues(cv.join(", "));
		setAriaCheckedValues(av.join(", "));
		setNameValues(nv.join(", "));
	};
	return (
		<>
			<form className="neo-form" onSubmit={onSubmit}>
				<CheckboxGroup {...args} onChange={onChange}>
					{checkboxes(args.groupName as string, checked4, checked5)}
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
				label="name is set correctly:"
				value={nameValues}
				readOnly
			/>
		</>
	);
};

export const DefaultCheckboxGroup = DefaultTemplate.bind({});
DefaultCheckboxGroup.args = {
	groupName: "default-checkbox-group",
	label: "Default Checkbox Group",
	required: true,
};

export const InlineDefaultCheckboxGroup = DefaultTemplate.bind({});
InlineDefaultCheckboxGroup.args = {
	groupName: "inline-checkbox-group",
	label: "Inline Default Checkbox Group",
	inline: true,
};

const DisabledTemplate: Story<CheckboxGroupProps> = ({
	...args
}: CheckboxGroupProps) => {
	const children = disabledCheckboxes(args.groupName as string);
	return <CheckboxGroup {...args}>{children}</CheckboxGroup>;
};
export const DisabledCheckboxGroup = DisabledTemplate.bind({});
DisabledCheckboxGroup.args = {
	groupName: "disabled-checkbox-group",
	label: "Disabled Checkbox Group",
	onChange: () => null,
};

export const InlineDisabledCheckboxGroup = DisabledTemplate.bind({});
InlineDisabledCheckboxGroup.args = {
	groupName: "inline-disabled-checkbox-group",
	label: "Inline Disabled Checkbox Group",
	inline: true,
	onChange: () => null,
};

const ReadonlyTemplate: Story<CheckboxGroupProps> = ({
	...args
}: CheckboxGroupProps) => {
	const children = readonlyCheckboxes(args.groupName as string);
	return <CheckboxGroup {...args}>{children}</CheckboxGroup>;
};
export const ReadonlyCheckboxGroup = ReadonlyTemplate.bind({});
ReadonlyCheckboxGroup.args = {
	groupName: "readonly-checkbox-group",
	label: "Readonly Checkbox Group",
	onChange: () => null,
};

export const InlineReadonlyCheckboxGroup = ReadonlyTemplate.bind({});
InlineReadonlyCheckboxGroup.args = {
	groupName: "inline-readonly-checkbox-group",
	label: "Inline Readonly Checkbox Group",
	inline: true,
	onChange: () => null,
};
