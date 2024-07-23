import type { Meta } from "@storybook/react";

import { SplitButton, type SplitButtonProps } from "./SplitButton";
import { MenuItem } from "components";

export default {
	title: "Components/SplitButton",
	component: SplitButton,
} as Meta<SplitButtonProps>;

export const Default = () => (
	<>
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
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
					text: "Small",
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
					text: "Medium",
					icon: "settings",
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
					text: "Small",
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
					text: "Medium",
					icon: "settings",
					onClick: () => console.log("clicked"),
				}}
			>
				<MenuItem>Item1</MenuItem>
				<MenuItem>Item2</MenuItem>
			</SplitButton>
		</div>
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
					text: "rtl",
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
					text: "rtl",
					icon: "settings",
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
					text: "rtl",
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
					text: "rtl",
					icon: "settings",
					onClick: () => console.log("clicked"),
				}}
			>
				<MenuItem>Item1</MenuItem>
				<MenuItem>Item2</MenuItem>
			</SplitButton>
		</div>
	</>
);
