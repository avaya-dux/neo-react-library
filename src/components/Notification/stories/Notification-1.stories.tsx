import type { Meta, StoryObj } from "@storybook/react";

import { Notification } from "..";

import "./NotificationStories.css";

const meta: Meta<typeof Notification> = {
	component: Notification,
	title: "Components/Notification",
	args: {
		type: "info",
		header: "This is an important notification!",
		description:
			"This is a slightly longer example of a why this notificatin is being shown and what YOU need to do about it... with urgency!",
	},
};
export default meta;

type Story = StoryObj<typeof Notification>;

export const Basic: Story = {
	name: "Basic usage",
	render: ({ ...rest }) => {
		return <Notification {...rest} />;
	},
};

export const ContentVariants: Story = {
	render: () => {
		return (
			<section className="content-variants">
				<fieldset>
					<legend>With time stamp variants</legend>

					<Notification
						type="info"
						header="This is an important notification!"
						description="This is a slightly longer example of a why this notificatin is being shown and what YOU need to do about it... with urgency!"
					/>

					<Notification
						type="info"
						header=""
						description="Description of what you need to do."
					/>

					<Notification
						type="info"
						header="Short message informating user"
						description=""
					/>
				</fieldset>

				<fieldset>
					<legend>Without time stamp variants</legend>

					<Notification
						type="info"
						showTimestamp={false}
						header="This is an important notification!"
						description="This is a slightly longer example of a why this notificatin is being shown and what YOU need to do about it... with urgency!"
					/>

					<Notification
						type="info"
						showTimestamp={false}
						description="Description of what you need to do."
					/>

					<Notification
						type="info"
						showTimestamp={false}
						header="Short message informating user"
					/>
				</fieldset>
			</section>
		);
	},
};
