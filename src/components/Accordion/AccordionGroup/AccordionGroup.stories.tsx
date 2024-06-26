import type { Meta } from "@storybook/react";
import { Sheet } from "components/Sheet";
import { Accordion } from "../Accordion";
import { AccordionGroup, type AccordionGroupProps } from "./AccordionGroup";

export default {
	title: "Components/Accordion",
	component: AccordionGroup,
} as Meta<AccordionGroupProps>;

export const Group = () => {
	return (
		<Sheet title="Sheet title" style={{ width: 600 }}>
			<br />
			<AccordionGroup header="Default Group of Accordion">
				<Accordion header="Heading 1" defaultExpanded>
					some data in the body1
				</Accordion>
				<Accordion header="Heading 2">some data in the body2</Accordion>
				<Accordion header="Heading 3">some data in the body3</Accordion>
			</AccordionGroup>
			<br />
			<br />
			<AccordionGroup
				header="Group of Accordion expand one at a time"
				allowOnlyOne
			>
				<Accordion header="Heading 1">some data in the body1</Accordion>
				<Accordion header="Heading 2">
					<p>Body data with `p` tag</p>
				</Accordion>
				<Accordion header="Heading 3">
					<img src="https://placekitten.com/g/200/300" alt="A Cat" />
				</Accordion>
			</AccordionGroup>
			<br />
			<br />
			<AccordionGroup
				header="Group of Accordion expand one at a time with defaultOpen prop as 'Heading 2'"
				allowOnlyOne
				defaultOpenAccordingIndex={1}
			>
				<Accordion header="Heading 1" disabled>
					some data in the body1
				</Accordion>
				<Accordion header="Heading 2">some data in the body2</Accordion>
				<Accordion header="Heading 3">some data in the body3</Accordion>
			</AccordionGroup>
		</Sheet>
	);
};
