import type { Meta, StoryObj } from "@storybook/react";

import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  title: "Components/Stepper",
  args: {
    steps: [
      { title: "Step 1", description: "This is step 1" },
      { title: "Step 2", description: "This is step 2" },
      { title: "Step 3", description: "This is step 3" },
    ],
    activeStep: 1,
    direction: "horizontal",
  },
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    setActiveStep: { table: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;
export const Template: Story = {
  args: {
    setActiveStep: () => {},
  },
};
