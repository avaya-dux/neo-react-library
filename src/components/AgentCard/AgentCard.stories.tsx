import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, type AvatarProps } from "components/Avatar";

import { AgentCard } from "./AgentCard";

type PagePropsAndCustomArgs = React.ComponentProps<typeof AgentCard> & {
	image?: boolean;
};

const meta: Meta<PagePropsAndCustomArgs> = {
	title: "Components/AgentCard",
	component: AgentCard,
};

export default meta;

type Story = StoryObj<PagePropsAndCustomArgs>;

const initialLetters = (name: string) => {
	if (!name) {
		return "";
	}
	const nameToArray = name.split(" ");
	if (name.length > 1) {
		let initials = "";

		if (nameToArray.length > 1) {
			initials =
				nameToArray[0].charAt(0).toUpperCase() +
				nameToArray[nameToArray.length - 1].charAt(0).toUpperCase();
		} else {
			initials = nameToArray[0].charAt(0).toUpperCase();
		}
		return initials;
	}
	return "";
};

const StoryWrapper = ({ children }: { children: React.ReactNode }) => (
	<>
		<div className="neo-nav">{children}</div>
		<br />
	</>
);

export const AgentCardStory: Story = {
	argTypes: {
		agentName: {
			control: "text",
			defaultValue: "Barbara Barberson",
		},
		agentStatus: {
			control: "select",
			options: ["connected", "ready", "not-ready"],
			defaultValue: "connected",
		},
		avatar: {
			control: "select",
			options: ["basic", "generic", "bot"],
			defaultValue: "basic",
		},
		image: {
			control: "boolean",
		},
	},
	render: ({ agentName, agentStatus, avatar, image }) => (
		<StoryWrapper>
			<AgentCard
				agentName={agentName}
				agentStatus={agentStatus}
				avatar={
					<Avatar
						variant={avatar as AvatarProps["variant"]}
						label={agentName}
						initials={
							(avatar as AvatarProps["variant"]) === "generic" ||
							(avatar as AvatarProps["variant"]) === "bot" ||
							image
								? ""
								: initialLetters(agentName)
						}
						image={
							image
								? "https://fastly.picsum.photos/id/1027/200/300.jpg?hmac=WCxdERZ7sgk4jhwpfIZT0M48pctaaDcidOi3dKSHJYY"
								: ""
						}
					/>
				}
			/>
		</StoryWrapper>
	),
};
