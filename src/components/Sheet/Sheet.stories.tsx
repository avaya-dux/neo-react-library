import { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/Button";

import { Sheet, SheetProps } from "./";

export default {
  title: "Components/Sheet",
  component: Sheet,
} as Meta<SheetProps>;

export const Default = () => {
  const [sheetOneOpen, setSheetOneOpen] = useState(false);
  const [sheetTwoOpen, setSheetTwoOpen] = useState(false);
  const [sheetThreeOpen, setSheetThreeOpen] = useState(false);
  const [sheetFourOpen, setSheetFourOpen] = useState(false);
  const [sheetFiveOpen, setSheetFiveOpen] = useState(false);

  const closeSheetByNumber = (sheetNumber: number) => {
    switch (sheetNumber) {
      case 1:
        setSheetOneOpen(false);
        break;
      case 2:
        setSheetTwoOpen(false);
        break;
      case 3:
        setSheetThreeOpen(false);
        break;
      case 4:
        setSheetFourOpen(false);
        break;
      case 5:
        setSheetFiveOpen(false);
        break;
    }
  };

  return (
    <main>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",

          marginBottom: "1rem",
        }}
      >
        <Button onClick={() => setSheetOneOpen(!sheetOneOpen)}>
          Toggle Sheet 1 Open
        </Button>
        <Button onClick={() => setSheetTwoOpen(!sheetTwoOpen)}>
          Toggle Sheet 2 Open
        </Button>
        <Button onClick={() => setSheetThreeOpen(!sheetThreeOpen)}>
          Toggle Sheet 3 Open
        </Button>
        <Button onClick={() => setSheetFourOpen(!sheetFourOpen)}>
          Toggle Sheet 4 Open
        </Button>
        <Button onClick={() => setSheetFiveOpen(!sheetFiveOpen)}>
          Toggle Sheet 5 Open
        </Button>
      </section>

      <Sheet
        open={sheetOneOpen}
        title="Sheet one"
        actions={[
          <Button key="btn1">Custom Action 1</Button>,
          <Button key="btn2">Custom Action 2</Button>,
        ]}
      >
        <p>
          This sheet should have two buttons with custom actions as a part of
          the header
        </p>
      </Sheet>

      <Sheet
        open={sheetTwoOpen}
        aria-label="sheet two"
        title="This is a title"
        onBack={() => {
          closeSheetByNumber(2);
        }}
        onClose={() => {
          closeSheetByNumber(2);
        }}
      >
        <p>
          This sheet should have both Back and Close buttons and also a title
        </p>
      </Sheet>

      <Sheet open={sheetThreeOpen} aria-label="sheet three">
        <p>sheet three content (no header/title, just content)</p>
      </Sheet>
      <Sheet
        open={sheetFourOpen}
        aria-label="sheet four"
        onBack={() => {
          closeSheetByNumber(4);
        }}
      >
        <p>This sheet should have a Back button only</p>
      </Sheet>

      <Sheet
        open={sheetFiveOpen}
        aria-label="sheet five"
        title="Sheet with Close button"
        onClose={() => {
          closeSheetByNumber(5);
        }}
      >
        <p>This sheet should have a Close button only and a title</p>
      </Sheet>
    </main>
  );
};

const Template: Story<SheetProps> = (props: SheetProps) => <Sheet {...props} />;
export const Templated = Template.bind({});
Templated.args = {
  id: "example",
  title: "Sheet title",
  slide: true,
  open: true,
  actions: [
    <Button key="btn1">button 1</Button>,
    <Button key="btn2">second btn</Button>,
  ],
  children: <p>sheet content</p>,
};
