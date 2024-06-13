import type { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/Button";

import { Drawer, type DrawerProps } from "./";

export default {
	title: "Components/Drawer",
	component: Drawer,
} as Meta<DrawerProps>;

export const Default = () => {
	const [defaultDrawerOpen, setDefaultDrawerOpen] = useState(false);
	const [noDismissDrawerOpen, setNoDismissDrawerOpen] = useState(false);

	const toggleDrawerByName = (drawerName: string) => {
		console.log("drawerName: ", drawerName);
		switch (drawerName) {
			case "default":
				setDefaultDrawerOpen(!defaultDrawerOpen);
				break;
			case "no-dismiss":
				setNoDismissDrawerOpen(!noDismissDrawerOpen);
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

				<Button onClick={() => toggleDrawerByName("no-dismiss")}>
					Toggle Drawer dismiss on click disabled Open
				</Button>
			</section>

			<Drawer
				open={defaultDrawerOpen}
				onClose={() => toggleDrawerByName("default")}
				title="Drawer with default behavior"
			>
				<p>This Drawer should only have the x close button</p>
			</Drawer>

			<Drawer
				open={noDismissDrawerOpen}
				onClose={() => toggleDrawerByName("no-dismiss")}
				title="Drawer with dimiss on scrim click disabled"
				closeOnBackgroundClick={false}
			>
				<p>This Drawer will not close if you click on the scrim background</p>
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
