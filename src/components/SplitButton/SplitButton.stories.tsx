import type { Meta, StoryObj } from "@storybook/react";

import { MenuItem } from "components";
import { SplitButton, type SplitButtonProps } from "./SplitButton";

type Story = StoryObj<SplitButtonProps>;

const meta: Meta<SplitButtonProps> = {
	title: "Components/SplitButton",
	component: SplitButton,
};
export default meta;

export const Default: Story = {
	args: {
		height: "md",
		buttonProps: {
			text: "Send",
			icon: "send",
			variant: "primary",
		},
	},
	render: ({ height, buttonProps }) => (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				position: "absolute",
				top: "50px",
				width: "100%",
			}}
		>
			<SplitButton height={height} buttonProps={buttonProps}>
				<MenuItem onClick={() => console.log("Menu Item 1 Clicked")}>
					Menu Item 1
				</MenuItem>
				<MenuItem onClick={() => console.log("Menu Item 2 Clicked")}>
					Menu Item 2
				</MenuItem>
			</SplitButton>
		</div>
	),
};

export const Varieties: Story = {
	render: () => (
		<>
			<h4
				style={{
					display: "flex",
					justifyContent: "start",
					position: "absolute",
					left: "100px",
					right: "100px",
					top: "10px",
				}}
			>
				LTR Split Buttons:
			</h4>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "end",
					position: "absolute",
					left: "100px",
					right: "100px",
					top: "50px",
				}}
			>
				<SplitButton
					height="sm"
					buttonProps={{
						variant: "primary",
						text: "Send",
						onClick: () => console.log("clicked"),
					}}
				>
					<MenuItem>Item1</MenuItem>
					<MenuItem>Item2</MenuItem>
				</SplitButton>
				|
				<SplitButton
					buttonProps={{
						variant: "primary",
						text: "Send",
						icon: "send",
						onClick: () => console.log("clicked"),
					}}
				>
					<MenuItem>Item1</MenuItem>
					<MenuItem>Item2</MenuItem>
				</SplitButton>
				|
				<SplitButton
					height="sm"
					buttonProps={{
						variant: "secondary",
						text: "Send",
						onClick: () => console.log("clicked"),
					}}
				>
					<MenuItem>Item1</MenuItem>
					<MenuItem>Item2</MenuItem>
				</SplitButton>
				|
				<SplitButton
					buttonProps={{
						variant: "secondary",
						text: "Send",
						icon: "send",
						onClick: () => console.log("clicked"),
					}}
				>
					<MenuItem>Item1</MenuItem>
					<MenuItem>Item2</MenuItem>
				</SplitButton>
			</div>
			<h4
				style={{
					display: "flex",
					justifyContent: "start",
					position: "absolute",
					left: "100px",
					right: "100px",
					bottom: "100px",
				}}
			>
				RTL Split Buttons:
			</h4>
			<div
				dir="rtl"
				style={{
					display: "flex",
					justifyContent: "space-between",
					position: "absolute",
					left: "100px",
					right: "100px",
					bottom: "50px",
				}}
			>
				<SplitButton
					buttonProps={{
						variant: "primary",
						text: "Send",
						onClick: () => console.log("clicked"),
					}}
				>
					<MenuItem>Item1</MenuItem>
					<MenuItem>Item2</MenuItem>
				</SplitButton>
				|
				<SplitButton
					height="sm"
					buttonProps={{
						variant: "primary",
						text: "Send",
						icon: "send",
						onClick: () => console.log("clicked"),
					}}
				>
					<MenuItem>Item1</MenuItem>
					<MenuItem>Item2</MenuItem>
				</SplitButton>
				|
				<SplitButton
					buttonProps={{
						variant: "secondary",
						text: "Send",
						onClick: () => console.log("clicked"),
					}}
				>
					<MenuItem>Item1</MenuItem>
					<MenuItem>Item2</MenuItem>
				</SplitButton>
				|
				<SplitButton
					height="sm"
					buttonProps={{
						variant: "secondary",
						text: "Send",
						icon: "send",
						onClick: () => console.log("clicked"),
					}}
				>
					<MenuItem>Item1</MenuItem>
					<MenuItem>Item2</MenuItem>
				</SplitButton>
			</div>
		</>
	),
};
