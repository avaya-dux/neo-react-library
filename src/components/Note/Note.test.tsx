import { type RenderResult, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { composeStories } from "@storybook/react";

import { Note } from "./Note";

import { axe } from "jest-axe";
import * as stories from "./Note.stories";

const { SingleNote, NoteWithCustomAuthor, Editable } = composeStories(stories);

describe("Note", () => {
	const user = userEvent.setup();

	const titleText = "Title";
	const contentText = "Content";
	const authorText = "Author";
	const subtextComponent = (
		<>
			<p>Edited: Me</p>
			<p>May 1, 2024 | 2:00 PM</p>
		</>
	);

	it("renders without exploding", () => {
		render(
			<Note>
				<Note.Title>{titleText}</Note.Title>
				<Note.Content author={authorText} subtext={subtextComponent}>
					{contentText}
				</Note.Content>
			</Note>,
		);

		expect(screen.getByText(titleText)).toBeInTheDocument();
		expect(screen.getByText(contentText)).toBeInTheDocument();
		expect(screen.getByText(authorText)).toBeInTheDocument();
	});

	it("renders with edit state", async () => {
		const mock = vi.fn();

		render(
			<Note state="edit">
				<Note.Title>{titleText}</Note.Title>
				<Note.Content
					author={authorText}
					maxLength={1}
					onTextAreaChange={mock}
					self
					subtext={subtextComponent}
				>
					{contentText}
				</Note.Content>
			</Note>,
		);

		expect(screen.getByText(titleText)).toBeInTheDocument();
		expect(screen.getByText(contentText)).toBeInTheDocument();
		expect(screen.getByText(authorText)).toBeInTheDocument();
		expect(mock).not.toHaveBeenCalled();

		await user.click(screen.getByRole("textbox"));
		await user.keyboard("aa");

		expect(mock).toHaveBeenCalled();
	});

	describe("storybook tests", () => {
		describe("Single Note", () => {
			let renderResult: RenderResult;

			beforeEach(() => {
				renderResult = render(<SingleNote />);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("Note With Custom Author", () => {
			let renderResult: RenderResult;

			beforeEach(() => {
				renderResult = render(<NoteWithCustomAuthor />);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("Editable", () => {
			let renderResult: RenderResult;

			beforeEach(() => {
				renderResult = render(<Editable />);
			});

			it("toggles the textarea when edit is selected", async () => {
				const { getByRole } = renderResult;
				await user.click(getByRole("button", { name: /menu actions/i }));
				await user.click(getByRole("menuitem", { name: /edit Edit/i }));

				expect(getByRole("textbox")).toBeInTheDocument();
			});

			+it("correctly sets author when edit is made", async () => {
				const { getByRole, getByText } = renderResult;

				await user.click(getByRole("button", { name: /menu actions/i }));
				await user.click(getByRole("menuitem", { name: /edit Edit/i }));
				const textarea = getByRole("textbox");
				await user.type(textarea, "aa");
				await user.click(getByRole("button", { name: /save/i }));

				expect(getByText("Edited: Me")).toBeInTheDocument();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});
	});
});
