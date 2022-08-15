import { Meta } from "@storybook/react/types-6-0";
import { Sheet } from "components/Sheet";
import { Accordion } from "./Accordion";

export default {
  title: "Components/Accordion",
  component: Accordion,
} as Meta;

export const Default = () => (
  <Sheet title="Accordion Examples" style={{ width: 400 }}>
    <Accordion header="Accordion Header">Some text in body</Accordion>

    <Accordion header="Accordion with expand true" defaultExpanded>
      Some text in body
    </Accordion>

    <Accordion header="Header Disabled" disabled />
    <Accordion header="Accordion Header test">Some text in body</Accordion>
  </Sheet>
);
