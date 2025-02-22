import type { Meta, Story } from "@storybook/react";

import { Avatar } from "components/Avatar";
import { Button } from "components/Button";

import { Icon } from "components/Icon";
import { Tooltip, type TooltipProps } from "./";

export default {
	title: "Components/Tooltip",
	component: Tooltip,
} as Meta<TooltipProps>;

export const Default = () => (
	<Tooltip label="default tooltip text">
		<Button variant="primary">button text</Button>
	</Tooltip>
);

export const IconTooltip = () => (
	<Tooltip label="This is the ID of the workflow.">
		<Icon
			role="button"
			tabIndex={0}
			icon="info"
			aria-label="workflow id"
			size="sm"
		/>
	</Tooltip>
);
const Template: Story<TooltipProps> = ({ children, ...rest }: TooltipProps) => (
	<Tooltip {...rest}>
		{children || <Button variant="primary">button text</Button>}
	</Tooltip>
);

export const Templated = Template.bind({});
Templated.args = {
	children: "overriding children with plain text",
	label: "short text",
};

export const MultipleChildren = Template.bind({});
MultipleChildren.args = {
	children: (
		<ul>
			<li>item one</li>
			<li>item two</li>
			<li>item three</li>
			<li>item four</li>
		</ul>
	),
	label: "wraps many children",
	position: "right",
};

export const AutoPosition: Story<TooltipProps> = (props: TooltipProps) => {
	return (
		<main
			style={{
				border: "solid black",
				padding: "3px",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Tooltip {...props}>
					<Avatar />
				</Tooltip>
				<Tooltip {...props}>
					<Avatar />
				</Tooltip>
				<Tooltip {...props}>
					<Avatar />
				</Tooltip>
				<Tooltip {...props}>
					<Avatar />
				</Tooltip>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Tooltip {...props} style={{ margin: "auto" }}>
					<Avatar />
				</Tooltip>

				<span>
					This is a rectangle. If you hover over an avatar, you will see
					it&apos;s tooltip auto position.
				</span>

				<Tooltip {...props} style={{ margin: "auto" }}>
					<Avatar />
				</Tooltip>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Tooltip {...props}>
					<Avatar />
				</Tooltip>
				<Tooltip {...props}>
					<Avatar />
				</Tooltip>
				<Tooltip {...props}>
					<Avatar />
				</Tooltip>
				<Tooltip {...props}>
					<Avatar />
				</Tooltip>
			</div>
		</main>
	);
};
AutoPosition.args = {
	label: "tiny text",
	position: "auto",
};
