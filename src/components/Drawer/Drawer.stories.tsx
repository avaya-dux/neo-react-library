import type { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { Button, Form, Note, Switch, TextArea } from "components";

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
			<section>
				<TextArea
					helperText="Try typing here while scrim is on."
					maxLength={10}
					placeholder="Placeholder"
					translations={{
						over: "over",
						remaining: "remaining",
					}}
				/>
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

export const withForm = () => {
	const [formDrawerOpen, setFormDrawerOpen] = useState(false);

	return (
		<main>
			<section
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "1rem",
				}}
			>
				<Button onClick={() => setFormDrawerOpen(!formDrawerOpen)}>
					Toggle Drawer Open
				</Button>
			</section>

			<Drawer
				open={formDrawerOpen}
				onClose={() => setFormDrawerOpen(false)}
				title="Submission Form"
				closeOnBackgroundClick={false}
			>
				<Form
					// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
					onSubmit={(e: any) => {
						e.preventDefault();
						alert("you successfully submitted");
					}}
					style={{ width: 300 }}
				>
					<p style={{ paddingBottom: 20 }}>
						Terms of Service Example. User must accept ToS before being allowed
						to proceed.
					</p>

					<Switch required name="ToS" value="accepted">
						Do you accept the Terms of Service?
					</Switch>

					<section style={{ display: "flex", justifyContent: "space-between" }}>
						<Button type="reset" variant="secondary">
							Reset
						</Button>

						<Button type="submit">Submit</Button>
					</section>
				</Form>
			</Drawer>
		</main>
	);
};

export const withNote = () => {
	const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);

	return (
		<main>
			<section
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "1rem",
				}}
			>
				<Button onClick={() => setNoteDrawerOpen(!noteDrawerOpen)}>
					Toggle Notes Drawer Open
				</Button>
			</section>

			<Drawer
				open={noteDrawerOpen}
				onClose={() => setNoteDrawerOpen(false)}
				title="Submission Form"
				closeOnBackgroundClick={false}
			>
				<Note>
					<Note.Title>Meeting notes</Note.Title>
					<Note.Content author="Kathy" self={true}>
						Hi, can we sync?
					</Note.Content>
				</Note>
				<Note>
					<Note.Content author="Cleo" self={false}>
						Sure, give me 10 minutes.
					</Note.Content>
				</Note>
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
