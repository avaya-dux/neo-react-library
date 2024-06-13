import type { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/Button";

import { Drawer, type DrawerProps } from "./";

export default {
	title: "Components/Drawer",
	component: Drawer,
} as Meta<DrawerProps>;

export const Default = () => {
	const [DefaultDrawerOpen, setDefaultDrawerOpen] = useState(false);

	const toggleDrawerByName = (DrawerName: string) => {
		console.log("toggleDrawerByName CALLED");
		switch (DrawerName) {
			case "default":
				setDefaultDrawerOpen(!DefaultDrawerOpen);
				break;
		}
	};

	return (
		<main>
			<section
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "1rem",
				}}
			>
				<Button onClick={() => toggleDrawerByName("default")}>
					Toggle Default Drawer Open
				</Button>
			</section>

			<Drawer
				open={DefaultDrawerOpen}
				onClose={() => toggleDrawerByName("default")}
				title="Drawer with default behavior"
			>
				<p>This Drawer should only have the x close button</p>
			</Drawer>
		</main>
	);
};

const Template: Story<DrawerProps> = (props: DrawerProps) => (
	<Drawer {...props} />
);
export const Templated = Template.bind({});
Templated.args = {
	id: "example",
	title: "Drawer title",
	slide: true,
	open: true,
	actions: [
		<Button key="btn1">button 1</Button>,
		<Button key="btn2">second btn</Button>,
	],
	children: <p>Drawer content</p>,
};
