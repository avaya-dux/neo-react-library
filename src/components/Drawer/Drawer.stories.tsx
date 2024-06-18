import type { Meta, StoryObj } from "@storybook/react";
import { type FormEvent, useState } from "react";

import { Button, Form, Note, Switch, TextArea } from "components";

import { Drawer, type DrawerProps } from "./";

type PlainDrawer = React.ComponentProps<typeof Drawer> & {
	title: string | JSX.Element;
};

type Story = StoryObj<PlainDrawer>;

const meta: Meta<typeof Drawer> = {
	component: Drawer,
	title: "Components/Drawer",
};
export default meta;

export const BasicDrawer: Story = {
	render: () => {
		const [defaultDrawerOpen, setDefaultDrawerOpen] = useState(false);

		return (
			<main>
				<section
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "1rem",
					}}
				>
					<Button onClick={() => setDefaultDrawerOpen(!defaultDrawerOpen)}>
						Open Default Drawer
					</Button>
				</section>

				<Drawer
					open={defaultDrawerOpen}
					onClose={() => setDefaultDrawerOpen(false)}
					title="Drawer with default behavior"
				>
					<p>This Drawer should only have the x close button</p>
					<p>Drawer can be dismissed by clicking on background scrim</p>
				</Drawer>
			</main>
		);
	},
};

export const BackButtonAndScrimOptions: Story = {
	render: () => {
		const [noDismissDrawerOpen, setNoDismissDrawerOpen] = useState(false);
		const [hasBackButtonDrawerOpen, sethasBackButtonDrawerOpen] =
			useState(false);

		const toggleDrawerByName = (drawerName: string) => {
			switch (drawerName) {
				case "no-dismiss":
					setNoDismissDrawerOpen(!noDismissDrawerOpen);
					break;
				case "back-button":
					sethasBackButtonDrawerOpen(!hasBackButtonDrawerOpen);
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
					<Button onClick={() => toggleDrawerByName("no-dismiss")}>
						Open Drawer dismiss disabled
					</Button>

					<Button onClick={() => toggleDrawerByName("back-button")}>
						Open Drawer with Back button
					</Button>
				</section>
				<section>
					<TextArea
						helperText="Try typing here while scrim is on."
						label="Test focus by typing here"
						maxLength={10}
						placeholder="Placeholder"
						translations={{
							over: "over",
							remaining: "remaining",
						}}
					/>
				</section>

				<Drawer
					open={noDismissDrawerOpen}
					onClose={() => toggleDrawerByName("no-dismiss")}
					title="Drawer with dimiss on scrim click disabled"
					closeOnScrimClick={false}
				>
					<p>This Drawer will not close if you click on the scrim background</p>
				</Drawer>

				<Drawer
					open={hasBackButtonDrawerOpen}
					onClose={() => toggleDrawerByName("back-button")}
					onBack={() => {
						alert("Back button pressed");
					}}
					title="With back button"
				>
					<p>This Drawer both a Back button and the x close button</p>
				</Drawer>
			</main>
		);
	},
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
				closeOnScrimClick={false}
			>
				<Form
					onSubmit={(e: FormEvent<HTMLFormElement>) => {
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
				title="General Notes"
				width="30rem"
			>
				<Note>
					<Note.Title>Meeting notes</Note.Title>
					<Note.Content author="Kathy" self={true}>
						Hi, can we sync?
					</Note.Content>
				</Note>
				<Note>
					<Note.Content author="Cleo">Sure, give me 10 minutes.</Note.Content>
				</Note>
			</Drawer>
		</main>
	);
};

export const customWidth = () => {
	const [defaultDrawerOpen, setDefaultDrawerOpen] = useState(false);
	const [widthRemDrawerOpen, setWidthRemDrawerOpen] = useState(false);
	const [widthPixelDrawerOpen, setWidthPixelDrawerOpen] = useState(false);

	const toggleDrawerByName = (drawerName: string) => {
		switch (drawerName) {
			case "default":
				setDefaultDrawerOpen(!defaultDrawerOpen);
				break;
			case "rem-units":
				setWidthRemDrawerOpen(!widthRemDrawerOpen);
				break;
			case "pixel-units":
				setWidthPixelDrawerOpen(!widthPixelDrawerOpen);
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
					Open Default Width Drawer (20rem)
				</Button>

				<Button onClick={() => toggleDrawerByName("rem-units")}>
					Open Drawer with 30rem width
				</Button>

				<Button onClick={() => toggleDrawerByName("pixel-units")}>
					Open Drawer with 150px width
				</Button>
			</section>
			<section>
				<TextArea
					helperText="Try typing here while scrim is on."
					label="Test focus by typing here"
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
				title="Drawer with default width"
			>
				<Note>
					<Note.Title>Meeting notes</Note.Title>
					<Note.Content author="Kathy" self={true}>
						Hi, can we sync?
					</Note.Content>
				</Note>
				<Note>
					<Note.Content author="Cleo">Sure, give me 10 minutes.</Note.Content>
				</Note>
			</Drawer>

			<Drawer
				open={widthRemDrawerOpen}
				onClose={() => toggleDrawerByName("rem-units")}
				title="Drawer width = 30rem"
				width="30rem"
			>
				<Note>
					<Note.Title>Meeting notes</Note.Title>
					<Note.Content author="Kathy" self={true}>
						Hi, can we sync?
					</Note.Content>
				</Note>
				<Note>
					<Note.Content author="Cleo">Sure, give me 10 minutes.</Note.Content>
				</Note>
			</Drawer>

			<Drawer
				open={widthPixelDrawerOpen}
				onClose={() => toggleDrawerByName("pixel-units")}
				title="Drawer width = 150px"
				width="150px"
			>
				<Note>
					<Note.Title>Meeting notes</Note.Title>
					<Note.Content author="Kathy" self={true}>
						Hi, can we sync?
					</Note.Content>
				</Note>
				<Note>
					<Note.Content author="Cleo">Sure, give me 10 minutes.</Note.Content>
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
	open: true,
	children: <p>Drawer content</p>,
};
