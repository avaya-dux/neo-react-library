/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Notes } from "./";

const meta: Meta<typeof Notes> = {
  component: Notes,
  title: "Components/Notes",
  args: {
    children: "Notes", // TODO: setup something useful
  },
};
export default meta;

type Story = StoryObj<typeof Notes>;
export const Template: Story = {};

export const MessageExample: Story = {
  render: () => (
    <Notes>
      <Notes.Message>
        <Notes.Message.Title>Message Title</Notes.Message.Title>
        <Notes.Message.Content>Message Content</Notes.Message.Content>
      </Notes.Message>

      <Notes.Message>
        <Notes.Message.Title>Message Title</Notes.Message.Title>
        <Notes.Message.Content>Message Content</Notes.Message.Content>
      </Notes.Message>

      <Notes.Message>
        <Notes.Message.Title>Message Title</Notes.Message.Title>
        <Notes.Message.Content>Message Content</Notes.Message.Content>
      </Notes.Message>
    </Notes>
  ),
};
