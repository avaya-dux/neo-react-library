import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

type PagePropsAndCustomArgs = React.ComponentProps<typeof Badge> & {
	childType?: string;
};

const meta: Meta<PagePropsAndCustomArgs> = {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		controls: {
			exclude: ["aria-label"],
		},
	},
};

export default meta;

type Story = StoryObj<PagePropsAndCustomArgs>;

export const BadgeStory: Story = {
	argTypes: {
		data: {
			control: "text",
			defaultValue: "99",
		},
		childType: {
			control: "select",
			options: ["none", "icon", "tabs"],
			defaultValue: "none",
		},
	},
	render: ({ data, childType }) => {
		return childType === "tabs" ? (
			<div className="neo-tabs" role="tablist">
				<ul className="neo-tabs__nav">
					<Badge data={data} aria-label={`badge representing ${data}`}>
						<li className="neo-tabs__item neo-tabs__item--active">
							<a href="/#" role="tab" aria-selected="true">
								Tab 1
							</a>
						</li>
					</Badge>
				</ul>
			</div>
		) : (
			<Badge data={data} aria-label={`badge representing ${data}`}>
				{childType === "icon" ? <span className="neo-icon-customer" /> : ""}
			</Badge>
		);
	},
};
