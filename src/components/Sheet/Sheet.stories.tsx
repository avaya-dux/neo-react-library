import { Meta, Story } from "@storybook/react/types-6-0";
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
          Toggle Sheet One Open
        </Button>
        <Button onClick={() => setSheetTwoOpen(!sheetTwoOpen)}>
          Toggle Sheet Two Open
        </Button>
        <Button onClick={() => setSheetThreeOpen(!sheetThreeOpen)}>
          Toggle Sheet Three Open
        </Button>
      </section>

      <Sheet
        open={sheetOneOpen}
        title="Sheet one"
        actions={[
          <Button key="btn1">button 1</Button>,
          <Button key="btn2">second btn</Button>,
        ]}
      >
        <p>
          sheet one content, has non-functional buttons as a part of the header
        </p>
      </Sheet>

      <Sheet open={sheetTwoOpen} aria-label="sheet two">
        <p>sheet two content (no header/title, just content)</p>
      </Sheet>

      <Sheet open={sheetThreeOpen} aria-label="sheet three">
        <p>sheet three content (no header/title, just content)</p>
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
