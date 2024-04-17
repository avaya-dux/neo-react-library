/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Notes } from "./";
import { Button } from "components/Button";
import { Icon } from "components/Icon";

import "./Notes.stories.css";

const meta: Meta<typeof Notes> = {
  component: Notes,
  title: "Components/Notes",
};
export default meta;

type Story = StoryObj<typeof Notes>;

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

        <Notes.Interaction>
          <Notes.Interaction.Heading>
            <Icon icon="email-inbound" aria-label="email inbound" size="md" />

            <p>March 19, 2024 | 12:50 PM</p>
          </Notes.Interaction.Heading>

          <Notes.Interaction.Message>
            <Notes.Interaction.Message.Title>
              March 19, 2024 | 12:50 AM
            </Notes.Interaction.Message.Title>

            <Notes.Interaction.Message.Content author="Me" self>
              Client has sent an email. They did not receive any feedback on
              this claim. They are quite upset. I have set up a meeting to call
              on Monday.
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
        </Notes.Interaction>

        <Notes.Interaction>
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
        </Notes.Interaction>

        <Notes.Interaction>
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
        </Notes.Interaction>
      </Notes>
    </section>
  ),
};

/*
  TODO: dynamic example (with edit/delete), probably needs:
  - "as supervisor" (can edit any message)
  - "as agent" (can only edit/delete their own messages)
*/

/**
 * TODO: add a full exammple of adding a new notes (array of messages that is added to),
 * removing a message, and editing a message.
 */
