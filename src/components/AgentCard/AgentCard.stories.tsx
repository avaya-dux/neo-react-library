import type { Meta, Story } from "@storybook/react";

import { Avatar } from "components/Avatar";

import { AgentCard, type AgentCardProps } from "./AgentCard";

export default {
	title: "Components/AgentCard",
	component: AgentCard,
} as Meta<AgentCardProps>;

const initialLetters = (name: string) => {
	if (!name) {
		return "";
	}
	const nameToArray = name.split(" ");
	if (name.length > 1) {
		const initialsOfFirstLast =
			nameToArray[0].charAt(0).toUpperCase() +
			nameToArray[1].charAt(0).toUpperCase();
		return initialsOfFirstLast;
	}
	return "";
};

export const AgentCardStory = () => (
	<>
		<div className="neo-nav">
			<AgentCard
				agentName={"Barbara Barberson"}
				agentStatus={"connected"}
				avatar={
					<Avatar
						variant="basic"
						label={"Barbara Barberson"}
						initials={initialLetters("Barbara Barberson")}
					/>
				}
			/>
		</div>
		<br />
		<div className="neo-nav">
			<AgentCard
				agentName={"Barbara Barberson"}
				agentStatus={"ready"}
				avatar={
					<Avatar
						variant="basic"
						label={"Barbara Barberson"}
						initials={initialLetters("Barbara Barberson")}
					/>
				}
			/>
		</div>
		<br />
		<div className="neo-nav">
			<AgentCard
				agentName={"Barbara Barberson"}
				agentStatus={"not-ready"}
				avatar={
					<Avatar
						variant="basic"
						label={"Barbara Barberson"}
						initials={initialLetters("Barbara Barberson")}
					/>
				}
			/>
		</div>
		<br />
		<div className="neo-nav">
			<AgentCard
				agentName={"Barbara Barberson"}
				agentStatus={"ready"}
				avatar={<Avatar variant="generic" label={"Barbara Barberson"} />}
			/>
		</div>
		<br />
		<div className="neo-nav">
			<AgentCard
				agentName={"Barbara Barberson"}
				agentStatus={"ready"}
				avatar={
					<Avatar
						variant="generic"
						label={"Barbara Barberson"}
						image="https://placekitten.com/g/200/300"
					/>
				}
			/>
		</div>
	</>
);

const Template: Story<AgentCardProps> = ({
	agentName,
	agentStatus,
}: AgentCardProps) => (
	<div className="neo-nav">
		<AgentCard
			agentStatus={agentStatus}
			agentName={agentName}
			avatar={
				<Avatar
					variant="generic"
					size="md"
					image="https://placekitten.com/g/200/300"
					label="image of a kitten"
				/>
			}
		/>
	</div>
);

export const TemplatedAgentCard = Template.bind({});
TemplatedAgentCard.args = {
	agentName: "Barbara Barberson",
	agentStatus: "connected",
};
