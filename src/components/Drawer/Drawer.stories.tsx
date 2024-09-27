import type { Meta, StoryObj } from "@storybook/react";
import { type FormEvent, useState } from "react";

import {
	Button,
	Form,
	IconButton,
	Note,
	Switch,
	TextArea,
	TextInput,
} from "components";

import { Drawer } from "./";
import "./Drawer.stories.css";

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
					title="Default Drawer"
				>
					<div style={{ height: "100%", width: "100%" }}>
						<p>This Drawer should only have the x close button</p>
						<br />

						<p>Drawer can be dismissed by clicking on background scrim</p>
						<br />

						<p>24px padding enforced.</p>
					</div>
				</Drawer>
			</main>
		);
	},
};

export const ScrimOptions: Story = {
	render: () => {
		const [noDismissDrawerOpen, setNoDismissDrawerOpen] = useState(false);
		const [dismissEnabledDrawerOpen, setDismissEnabledDrawerOpen] =
			useState(false);

		const toggleDrawerByName = (drawerName: string) => {
			switch (drawerName) {
				case "no-dismiss":
					setNoDismissDrawerOpen(!noDismissDrawerOpen);
					break;
				case "dismiss-on-click":
					setDismissEnabledDrawerOpen(!dismissEnabledDrawerOpen);
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
						Click on Scrim dismiss disabled
					</Button>

					<Button onClick={() => toggleDrawerByName("dismiss-on-click")}>
						Click on Scrim dismiss enabled
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
					title="Dimiss on scrim click disabled"
					closeOnScrimClick={false}
				>
					<p>This Drawer will not close if you click on the scrim background</p>
				</Drawer>

				<Drawer
					open={dismissEnabledDrawerOpen}
					onClose={() => toggleDrawerByName("dismiss-on-click")}
					title="Dismiss enabled"
				>
					<p>This Drawer will close when you click on the scrim background</p>
				</Drawer>
			</main>
		);
	},
};

// This story showcases how to use the default Cancel and Apply buttons.
export const withDefaultButtons: Story = {
	render: () => {
		const [drawerOpen, setDrawerOpen] = useState(false);
		const handleSubmit = () => {
			alert("you successfully Applied");
			setDrawerOpen(false);
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
					<Button onClick={() => setDrawerOpen(!drawerOpen)}>
						Toggle Drawer Open
					</Button>
				</section>

				<Drawer
					open={drawerOpen}
					onCancel={() => setDrawerOpen(false)}
					onApply={handleSubmit}
					title="App Settings"
					closeOnScrimClick={false}
				>
					<div className="drawer-container">
						<Switch defaultChecked name="autostart" value="on">
							Auto-start On
						</Switch>
						<Switch name="darkmode" value="on">
							Dark Mode On
						</Switch>
						<Switch defaultChecked name="powersave" value="on">
							Power Save Mode On
						</Switch>
						<Switch name="animations" value="on">
							Animations On
						</Switch>
						<p> You can place any UI elements within this area of the Drawer</p>
					</div>
				</Drawer>
			</main>
		);
	},
};

// This story showcases how Action buttons can work within Form content.
export const WithForm: Story = {
	render: () => {
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
					title="Submission Form"
					closeOnScrimClick={false}
					// Set form attribute to the corresponding Form id
					actions={[
						<Button
							key="cancel-btn"
							variant="secondary"
							onClick={() => {
								const myInput = document.getElementById(
									"the-form",
								) as HTMLFormElement;
								myInput?.reset();
								setFormDrawerOpen(false);
							}}
						>
							Cancel
						</Button>,
						<Button form="the-form" key="submit-btn" type="submit">
							Submit
						</Button>,
					]}
				>
					<Form
						id="the-form"
						className="form-drawer"
						onSubmit={(e: FormEvent<HTMLFormElement>) => {
							e.preventDefault();
							alert("you successfully submitted");
							setFormDrawerOpen(false);
						}}
					>
						<p style={{ paddingBottom: 20 }}>
							Username with Terms of Service Example. User must accept ToS before being
							allowed to proceed.
						</p>
						<TextInput placeholder="username" aria-label="Enter username" key="usernam" />
						<Switch required name="ToS" value="accepted">
							Do you accept the Terms of Service?
						</Switch>
						<Button
							form="the-form"
							key="reset-btn"
							type="reset"
							variant="tertiary"
						>
							Clear Fields
						</Button>
					</Form>
				</Drawer>
			</main>
		);
	},
};

export const WithNote: Story = {
	render: () => {
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
					actions={[
						<TextInput aria-label="Enter note" key={1} />,
						<IconButton aria-label="send note" icon="send" key={2} />,
					]}
				>
					<div className="drawer-container">
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
					</div>
				</Drawer>
			</main>
		);
	},
};

export const CustomWidth: Story = {
	render: () => {
		const [widthRemDrawerOpen, setWidthRemDrawerOpen] = useState(false);
		const [widthPixelDrawerOpen, setWidthPixelDrawerOpen] = useState(false);

		const toggleDrawerByName = (drawerName: string) => {
			switch (drawerName) {
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
					<Button onClick={() => toggleDrawerByName("rem-units")}>
						Drawer using rem units (30rem width)
					</Button>

					<Button onClick={() => toggleDrawerByName("pixel-units")}>
						Drawer using pixel units (350px width)
					</Button>
				</section>
				<section>
					<p>
						These examples show how you can set custom widths for the Drawer
						using either rem or pixel units
					</p>
				</section>

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
					width="350px"
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
	},
};

export const WithScrollbar: Story = {
	render: () => {
		const [scrollbarDrawerOpen, setScrollbarDrawerOpen] = useState(false);

		return (
			<main>
				<section
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "1rem",
					}}
				>
					<Button onClick={() => setScrollbarDrawerOpen(!scrollbarDrawerOpen)}>
						Toggle Notes Drawer Open
					</Button>
				</section>

				<Drawer
					open={scrollbarDrawerOpen}
					onClose={() => setScrollbarDrawerOpen(false)}
					title="Vertical scroll bar"
					actions={[
						<TextInput
							placeholder="Type note"
							aria-label="Enter note"
							key={1}
						/>,
						<IconButton aria-label="send note" icon="send" key={2} />,
					]}
				>
					<div className="drawer-container">
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
						<Note>
							<Note.Title>Meeting notes</Note.Title>
							<Note.Content author="Kathy" self={true}>
								Hi, can we sync?
							</Note.Content>
						</Note>
						<Note>
							<Note.Content author="Cleo">
								Sure, give me 10 minutes.
							</Note.Content>
						</Note>
					</div>
				</Drawer>
			</main>
		);
	},
};
