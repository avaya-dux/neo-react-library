/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Notes } from "./";
import { Button } from "components/Button";
import { Icon } from "components/Icon";

import "./Notes.stories.css";
import { useState } from "react";
import { IconNamesType } from "@avaya/neo-icons/neo-icon-names-type";

type NotesAndAuthor = React.ComponentProps<typeof Notes> & {
  author?: string;
  canEdit?: boolean;
};

const meta: Meta<typeof Notes> = {
  component: Notes,
  title: "Components/Notes",
};
export default meta;

type Story = StoryObj<NotesAndAuthor>;

const defaultInteractions = [
  <Notes.Interaction key={1}>
    <Notes.Interaction.Heading>
      <Icon icon="email-inbound" aria-label="email inbound" size="md" />

      <p>March 19, 2024 | 12:50 PM</p>
    </Notes.Interaction.Heading>

    <Notes.Interaction.Message>
      <Notes.Interaction.Message.Title>
        March 19, 2024 | 12:50 AM
      </Notes.Interaction.Message.Title>

      <Notes.Interaction.Message.Content author="Me" self>
        Client has sent an email. They did not receive any feedback on this
        claim. They are quite upset. I have set up a meeting to call on Monday.
      </Notes.Interaction.Message.Content>
    </Notes.Interaction.Message>

    <Notes.Interaction.Message>
      <Notes.Interaction.Message.Title>
        March 19, 2024 | 12:32 AM
      </Notes.Interaction.Message.Title>

      <Notes.Interaction.Message.Content author="Barbara Leyton">
        Transferring this to you. I think we need to escalate this.
      </Notes.Interaction.Message.Content>
    </Notes.Interaction.Message>
  </Notes.Interaction>,

  <Notes.Interaction key={2}>
    <Notes.Interaction.Heading>
      <Icon icon="call-outbound" aria-label="call outbound" size="md" />

      <p>March 15, 2024 | 12:28 AM</p>
    </Notes.Interaction.Heading>

    <Notes.Interaction.Message>
      <Notes.Interaction.Message.Title>
        May 10, 2024 | 12:28 AM
      </Notes.Interaction.Message.Title>

      <Notes.Interaction.Message.Content author="Barbara Leyton">
        Client called to ask for an update. Sent an email to the claim
        department. Need to call when we have an update.
      </Notes.Interaction.Message.Content>
    </Notes.Interaction.Message>
  </Notes.Interaction>,

  <Notes.Interaction key={3}>
    <Notes.Interaction.Heading>
      <Icon icon="call-outbound" aria-label="call outbound" size="md" />

      <p>March 8, 2024 | 12:28 AM</p>
    </Notes.Interaction.Heading>

    <Notes.Interaction.Message>
      <Notes.Interaction.Message.Title>
        March 8, 2024 | 12:32 AM
      </Notes.Interaction.Message.Title>

      <Notes.Interaction.Message.Content author="Barbara Leyton">
        Client has been in accident, and would like a claim started.
      </Notes.Interaction.Message.Content>
    </Notes.Interaction.Message>
  </Notes.Interaction>,
];
export const StaticNotesExample: Story = {
  render: () => (
    <section className="notes-container">
      <Notes>
        <Notes.Heading>
          <p>Notes</p>

          <Button variant="primary" size="wide" disabled>
            Add a new note
          </Button>
        </Notes.Heading>

        {defaultInteractions}
      </Notes>
    </section>
  ),
};

const mockApiResult = [
  {
    id: "email-1",
    date: "March 19, 2024 | 12:50 AM",
    type: "email-inbound", // per Steve Kiser: this may not exist
    messages: [
      {
        id: "email-1-note-1",
        date: "March 19, 2024 | 12:50 AM",
        author: "Bob Frank",
        content:
          "Client has sent an email. They did not receive any feedback on this claim. They are quite upset. I have set up a meeting to call on Monday.",
      },
      {
        id: "email-1-note-2",
        date: "March 19, 2024 | 12:32 AM",
        author: "Barbara Leyton",
        content: "Transferring this to you. I think we need to escalate this.",
      },
    ],
  },
  {
    id: "call-1",
    date: "May 10, 2024 | 12:28 AM",
    type: "call-outbound",
    messages: [
      {
        id: "call-1-note-1",
        date: "May 10, 2024 | 12:28 AM",
        author: "Barbara Leyton",
        content:
          "Client called to ask for an update. Sent an email to the claim department. Need to call when we have an update.",
      },
    ],
  },
  {
    id: "call-2",
    date: "March 8, 2024 | 12:32 AM",
    type: "call-outbound",
    messages: [
      {
        id: "call-2-note-1",
        date: "March 8, 2024 | 12:32 AM",
        author: "Barbara Leyton",
        content: "Client has been in accident, and would like a claim started.",
      },
    ],
  },
];
export const DynamicNotesExample: Story = {
  args: {
    author: "Bob Frank",
    canEdit: true,
  },
  render: ({ author, canEdit }) => {
    const [interactions] = useState(mockApiResult);
    // const [interactions, setInteractions] = useState(mockApiResult);
    // TODO: add a new note functionality
    // TODO: edit a note functionality
    // TODO: remove a note functionality

    return (
      <section className="notes-container">
        <Notes>
          <Notes.Heading>
            <p>Notes</p>

            <Button variant="primary" size="wide" disabled={canEdit === false}>
              Add a new note
            </Button>
          </Notes.Heading>

          {interactions.map((interaction) => (
            <Notes.Interaction key={interaction.id}>
              <Notes.Interaction.Heading>
                <Icon
                  icon={interaction.type as IconNamesType}
                  aria-label={interaction.type.replace("-", " ")}
                  size="md"
                />

                <p>{interaction.date}</p>
              </Notes.Interaction.Heading>

              {interaction.messages.map((message) => (
                <Notes.Interaction.Message key={message.id}>
                  <Notes.Interaction.Message.Title>
                    {message.date}
                  </Notes.Interaction.Message.Title>

                  <Notes.Interaction.Message.Content
                    author={message.author === author ? "Me" : message.author}
                    self={message.author === author}
                  >
                    {message.content}
                  </Notes.Interaction.Message.Content>
                </Notes.Interaction.Message>
              ))}
            </Notes.Interaction>
          ))}
        </Notes>
      </section>
    );
  },
};
