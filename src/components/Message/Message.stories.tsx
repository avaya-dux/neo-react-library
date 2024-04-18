/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Message } from "./Message";
import { Icon } from "components/Icon";

type MessageAndSelf = React.ComponentProps<typeof Message> & {
  self: boolean;
};

const meta: Meta<typeof Message> = {
  component: Message,
  title: "Components/Message",
};
export default meta;

type Story = StoryObj<MessageAndSelf>;

export const SingleMessage: Story = {
  args: {
    self: false,
  },
  render: ({ self }) => (
    <Message>
      <Message.Title>Title</Message.Title>
      <Message.Content author="Author" self={self}>
        Content
      </Message.Content>
    </Message>
  ),
};

export const MessageWithCustomAuthor: Story = {
  render: () => (
    <Message>
      <Message.Title>Title</Message.Title>
      <Message.Content
        author={
          <div>
            <Icon icon="thumbs-up" aria-label="thumbs up" /> Fred
          </div>
        }
      >
        Content
      </Message.Content>
    </Message>
  ),
};
