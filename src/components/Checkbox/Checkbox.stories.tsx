import type { Meta, Story } from "@storybook/react";
import { useCallback, useRef, useState } from "react";

import { Checkbox, type CheckboxProps } from "./";

export default {
	title: "Components/Checkbox",
	component: Checkbox,
} as Meta<CheckboxProps>;

export const Default = () => {
	return (
		<>
			<Checkbox name="example" value="1">
				example label 1
			</Checkbox>
			<Checkbox name="example" value="2" defaultChecked>
				example label 2
			</Checkbox>
		</>
	);
};

export const NoLabel = () => {
	return (
		<>
			<Checkbox
				name="example"
				value="2"
				aria-label="no label checkbox in a table row"
			/>
		</>
	);
};

const ControlledTemplate: Story<CheckboxProps> = ({
	checked: checkedProp = false,
	...rest
}: CheckboxProps) => {
	const ref = useRef(null);
	const [checked, setChecked] = useState<"mixed" | boolean>(checkedProp);
	const onChange = useCallback(() => {
		if (checked === "mixed") {
			setChecked(true);
		} else {
			setChecked((prev) => !prev);
		}
	}, [checked]);
	const allProps = { ...rest, onChange, checked };
	return <Checkbox ref={ref} {...allProps} />;
};

const UncontrolledTemplate: Story<CheckboxProps> = ({
	defaultChecked,
	...rest
}: CheckboxProps) => {
	const ref = useRef(null);
	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked);
	}, []);

	return (
		<Checkbox
			ref={ref}
			defaultChecked={defaultChecked}
			onChange={onChange}
			{...rest}
		/>
	);
};

export const CheckedAndControlled = ControlledTemplate.bind({});
CheckedAndControlled.args = {
	checked: true,
	children: "example label",
	value: "1",
	disabled: false,
};

export const CheckedAndUncontrolled = UncontrolledTemplate.bind({});
CheckedAndUncontrolled.args = {
	defaultChecked: true,
	children: "example label",
	value: "1",
	disabled: false,
};

export const UncheckedAndControlled = ControlledTemplate.bind({});
UncheckedAndControlled.args = {
	checked: false,
	children: "example label",
	value: "1",
	disabled: false,
};

export const UncheckedAndUncontrolled = UncontrolledTemplate.bind({});
UncheckedAndUncontrolled.args = {
	defaultChecked: false,
	children: "example label",
	value: "1",
	disabled: false,
};

export const MixedAndControlled = ControlledTemplate.bind({});
MixedAndControlled.args = {
	checked: "mixed",
	children: "example label",
	value: "1",
	disabled: false,
};

export const MixedAndUncontrolled = UncontrolledTemplate.bind({});
MixedAndUncontrolled.args = {
	defaultChecked: "mixed",
	children: "example label",
	value: "1",
	disabled: false,
};

export const VoiceOverTest = () => (
	<form>
		<fieldset>
			<legend>Plain checkbox</legend>
			<p>
				VoiceOver announces [state], [label], [checkbox], after a state change.
			</p>
			<input type="checkbox" id="topping1" />
			<label htmlFor="topping1">Working</label>
		</fieldset>
		<fieldset>
			<legend>Neo checkbox</legend>
			<p>
				CSS neo-check breaks VoiceOver announcement. Only [label] is
				announcement.
			</p>
			<input type="checkbox" id="topping2" className="neo-check" />
			<label htmlFor="topping2">Broken</label>
		</fieldset>
		<fieldset>
			<legend>Neo checkbox fixed</legend>
			<p>Assigning [aria-label] attribute fixes the announcement</p>
			<input
				type="checkbox"
				id="topping3"
				className="neo-check"
				aria-label="Fixed"
			/>
			<label htmlFor="topping3">Fixed</label>
		</fieldset>
	</form>
);
