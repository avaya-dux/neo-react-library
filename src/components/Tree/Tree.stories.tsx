import { Meta } from "@storybook/react/types-6-0";
import { DetailedHTMLProps, FC, LabelHTMLAttributes, useState } from "react";

import { Accordion } from "components/Accordion";
import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";
import { Icon } from "components/Icon";
import { IconButton } from "components/IconButton";
import { List } from "components/List";
import { ListSection } from "components/ListItem";
import { Sheet } from "components/Sheet";

import { Branch, Leaf, Tree, TreeProps } from ".";

export default {
  title: "Components/Tree",
  component: Tree,
} as Meta<TreeProps>;

const Divider = () => (
  <div style={{ margin: "2rem 0", borderBottom: "1px solid black" }} />
);

const ListItem: FC = ({ children }) => (
  <ListSection style={{ height: "auto" }}>{children}</ListSection>
);

export const Default = () => {
  const storySheetStyles = {
    width: 400,
    marginBottom: "2rem",
  };

  const [sheetsOpen, setSheetsOpen] = useState({
    examples: true,
    description: true,
    navigation: true,
  });

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Sheet
        open={sheetsOpen.examples}
        slide
        style={storySheetStyles}
        title="Trees with and without groupings"
        actions={[
          <Button
            key="btn-hide"
            onClick={() =>
              setSheetsOpen({
                ...sheetsOpen,
                examples: false,
              })
            }
          >
            Hide
          </Button>,
        ]}
      >
        <Divider />

        <Tree label="Flat Tree">
          <Leaf>leaf one</Leaf>

          <Leaf>leaf two</Leaf>
        </Tree>

        <Divider />

        <Tree label="Nested Tree">
          <Branch title="Branch One (string)">
            <Leaf>leaf one</Leaf>
          </Branch>

          <Branch
            title={
              <div>
                <b>Branch Two</b> (div)
              </div>
            }
          >
            <Leaf>leaf two</Leaf>

            <Branch title="Branch Three (string)">
              <Leaf>leaf three</Leaf>
            </Branch>

            <Leaf>leaf four</Leaf>
          </Branch>
        </Tree>

        <Divider />
      </Sheet>

      <Sheet
        open={sheetsOpen.description}
        slide
        style={storySheetStyles}
        title="Tree Description"
        actions={[
          <Button
            key="btn-hide"
            onClick={() =>
              setSheetsOpen({
                ...sheetsOpen,
                description: false,
              })
            }
          >
            Hide
          </Button>,
        ]}
      >
        <Divider />

        <p>
          The <code>Tree</code> component takes a <code>label</code> (or{" "}
          <code>aria-label</code>) prop, and children. The children can be{" "}
          <code>Leaf</code> or <code>Branch</code> components.
        </p>

        <Divider />

        <p>
          A <code>Branch</code> component takes <code>children</code>, (which
          can be a <code>Leaf</code> or <code>Branch</code>), a{" "}
          <code>title</code> prop, and an optional <code>actions</code> prop.
        </p>

        <Divider />

        <p>
          A <code>Leaf</code> component takes <code>children</code> and an
          optional <code>actions</code> prop.
        </p>

        <Divider />
      </Sheet>

      <Sheet
        open={sheetsOpen.navigation}
        slide
        style={storySheetStyles}
        title="Tree Keyboard Navigation Support"
        actions={[
          <Button
            key="btn-hide"
            onClick={() =>
              setSheetsOpen({
                ...sheetsOpen,
                navigation: false,
              })
            }
          >
            Hide
          </Button>,
        ]}
      >
        <Divider />

        <Accordion header="Left Arrow">
          <List>
            <ListItem>When focus is on an open node, closes the node.</ListItem>

            <ListItem>
              When focus is on a root node that is closed, does nothing.
            </ListItem>
          </List>
        </Accordion>

        <Accordion header="Right Arrow">
          <List>
            <ListItem>
              When focus is on a closed node, opens the node; focus does not
              move.
            </ListItem>

            <ListItem>When focus is on a leaf node, does nothing.</ListItem>
          </List>
        </Accordion>

        <Accordion header="Up arrow">
          <List>
            <ListItem>
              Moves focus to the previous node that is focusable without opening
              or closing a node.
            </ListItem>

            <ListItem>If focus is on the first node, does nothing.</ListItem>
          </List>
        </Accordion>

        <Accordion header="Down arrow">
          <List>
            <ListItem>
              Moves focus to the next node that is focusable without opening or
              closing a node.
            </ListItem>

            <ListItem>If focus is on the last node, does nothing.</ListItem>
          </List>
        </Accordion>

        <Accordion header="Home">
          <List>
            <ListItem>
              Moves focus to first node without opening or closing a node.
            </ListItem>
          </List>
        </Accordion>

        <Accordion header="End">
          <List>
            <ListItem>
              Moves focus to the last node that can be focused without expanding
              any nodes that are closed.
            </ListItem>
          </List>
        </Accordion>
      </Sheet>

      <Sheet style={storySheetStyles} title="Show Hidden Sheets">
        <Divider />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            disabled={sheetsOpen.examples}
            onClick={() =>
              setSheetsOpen({
                ...sheetsOpen,
                examples: true,
              })
            }
          >
            Show Examples
          </Button>

          <Button
            disabled={sheetsOpen.description}
            style={{ marginTop: 5, marginBottom: 5 }}
            onClick={() =>
              setSheetsOpen({
                ...sheetsOpen,
                description: true,
              })
            }
          >
            Show Description
          </Button>

          <Button
            disabled={sheetsOpen.navigation}
            onClick={() =>
              setSheetsOpen({
                ...sheetsOpen,
                navigation: true,
              })
            }
          >
            Show Keyboard Support
          </Button>
        </div>
      </Sheet>
    </section>
  );
};

const FullTreeExamples = (props: TreeProps) => (
  <Tree {...props}>
    <Branch title="Branch One Label">
      <Leaf>one</Leaf>
      <Leaf>two</Leaf>
      <Leaf>three</Leaf>
    </Branch>

    <Branch
      title="Branch Two Label, has actions"
      actions={[
        <Button
          key="sub-tree-two-button-one"
          onClick={() => alert("Branch two, button one clicked")}
        >
          button one
        </Button>,
        <IconButton
          aria-label="click here for more options"
          icon="more"
          key="sub-tree-two-button-two"
          onClick={() => alert("Branch two, button two clicked")}
          variant="tertiary"
        />,
      ]}
    >
      <Leaf>four</Leaf>
      <Leaf>five</Leaf>
      <Leaf>six</Leaf>
    </Branch>

    <Branch title="Branch Three Label">
      <Branch title="Branch Three, Branch Three-One Label">
        <Leaf>seven</Leaf>
        <Leaf>eight</Leaf>
        <Leaf>nine</Leaf>
        <Branch title="Branch Three, Branch Three-One, Branch Three-One-One Label">
          <Leaf>ten</Leaf>
          <Leaf>eleven</Leaf>
          <Leaf>twelve</Leaf>
        </Branch>
      </Branch>
      <Leaf>thirteen</Leaf>
      <Leaf>fourteen</Leaf>
    </Branch>
  </Tree>
);

export const DirectionExamples = () => {
  const [sheetLtrOpen, setSheetLtrOpen] = useState(true);
  const [sheetRtlOpen, setSheetRtlOpen] = useState(true);

  return (
    <section>
      <Divider />

      <section
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button onClick={() => setSheetLtrOpen(!sheetLtrOpen)}>
          Toggle LTR Sheet
        </Button>

        <Button onClick={() => setSheetRtlOpen(!sheetRtlOpen)}>
          Toggle RTL Sheet
        </Button>
      </section>

      <Divider />

      <Sheet aria-label="Direction left-to-right" open={sheetLtrOpen}>
        <FullTreeExamples label="Direction left-to-right `dir=ltr`" dir="ltr" />
      </Sheet>

      <Divider />

      <Sheet aria-label="Direction right-to-left" open={sheetRtlOpen}>
        <FullTreeExamples label="Direction right-to-left `dir=rtl`" dir="rtl" />
      </Sheet>

      <Divider />
    </section>
  );
};

const MockButton = () => (
  <Button onClick={() => alert("ping")} variant="secondary">
    mock
  </Button>
);

export const EmbededActions = () => {
  return (
    <Sheet title="Embedded Actions Sheet">
      <Tree label="Embedded Actions Tree">
        <Leaf>
          <div>
            Leaf <b>One</b>
          </div>
        </Leaf>

        <Branch title="Branch without actions">
          <Leaf>one</Leaf>
          <Leaf>two</Leaf>
        </Branch>

        <Branch title="Branch with actions" actions={<MockButton />}>
          <Leaf actions={<MockButton />} disabled>
            disabled Leaf
          </Leaf>

          <Leaf actions={<MockButton />}>not disabled Leaf</Leaf>

          <Branch title="Branch with actions" actions={<MockButton />}>
            <Leaf actions={<MockButton />} disabled>
              disabled Leaf
            </Leaf>

            <Leaf actions={<MockButton />}>not disabled Leaf</Leaf>
          </Branch>
        </Branch>

        <Leaf>
          <div>
            Leaf <b>Final</b>
          </div>
        </Leaf>
      </Tree>

      <Divider />

      <section style={{ display: "flex" }}>
        <span>Tab-able item (for checking tab order):</span>

        <IconButton icon="check" aria-label="check icon" />
      </section>

      <Divider />

      <p>
        Need to implement better keyboard navigation:{" "}
        <a href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/treegrid/treegrid-1.html#kbd_label">
          W3 Tree Grid
        </a>
      </p>

      <ul style={{ marginLeft: "2rem" }}>
        <li>
          <b>Right Arrow</b>, if expanded, moves to first child
        </li>

        <li>
          <b>Left Arrow</b>, if collapsed, moves to parent
        </li>

        <li>
          <b>Tab</b>, moves focus to the next interactive widget in the current
          row. If there are no more interactive widgets in the current row,
          moves focus out of the treegrid.
        </li>
      </ul>
    </Sheet>
  );
};

const Label: FC<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
> = ({ children, ...rest }) => (
  <label style={{ fontWeight: "bolder", paddingBottom: "5px" }} {...rest}>
    {children}
  </label>
);

const Section: FC = ({ children }) => (
  <div
    style={{
      paddingBottom: "15px",
      marginBottom: "15px",
      borderBottom: "solid 1px black",
    }}
  >
    {children}
  </div>
);

export const LeafContentExamples = () => {
  return (
    <Sheet title="Leaf Content Examples" style={{ width: 400 }}>
      <Section>
        <Label id="label-one">string contents</Label>

        <Tree aria-describedby="label-one">
          <Leaf>leaf one</Leaf>

          <Leaf>leaf two</Leaf>
        </Tree>
      </Section>

      <Section>
        <Label id="label-two">contents with action(s)</Label>

        <Tree aria-describedby="label-two">
          <Leaf actions={<MockButton />}>leaf one</Leaf>

          <Leaf
            actions={[
              <MockButton key="btn-one" />,
              <MockButton key="btn-two" />,
            ]}
          >
            leaf two
          </Leaf>

          <Leaf
            actions={
              <>
                <MockButton />
                <MockButton />
              </>
            }
          >
            leaf three
          </Leaf>
        </Tree>
      </Section>

      <Section>
        <Label id="label-three">complex content examples</Label>

        <Tree aria-describedby="label-three" dir="ltr">
          <Leaf>
            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />
            dir === ltr
          </Leaf>

          <Leaf dir="rtl">
            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />
            dir === rtl
          </Leaf>

          <Leaf actions={<MockButton />} dir="rtl">
            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />
            dir === rtl
          </Leaf>

          <Leaf actions={<MockButton />} dir="ltr">
            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />
            dir === ltr
          </Leaf>

          <Leaf>
            <Checkbox aria-labelledby="checkbox-label-one" value="none" />

            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />

            <span id="checkbox-label-one">dir === ltr</span>
          </Leaf>

          <Leaf dir="rtl">
            <Checkbox aria-labelledby="checkbox-label-two" value="none" />

            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />

            <span id="checkbox-label-two">dir === rtl</span>
          </Leaf>
        </Tree>
      </Section>

      <Section>
        <Label id="label-four">disabled content</Label>

        <Tree aria-describedby="label-four">
          <Leaf>enabled leaf</Leaf>

          <Leaf disabled>disabled leaf</Leaf>

          <Branch title="enabled branch">
            <Leaf>enabled leaf</Leaf>
            <Leaf disabled>disabled leaf</Leaf>
          </Branch>

          <Branch disabled title="disabled branch">
            <Leaf>enabled leaf</Leaf>
            <Leaf disabled>disabled leaf</Leaf>
          </Branch>
        </Tree>
      </Section>
    </Sheet>
  );
};
