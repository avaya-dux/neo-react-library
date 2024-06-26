import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { Menu, MenuItem } from "components/Menu";
import { useState } from "react";
import { Note } from "./Note";

type NoteAndSelf = React.ComponentProps<typeof Note> & {
	self: boolean;
};

const meta: Meta<typeof Note> = {
	component: Note,
	title: "Components/Note",
};
export default meta;

type Story = StoryObj<NoteAndSelf>;

export const SingleNote: Story = {
	args: {
		self: false,
	},
	render: ({ self }) => (
		<Note>
			<Note.Title>Title</Note.Title>
			<Note.Content author="Author" self={self}>
				Content
			</Note.Content>
		</Note>
	),
};

export const NoteWithCustomAuthor: Story = {
	render: () => (
		<Note>
			<Note.Title>Title</Note.Title>
			<Note.Content
				author={
					<div>
						<Icon icon="thumbs-up" aria-label="thumbs up" /> Fred
					</div>
				}
			>
				Content
			</Note.Content>
		</Note>
	),
};

export const Editable: Story = {
	render: () => {
		const [content, setContent] = useState("Content");
		const [subtext, setSubtext] = useState<JSX.Element | undefined>(undefined);
		const [textAreaContent, setTextAreaContent] = useState("Content");
		const [edit, setEdit] = useState(false);

		const titleActions = (
			<Menu
				aria-label="menu actions"
				itemAlignment="right"
				menuRootElement={
					<button
						type="button"
						aria-label="menu actions"
						className="neo-btn-square neo-btn-square--compact neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-ellipses-horizontal"
					/>
				}
			>
				<MenuItem onClick={() => setEdit(true)}>
					<Icon
						style={{ marginRight: "8px" }}
						icon="edit"
						size="sm"
						aria-label="edit"
					/>
					Edit
				</MenuItem>

				<MenuItem
					onClick={() => alert("delete not implemented for this story")}
				>
					<Icon
						style={{ marginRight: "8px" }}
						icon="trash"
						size="sm"
						aria-label="delete"
					/>
					Delete
				</MenuItem>
			</Menu>
		);

		const contentActions = (
			<>
				<Button
					variant="secondary"
					size="compact"
					onClick={() => {
						setEdit(false);
						setTextAreaContent(content);
					}}
				>
					Cancel
				</Button>

				<Button
					variant="primary"
					size="compact"
					onClick={() => {
						setEdit(false);
						setContent(textAreaContent);
					}}
				>
					Save
				</Button>
			</>
		);

		return (
			<section>
				<p>
					INSTRUCTIONS: make an edit to see the &ldquo;history&rdquo; section of
					the Note.
				</p>

				<Note state={edit ? "edit" : "readonly"}>
					<Note.Title actions={titleActions}>Title</Note.Title>

					<Note.Content
						author="Author"
						actions={contentActions}
						subtext={subtext}
						onTextAreaChange={(e) => {
							setTextAreaContent(e.currentTarget.value);

							const date = new Date();
							const [month, day, year] = [
								date.toLocaleString("default", { month: "long" }),
								date.getDate(),
								date.getFullYear(),
							];
							const minutes = date.getMinutes();
							const minute = minutes < 10 ? `0${minutes}` : minutes;
							const hours = date.getHours();
							const hour = hours > 12 ? hours - 12 : hours;
							const period = hours > 12 ? "PM" : "AM";
							setSubtext(
								<>
									<p>Edited: Me</p>
									<p>
										{month} {day}, {year} | {hour}:{minute} {period}
									</p>
								</>,
							);
						}}
					>
						{content}
					</Note.Content>
				</Note>
			</section>
		);
	},
};
