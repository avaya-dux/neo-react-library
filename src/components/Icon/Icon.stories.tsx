import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from ".";
import "./Icon.stories.css";

type Story = StoryObj<typeof Icon>;
const meta: Meta<typeof Icon> = {
	component: Icon,
	title: "Components/Icon",
	args: {
		icon: "info",
		notification: false,
		status: "available",
	},
	argTypes: {
		icon: { control: { type: "select" } },

		// hidden props
		"aria-label": { table: { disable: true } },
		className: { table: { disable: true } },
		notification: { table: { disable: true } },
		size: { table: { disable: true } },
	},
	decorators: [
		(Story) => (
			<div className="icon-story-container">
				<Story />
			</div>
		),
	],
};
export default meta;

export const Default: Story = {
	argTypes: {
		notification: { table: { disable: true } },
		status: { table: { disable: true } },
	},
	render: ({ icon }) => (
		<>
			<h2>Default Icon</h2>

			<p>The Icon component has three sizes.</p>
			<p>
				All Icons <i>must</i> have an <code>aria-label</code>.
			</p>

			<div className="icon-group">
				<Icon icon={icon} size="sm" aria-label="small info" />
				<Icon icon={icon} size="md" aria-label="medium info" />
				<Icon icon={icon} size="lg" aria-label="large info" />
			</div>
		</>
	),
};

export const StatusIcon: Story = {
	args: {
		icon: "email",
	},
	render: ({ icon, status }) => (
		<>
			<h2>Status Icon</h2>

			<p>An Icon component that has a "status" can be shown in two sizes.</p>

			<div className="icon-group">
				<Icon icon={icon} status={status} aria-label="normal info" />
				<Icon icon={icon} status={status} size="lg" aria-label="large info" />
			</div>

			<p>
				An Icon with a status may have a "notification" badge. This is a small
				red dot in the bottom corner.
			</p>

			<div className="icon-group">
				<Icon
					icon={icon}
					status={status}
					notification
					aria-label="normal info"
				/>
				<Icon
					icon={icon}
					status={status}
					notification
					size="lg"
					aria-label="large info"
				/>
			</div>
		</>
	),
};
