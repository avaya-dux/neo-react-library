/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Note } from "./Note";
import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { Menu, MenuItem } from "components/Menu";
import { useState } from "react";

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

export const NoteInEditMode: Story = {
  render: () => {
    const [content, setContent] = useState("Content");
    const [edit, setEdit] = useState(false);

    const titleActions = (
      <Menu
        aria-label="Actions"
        itemAlignment="right"
        menuRootElement={
          <Button variant="tertiary" size="compact">
            <Icon icon="typing" size="sm" aria-label="menu" />
          </Button>
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

        <MenuItem onClick={() => console.log("delete")}>
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
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          size="compact"
          onClick={() => {
            setEdit(false);
            setContent("New content");
          }}
        >
          Save
        </Button>
      </>
    );

    return (
      <Note>
        <Note.Title actions={titleActions}>Title</Note.Title>

        <Note.Content author="Author" editable={edit} actions={contentActions}>
          {content}
        </Note.Content>
      </Note>
    );
  },
};
