import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from ".";
import "./Icon.stories.css";
import clsx from "clsx";

type StoryMeta = React.ComponentProps<typeof Icon> & {
	mode: "neo-light" | "neo-dark";
};

const meta: Meta<StoryMeta> = {
	component: Icon,
	title: "Components/Icon",
	args: {
		icon: "info",
		notification: false,
		status: "available",

		// story props
		dir: "ltr",
		mode: "neo-light",
	},
	argTypes: {
		icon: { control: { type: "select" } },

		// story props
		dir: {
			control: "radio",
			options: ["ltr", "rtl"],
			description: "These are props for the story, not the component.",
			table: { category: "Story Props" },
		},
		mode: {
			control: "radio",
			options: ["neo-light", "neo-dark"],
			description: "These are props for the story, not the component.",
			table: { category: "Story Props" },
		},

		// hidden props
		"aria-label": { table: { disable: true } },
		className: { table: { disable: true } },
		notification: { table: { disable: true } },
		size: { table: { disable: true } },
	},
};
export default meta;

type Story = StoryObj<StoryMeta>;

export const Default: Story = {
	argTypes: {
		notification: { table: { disable: true } },
		status: { table: { disable: true } },
	},
	render: ({ dir, mode, icon }) => (
		<div
			dir={dir}
			className={clsx("icon-story-container", "neo-global-colors", mode)}
		>
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
		</div>
	),
};

export const StatusIcon: Story = {
	args: {
		icon: "email",
	},
	render: ({ dir, mode, icon, status }) => (
		<div
			dir={dir}
			className={clsx("icon-story-container", "neo-global-colors", mode)}
		>
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
		</div>
	),
};
