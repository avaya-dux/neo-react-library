import type { Meta } from "@storybook/react";

import { Checkbox, Form, Icon } from "components";

import type { ExternalLabelProps } from "components/Label";
import { useCallback, useState } from "react";
import { TextInput, type TextInputProps } from "./TextInput";
import "./TextInput.stories_shim.css";
export default {
	title: "Components/Text Input",
	component: TextInput,
} as Meta<TextInputProps>;

export const Default = () => {
	return (
		<Form>
			<TextInput
				label="Example Field"
				placeholder="Hello World..."
				helperText="Some helper text."
			/>
		</Form>
	);
};

export const LabelWithIcon = () => {
	const label = {
		text: "Workflow ID",
		icon: {
			iconType: "info",
			iconAriaLabel: "workflow id",
			iconTooltipPosition: "auto",
			iconTooltipText: "This is the ID of the workflow.",
		},
	} as ExternalLabelProps;
	const [dir, setDir] = useState("ltr");
	return (
		<>
			<h3>Direction</h3>
			<Checkbox
				onChange={() => setDir(dir === "ltr" ? "rtl" : "ltr")}
				value={dir}
			>
				Check to make TextInput direction RTL
			</Checkbox>
			<h3>Label with Icon</h3>
			<Form dir={dir}>
				<TextInput label={label} placeholder="label: icon" />
			</Form>
			<Form dir={dir}>
				<TextInput label={label} required placeholder="label: required, icon" />
				<TextInput label={label} placeholder="label: icon" />

				{/* small size variant */}
				<TextInput
					label={label}
					required
					isSmall
					placeholder="input: small, label: required, icon"
				/>
				<TextInput
					label={label}
					isSmall
					placeholder="input: small, label: icon"
				/>

				<TextInput defaultValue="Try To Change Me" disabled label={label} />

				<TextInput
					defaultValue="Try To Change Me"
					label={label}
					disabled
					startIcon="do-not-disturb-filled"
				/>

				<TextInput
					defaultValue="Try To Change Me"
					disabled
					label={label}
					required
				/>

				<TextInput
					defaultValue="Try To Change Me"
					label={label}
					disabled
					required
					startIcon="do-not-disturb-filled"
				/>

				<TextInput
					defaultValue="readonly value"
					label={label}
					placeholder="Placeholder text"
					readOnly
				/>
				{/* custom rule */}
				<div className="container--narrow">
					<TextInput
						label={label}
						required
						className="custom-rule--narrow"
						placeholder="customized narrow input"
					/>
				</div>
			</Form>
		</>
	);
};
export const DifferentHTMLOutputExamples = () => {
	return (
		<section>
			<Form>
				<TextInput label="Just a Label" />

				<TextInput required label="This is required" />

				<TextInput
					label="With start adorment icon"
					placeholder="Placeholder text"
					startAddon={<Icon icon="star-filled" aria-label="input icon" />}
				/>

				<TextInput
					label="Input type password"
					placeholder="Placeholder password"
					type="password"
					required
				/>

				<TextInput
					label="Input type email"
					placeholder="Placeholder email"
					type="email"
				/>

				<TextInput
					label="Input type number"
					placeholder="Placeholder number"
					type="number"
				/>

				<TextInput
					label="Input type tel"
					placeholder="Placeholder tel"
					type="tel"
				/>

				<TextInput
					label="Input type text"
					placeholder="Placeholder text"
					type="text"
				/>

				<TextInput
					label="With start icon"
					placeholder="Placeholder text"
					startIcon="star-filled"
				/>

				<TextInput defaultValue="Try To Change Me" disabled label="Disabled" />

				<TextInput
					defaultValue="Try To Change Me"
					disabled
					label="Disabled with ending icon"
					startIcon="do-not-disturb-filled"
				/>

				<TextInput
					defaultValue="readonly value"
					label="Read Only"
					placeholder="Placeholder text"
					readOnly
				/>

				<br />
				<p style={{ fontSize: "14pt" }}> Small size variants</p>
				<br />

				<TextInput
					label="Small size (basic)"
					isSmall
					placeholder="Placeholder text"
				/>

				<br />

				<TextInput
					label="Small size (disabled)"
					isSmall
					disabled
					defaultValue="Try to change me"
				/>

				<br />

				<TextInput
					label="Small size (type password)"
					placeholder="Placeholder password"
					type="password"
					isSmall
				/>
			</Form>
		</section>
	);
};

export const ErrorState = () => {
	return (
		<Form>
			<TextInput error label="Name" helperText="Name is required." required />
		</Form>
	);
};

export const AdornmentIcons = () => {
	return (
		<Form>
			<TextInput
				label="Icon Add Ons"
				startAddon={<Icon icon="call" aria-label="input icon" />}
				endAddon={<Icon icon="call" aria-label="input icon" />}
			/>
		</Form>
	);
};

export const AdornmentStrings = () => {
	return (
		<Form>
			<TextInput label="Domain" startAddon="www." endAddon=".com" />
		</Form>
	);
};

export const Clearable = () => {
	return (
		<Form>
			<TextInput
				label="Clearable Field"
				defaultValue="Initial Value"
				clearable
				helperText="Click the clear icon inside the input."
			/>
		</Form>
	);
};

export const ReadOnly = () => {
	return (
		<Form>
			<TextInput label="Read Only" defaultValue="Try To Change Me" readOnly />

			<TextInput
				label="Read Only"
				defaultValue="8881112222"
				startAddon="+1"
				readOnly
			/>
		</Form>
	);
};

export const Disabled = () => {
	return (
		<Form>
			<TextInput label="Disabled" defaultValue="Try To Change Me" disabled />
			<TextInput
				label="Clearable But Disabled"
				defaultValue="Try To Clear Me"
				endAddon={<Icon icon="call" aria-label="input icon" />}
				startAddon="+1"
				disabled
			/>
		</Form>
	);
};

export const BadAccessibility = () => {
	return (
		<Form>
			<TextInput />
		</Form>
	);
};

export const TypeSwitch = () => {
	const [type, setType] = useState("password");
	const toggle = useCallback(() => {
		if (type === "password") {
			setType("text");
		} else {
			setType("password");
		}
	}, [type]);
	return (
		<Form>
			<TextInput
				label="Text Input"
				defaultValue="Now I'm a simple input."
				type={type}
				required
			/>
			<Checkbox
				onChange={toggle}
				name="password"
				value="password"
				aria-label="password"
				defaultChecked
			>
				Type is password
			</Checkbox>
		</Form>
	);
};
// TODO: add controlled, uncontrolled, and an "inline" option
