/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Note } from "./Note";
import { Icon } from "components/Icon";

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

// export const MessageInEditMode: Story = {};
