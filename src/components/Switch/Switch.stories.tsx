import type { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/Button";
import { Form } from "components/Form";

import type { LabelIconProps } from "components/Label";
import { Switch, type SwitchProps } from "./";
import { Icon, Tooltip } from "components";

export default {
	title: "Components/Switch",
	component: Switch,
} as Meta<SwitchProps>;

interface DirectionTemplateProps {
	dir: "ltr" | "rtl";
	labelWithIcon: boolean;
}
const DirectionTemplate: Story<DirectionTemplateProps> = ({
	dir = "ltr",
	labelWithIcon = false,
}: DirectionTemplateProps) => {
	const [checked, setChecked] = useState(false);
	const longText =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus non elit eu mollis.";

	const labelIcon = {
		iconType: "info",
		iconAriaLabel: "Info",
		iconTooltipPosition: "auto",
		iconTooltipText: "This is a tooltip",
	} as LabelIconProps;
	return labelWithIcon === false ? (
		<main>
			<h3>Switches</h3>
			<section style={{ width: 200 }} dir={dir}>
				<Switch onChange={(_e, checked) => alert(`Checked -> ${checked}`)}>
					Alert on toggle
				</Switch>

				<Switch
					checked={checked}
					onChange={(_e, updatedChecked) => setChecked(updatedChecked)}
				>
					Controlled Switch
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
		</main>
	) : (
		<main>
			<h3>Switches with Icons</h3>
			<section style={{ width: 200 }} dir={dir}>
				<Switch
					labelIcon={labelIcon}
					onChange={(_e, checked) => alert(`Checked -> ${checked}`)}
				>
					Alert on toggle
				</Switch>

				<Switch
					labelIcon={labelIcon}
					checked={checked}
					onChange={(_e, updatedChecked) => setChecked(updatedChecked)}
				>
					Controlled Switch
				</Switch>
				<Switch
					labelIcon={labelIcon}
					checked={checked}
					onChange={(_e, updatedChecked) => setChecked(updatedChecked)}
				>
					Controlled Switch
				</Switch>

				<Switch defaultChecked labelIcon={labelIcon}>
					Default Checked
				</Switch>

				<Switch disabled labelIcon={labelIcon}>
					Disabled Unchecked
				</Switch>
				<Switch disabled defaultChecked labelIcon={labelIcon}>
					Disabled Checked
				</Switch>
				<Switch defaultChecked dir="rtl" labelIcon={labelIcon}>
					Label fixed on left
				</Switch>
				<Switch multiline labelIcon={labelIcon}>
					Long multiline text controlled by parent: {longText}
				</Switch>
				<Switch multiline dir="rtl" labelIcon={labelIcon}>
					Long multiline text fixed on left: {longText}
				</Switch>
				<Switch multiline dir="rtl" labelIcon={labelIcon}>
					multiline 1 text fixed on left
					<br />
					multiline 2 <br />
					multiline 3
				</Switch>
				<Switch multiline labelIcon={labelIcon}>
					multiline 1 text controlled by parent
					<br />
					multiline 2 <br />
					multiline 3
					<Tooltip label="something" position="auto">
						<Icon tabIndex={0} icon="info" aria-label="info" size="sm" />
					</Tooltip>
				</Switch>
				<Switch labelIcon={labelIcon}>With Icon LTR</Switch>
				<Switch labelIcon={labelIcon} dir="rtl">
					With Icon RTL
				</Switch>
			</section>
		</main>
	);
};

export const Default = DirectionTemplate.bind({});
Default.args = {
	dir: "ltr",
	labelWithIcon: false,
};

export const LabelWithIcons = DirectionTemplate.bind({});
LabelWithIcons.args = {
	dir: "ltr",
	labelWithIcon: true,
};
export const FormControl = () => {
	const [submitted, setSubmitted] = useState(false);

	return (
		<Form
			// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
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
