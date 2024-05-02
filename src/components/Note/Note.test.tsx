import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Note } from "./Note";

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
});
