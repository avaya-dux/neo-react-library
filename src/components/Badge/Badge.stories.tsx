import type { Meta, StoryObj } from "@storybook/react";

import clsx from "clsx";
import { Badge } from "./Badge";

type PagePropsAndCustomArgs = React.ComponentProps<typeof Badge> & {
	childType?: string;
	icon?: string;
	mode?: string;
};

const meta: Meta<PagePropsAndCustomArgs> = {
	title: "Components/Badge",
	component: Badge,
	argTypes: {
		data: {
			control: "text",
		},
		childType: {
			control: "select",
			options: ["none", "icon", "tabs"],
			description: "These are props for the story, not the component.",
			table: { category: "Story Props" },
		},
	},
	args: {
		data: "99",
		childType: "icon",
	},
	parameters: {
		controls: {
			exclude: ["aria-label"],
		},
	},
};

export default meta;

type Story = StoryObj<PagePropsAndCustomArgs>;

const TabsBadge = ({ data }: PagePropsAndCustomArgs) => (
	<>
		<div className="neo-tabs" role="tablist">
			<ul className="neo-tabs__nav">
				<Badge data={data} aria-label={`badge representing ${data}`}>
					<li className="neo-tabs__item neo-tabs__item--active">
						<a
							href="/#"
							role="tab"
							aria-selected="true"
							aria-controls="tab1-panel"
							id="tab1"
						>
							Tab 1
						</a>
					</li>
				</Badge>
			</ul>
		</div>
	</>
);

const IconBadge = ({ data, icon }: PagePropsAndCustomArgs) => (
	<Badge data={data} aria-label={`badge representing ${data}`}>
		<span className={icon || "neo-icon-customer"} />
	</Badge>
);

const SimpleBadge = ({ data }: PagePropsAndCustomArgs) => (
	<Badge data={data} aria-label={`badge representing ${data}`} />
);

export const BadgeStory: Story = {
	argTypes: {
		icon: {
			control: "text",
			if: { arg: "childType", eq: "icon" },
		},
		mode: {
			control: "radio",
			options: ["neo-light", "neo-dark"],
			description: "These are props for the story, not the component.",
			table: { category: "Story Props" },
		},
	},
	decorators: [
		(Story, { args }) => (
			<>
				<p style={{ marginBottom: "2rem" }}>
					Badges are used to indicate the number of notifications pending for a
					particular function, such as unread email, voicemail, text, and chat
					messages.
				</p>
				<p style={{ marginBottom: "2rem" }}>
					They can stand alone, or be used with icons or tabs.
				</p>
				<div
					style={{ display: "inline-block" }}
					className={clsx("neo-global-colors", args.mode)}
				>
					<Story />
				</div>
			</>
		),
	],
	render: (props) => {
		switch (props.childType) {
			case "tabs":
				return <TabsBadge {...props} />;
			case "icon":
				return <IconBadge {...props} />;
			default:
				return <SimpleBadge {...props} />;
		}
	},
};
