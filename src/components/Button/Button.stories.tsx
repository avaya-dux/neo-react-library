import type { ComponentStory } from "@storybook/react";
import type { Meta } from "@storybook/react";

import { Avatar, Chip } from "components";

import { Button, type ButtonProps } from "./Button";

export default {
	title: "Components/Button",
	component: Button,
} as Meta<ButtonProps>;

const Template: ComponentStory<typeof Button> = (args) => (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "90vh",
		}}
	>
		<Button {...args} />
	</div>
);

export const Default = Template.bind({});
Default.args = {
	children: "Default",
};

export const AnimationSpinner = Template.bind({});
AnimationSpinner.args = {
	animation: "spinner",
	children: "Test",
	className: "ha-ha",
};

export const AnimationPulse = Template.bind({});
AnimationPulse.args = {
	animation: "pulse",
	children: "Test",
};

export const Badge = Template.bind({});
Badge.args = {
	badge: "100k",
	children: "badge",
};

export const BadgeLongText = Template.bind({});
BadgeLongText.args = {
	badge: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
	children: "badge",
};

export const LeftIconExample = () => (
	<Button icon="settings">Left/Default Example</Button>
);

export const RightIconExample = () => (
	<Button icon="settings" dir="rtl">
		Right Example
	</Button>
);

export const WithMultipleChildren = () => {
	return (
		<Button>
			<Avatar /> <Chip>text</Chip>
		</Button>
	);
};
