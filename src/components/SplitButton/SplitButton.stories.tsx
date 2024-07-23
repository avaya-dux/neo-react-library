import type { Meta, Story } from "@storybook/react";

import { SplitButton, type SplitButtonProps } from "./SplitButton";
import { Menu, MenuButton, MenuItem, SubMenu } from "components";

export default {
	title: "Components/SplitButton",
	component: SplitButton,
} as Meta<SplitButtonProps>;

export const Default = () => (
	<>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eum
			cupiditate dolorum nihil, quo a impedit tenetur delectus repellat totam
			possimus inventore corrupti dolor. Nobis deserunt aspernatur temporibus
			nemo dolores?
		</p>
		<div
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
					text: "link",
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
					text: "link",
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
					text: "link",
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
					text: "link",
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
