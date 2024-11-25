import type { Meta, Story } from "@storybook/react";

import { Icon, TextInput } from "components";

import { Form, type FormProps } from ".";

export default {
	title: "Components/Form Base",
	component: Form,
} as Meta<FormProps>;

const Template: Story<FormProps> = (props) => (
	<Form {...props}>
		<TextInput
			label="Read Only"
			defaultValue="8881112222"
			startAddon="+1"
			readOnly
		/>

		<TextInput
			label="Clearable Field"
			defaultValue="Initial Value"
			clearable
			helperText="Click the clear icon inside the input."
		/>
	</Form>
);

export const Templated = Template.bind({});
Templated.args = {};

const InlineForms: Story<FormProps> = (props) => (
	<>
		<Form {...props} inline>
			<TextInput
				label="Read Only"
				defaultValue="8881112222"
				startAddon="+1"
				readOnly
			/>

			<TextInput
				label="Clearable Field"
				defaultValue="Initial Value"
				clearable
				helperText="Click the clear icon inside the input."
				startAddon={<Icon icon="call" aria-label="input icon" />}
			/>
		</Form>

		<Form {...props} inline>
			<TextInput
				label="Read Only"
				defaultValue="8881112222"
				startAddon="+1"
				readOnly
			/>

			<TextInput
				label="Clearable Field"
				defaultValue="Initial Value"
				clearable
				helperText="Click the clear icon inside the input."
				endAddon={<Icon icon="call" aria-label="input icon" />}
			/>
		</Form>

		<Form {...props} inline>
			<TextInput
				label="Read Only"
				defaultValue="8881112222"
				startAddon="+1"
				readOnly
			/>

			<TextInput
				label="Clearable Field"
				defaultValue="Initial Value"
				clearable
				helperText="Click the clear icon inside the input."
				startAddon="+1"
				endAddon={<Icon icon="call" aria-label="input icon" />}
			/>
		</Form>
	</>
);

export const InlineFormExample = InlineForms.bind({});
InlineFormExample.args = {};
