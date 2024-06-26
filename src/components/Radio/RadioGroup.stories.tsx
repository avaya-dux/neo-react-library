import type React from "react";
import { useEffect, useState } from "react";

import { Button, Form, Tooltip } from "components";

import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

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
		<Form
			id="radio-form"
			onSubmit={(e) => {
				e.preventDefault();
				alert(`you successfully submitted: ${selectedValue}`);
			}}
		>
			<RadioGroup
				groupName="Default Radio Group"
				selected={selectedValue}
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
			<br />
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export const MockAPIRadioGroupExample = () => {
	const [isDisabled, setIsDisabled] = useState(true);
	const [selectedValue, setSelectedValue] = useState<string>();

	function onRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
		setSelectedValue(event.target.value);
	}

	useEffect(() => {
		setTimeout(() => {
			setIsDisabled(false);
			setSelectedValue("Radio 3");
		}, 3000);
	}, []);

	return (
		<Form
			id="radio-form"
			onSubmit={(e) => {
				e.preventDefault();
				alert(`you successfully submitted: ${selectedValue}`);
			}}
		>
			<RadioGroup
				groupName="Default Radio Group"
				selected={selectedValue}
				onChange={onRadioChange}
				disabled={isDisabled}
			>
				<Radio value="Radio 1">Radio 1</Radio>
				<Radio value="Radio 2">Radio 2</Radio>
				<Radio value="Radio 3">Radio 3</Radio>
				<Tooltip label="Radio 4" position="right">
					<Radio value="Radio 4">Radio 4</Radio>
				</Tooltip>
			</RadioGroup>
			<br />
			<p>
				{selectedValue
					? `selected button is ${selectedValue}`
					: "Loading selected value, please wait..."}
			</p>
			<br />
			<Button type="submit">Submit</Button>
		</Form>
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
				selected={selectedValue}
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
