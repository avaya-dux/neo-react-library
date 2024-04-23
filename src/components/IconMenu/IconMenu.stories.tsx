/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { IconNamesType } from "@avaya/neo-icons/neo-icon-names-type";
import { useState } from "react";

import { IconMenu } from "./IconMenu";
import { Button } from "components/Button";
import { Icon } from "components/Icon/Icon";
import { Message } from "components/Message";
import { IconButton } from "components/IconButton";

import "./IconMenu.stories.css";

const meta: Meta<typeof IconMenu> = {
  component: IconMenu,
  title: "Components/Icon Menu",
};
export default meta;

type IconMenuAndAuthor = React.ComponentProps<typeof IconMenu> & {
  author?: string;
  canEdit?: boolean;
};
type Story = StoryObj<IconMenuAndAuthor>;

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
    canEdit: true,
  },
  render: ({ author, canEdit }) => {
    const [interactions] = useState(mockApiResult);
    // const [interactions, setInteractions] = useState(mockApiResult);
    // TODO: add a new note functionality
    // TODO: edit a note functionality
    // TODO: remove a note functionality

    return (
      <section className="stories-iconmenu-container">
        <IconMenu>
          <div className="stories-heading">
            <p>Notes</p>

            <Button variant="primary" size="wide" disabled={canEdit === false}>
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
                <Message key={message.id}>
                  <Message.Title>{message.date}</Message.Title>

                  <Message.Content
                    author={message.author === author ? "Me" : message.author}
                    self={message.author === author}
                  >
                    {message.content}
                  </Message.Content>
                </Message>
              ))}
            </section>
          ))}
        </IconMenu>
      </section>
    );
  },
};

export const SimpleIconMenu: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const [expanded, setExpanded] = useState(true);

    return (
      <section className="stories-iconmenu-container">
        <div className="neo-iconmenu">
          <div
            className={clsx("neo-iconmenu__panels", !expanded && "collapsed")}
          >
            <div className="neo-iconmenu__panels-panel" hidden={index !== 0}>
              <p>email inbound</p>
            </div>

            <div className="neo-iconmenu__panels-panel" hidden={index !== 1}>
              <p>email outbound</p>
            </div>

            <div className="neo-iconmenu__panels-panel" hidden={index !== 2}>
              <p>input output</p>
            </div>
          </div>

          <div className="neo-iconmenu__menuitems">
            <div>
              <IconButton
                className={clsx(
                  "neo-iconmenu__menuitems-item",
                  index === 0 && "active",
                )}
                onClick={() => setIndex(0)}
                aria-label="Example One"
                icon="email-inbound"
                iconSize="md"
                variant="tertiary"
              />

              <IconButton
                className={clsx(
                  "neo-iconmenu__menuitems-item",
                  index === 1 && "active",
                )}
                onClick={() => setIndex(1)}
                aria-label="Example Two"
                icon="email-outbound"
                iconSize="md"
                variant="tertiary"
              />

              <IconButton
                className={clsx(
                  "neo-iconmenu__menuitems-item",
                  index === 2 && "active",
                )}
                onClick={() => setIndex(2)}
                aria-label="Example Three"
                icon="input-output"
                iconSize="md"
                variant="tertiary"
              />
            </div>

            <IconButton
              className={clsx(
                "neo-iconmenu__menuitems-expand",
                !expanded && "invert",
              )}
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? "Collapse" : "Expand"}
              icon="page-last"
              iconSize="md"
              variant="tertiary"
            />
          </div>
        </div>
      </section>
    );
  },
};
