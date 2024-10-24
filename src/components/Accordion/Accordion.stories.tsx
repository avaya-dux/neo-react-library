import type { Meta, StoryObj } from "@storybook/react";
import { Sheet } from "components/Sheet";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
	title: "Components/Accordion",
	component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
	render: () => (
		<Sheet title="Accordion Examples" style={{ width: 400 }}>
			<Accordion header="Accordion Header">Some text in body</Accordion>

			<Accordion header="Accordion with expand true" defaultExpanded>
				Some text in body
			</Accordion>

			<Accordion header="Header Disabled" disabled />

			<Accordion header="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat harum in, ut possimus, porro accusamus beatae ab officiis quae consectetur quia? Fugiat ea, sunt fuga numquam accusamus nemo odio praesentium.">
				Some text in body Lorem ipsum dolor sit amet consectetur adipisicing
				elit. Aliquid voluptatum corrupti voluptatibus perferendis magni,
				possimus animi provident dolor, quia repudiandae in id ullam quas
				expedita esse, laborum labore libero dolorem?
			</Accordion>
		</Sheet>
	),
};
