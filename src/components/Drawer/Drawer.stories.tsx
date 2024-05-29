import { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/Button";

import { Drawer, DrawerProps } from "./";

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
				title="Drawer one"
				actions={[
					<Button key="btn1">Custom Action 1</Button>,
					<Button key="btn2">Custom Action 2</Button>,
				]}
			>
				<p>
					This Drawer should have two buttons with custom actions as a part of
					the header
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
