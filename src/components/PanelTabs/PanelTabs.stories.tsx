/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { IconNamesType } from "@avaya/neo-icons/neo-icon-names-type";
import { useState } from "react";

import { Button } from "components/Button";
import { Icon } from "components/Icon/Icon";
import { Note } from "components/Note";

import { PanelTabs } from "./PanelTabs";

import "./PanelTabs.stories.css";

const meta: Meta<typeof PanelTabs> = {
  component: PanelTabs,
  title: "Components/Panel Tabs",
};
export default meta;

type PanelTabsAndAuthor = React.ComponentProps<typeof PanelTabs> & {
  author?: string;
};
type Story = StoryObj<PanelTabsAndAuthor>;

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
    type: "call-inbound",
    messages: [
      {
        id: "call-2-note-1",
        date: "March 8, 2024 | 12:32 AM",
        author: "Barbara Leyton",
        content: "Client has been in accident, and would like a claim started.",
      },
    ],
  },
  {
    id: "unknown-1",
    date: "March 7, 2024 | 12:32 AM",
    messages: [
      {
        id: "call-2-note-1",
        date: "March 7, 2024 | 12:32 AM",
        author: "Joe Sebast",
        content: "Test test",
      },
    ],
  },
];
export const AgentNotesExample: Story = {
  args: {
    author: "Bob Frank",
  },
  render: ({ author }) => {
    const [index, setIndex] = useState(0);
    const [interactions] = useState(mockApiResult);

    return (
      <section className="stories-paneltabs-container">
        <PanelTabs>
          <PanelTabs.Panel>
            <PanelTabs.PanelContent active={index === 0}>
              <div className="stories-heading">
                <p>Notes</p>

                <Button variant="primary" size="wide" disabled>
                  Add a new note
                </Button>
              </div>

              {interactions.map((interaction) => (
                <section className="stories-interaction" key={interaction.id}>
                  <div className="stories-interaction__heading">
                    {interaction.type ? (
                      <Icon
                        icon={interaction.type as IconNamesType}
                        aria-label={interaction.type.replace("-", " ")}
                        size="md"
                      />
                    ) : (
                      <Icon
                        icon="input-output"
                        aria-label="unknown interaction type"
                        size="md"
                      />
                    )}

                    <p>{interaction.date}</p>
                  </div>

                  {interaction.messages.map((message) => (
                    <Note key={message.id}>
                      <Note.Title>{message.date}</Note.Title>

                      <Note.Content
                        author={
                          message.author === author ? "Me" : message.author
                        }
                        self={message.author === author}
                      >
                        {message.content}
                      </Note.Content>
                    </Note>
                  ))}
                </section>
              ))}
            </PanelTabs.PanelContent>

            <PanelTabs.PanelContent
              className="agent-notes-content-width"
              active={index === 1}
            >
              <p>No Content</p>
            </PanelTabs.PanelContent>
          </PanelTabs.Panel>

          <PanelTabs.TabsContainer>
            <PanelTabs.TabItem
              active={index === 0}
              aria-label="Agent notes"
              icon="posts"
              onClick={() => setIndex(0)}
            />

            <PanelTabs.TabItem
              active={index === 1}
              aria-label="Agents"
              icon="agents"
              onClick={() => setIndex(1)}
            />
          </PanelTabs.TabsContainer>
        </PanelTabs>
      </section>
    );
  },
};

export const SimplePanelTabs: Story = {
  render: () => {
    const [index, setIndex] = useState(0);

    return (
      <section className="stories-paneltabs-container">
        <PanelTabs>
          <PanelTabs.Panel>
            <PanelTabs.PanelContent active={index === 0}>
              <p>email inbound</p>
            </PanelTabs.PanelContent>

            <PanelTabs.PanelContent active={index === 1}>
              <p>email outbound</p>
            </PanelTabs.PanelContent>

            <PanelTabs.PanelContent active={index === 2}>
              <p>input output</p>
            </PanelTabs.PanelContent>
          </PanelTabs.Panel>

          <PanelTabs.TabsContainer>
            <PanelTabs.TabItem
              active={index === 0}
              aria-label="Example One"
              icon="email-inbound"
              onClick={() => setIndex(0)}
            />

            <PanelTabs.TabItem
              active={index === 1}
              aria-label="Example Two"
              icon="email-outbound"
              onClick={() => setIndex(1)}
            />

            <PanelTabs.TabItem
              active={index === 2}
              aria-label="Example Three"
              badge
              icon="add"
              onClick={() => setIndex(2)}
            />
          </PanelTabs.TabsContainer>
        </PanelTabs>
      </section>
    );
  },
};
