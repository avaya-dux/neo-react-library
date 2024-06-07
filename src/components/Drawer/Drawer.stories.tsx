import type { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/Button";

import { Drawer, type DrawerProps } from "./";

export default {
	title: "Components/Drawer",
	component: Drawer,
} as Meta<DrawerProps>;

export const Default = () => {
	const [DrawerOneOpen, setDrawerOneOpen] = useState(false);

	const closeDrawerByNumber = (DrawerNumber: number) => {
		switch (DrawerNumber) {
			case 1:
				setDrawerOneOpen(false);
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
				<Button onClick={() => setDrawerOneOpen(!DrawerOneOpen)}>
					Toggle Drawer 1 Open
				</Button>
			</section>

			<Drawer
				open={DrawerOneOpen}
				onClose={() => setDrawerOneOpen(false)}
				title="Drawer with no actions"
			>
				<p>
					This Drawer should only have the x close button
				</p>
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
