/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Notes } from "./";
import { Button } from "components/Button";

const meta: Meta<typeof Notes> = {
  component: Notes,
  title: "Components/Notes",
  args: {
    children: "Notes", // TODO: setup something useful, or just remove
  },
};
export default meta;

type Story = StoryObj<typeof Notes>;
// export const Template: Story = {}; // TODO: is this helpful?

export const StaticNotesExample: Story = {
  render: () => (
    <Notes>
      <Notes.Heading>
        <div>Notes</div>

        <Button variant="primary" size="wide" disabled>
          Add a new note
        </Button>
      </Notes.Heading>

      <Notes.Interaction>
        <Notes.Interaction.Heading>
          <h2>Interaction ONE Heading</h2>
        </Notes.Interaction.Heading>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message ONE Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message ONE Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message TWO Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message TWO Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message THREE Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message THREE Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>
      </Notes.Interaction>

      <Notes.Interaction>
        <Notes.Interaction.Heading>
          <h2>Interaction TWO Heading</h2>
        </Notes.Interaction.Heading>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message ONE Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message ONE Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message TWO Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message TWO Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message THREE Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message THREE Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>
      </Notes.Interaction>

      <Notes.Interaction>
        <Notes.Interaction.Heading>
          <h2>Interaction THREE Heading</h2>
        </Notes.Interaction.Heading>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message ONE Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message ONE Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message TWO Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message TWO Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>

        <Notes.Interaction.Message>
          <Notes.Interaction.Message.Title>
            Message THREE Title
          </Notes.Interaction.Message.Title>

          <Notes.Interaction.Message.Content>
            Message THREE Content
          </Notes.Interaction.Message.Content>
        </Notes.Interaction.Message>
      </Notes.Interaction>
    </Notes>
  ),
};

/*
  TODO: dynamic example (with edit/delete), probably needs:
  - "as supervisor" (can edit any message)
  - "as agent" (can only edit/delete their own messages)
*/
