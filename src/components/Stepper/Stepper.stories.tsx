import type { Meta, StoryObj } from "@storybook/react";

import { Stepper, Steps } from "./Stepper";
import { useState } from "react";
import { Button } from "components/Button";

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
    type: "linear",
    // setActiveStep: () => {}, // TODO: implement
  },
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    type: {
      control: { type: "radio" },
      options: ["linear", "editable"],
    },
    // setActiveStep: { table: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;
export const Template: Story = {};

const steps: Steps[] = [
  { title: "Step 1", description: "This is step 1" },
  { title: "Step 2", description: "This is step 2" },
  { title: "Step 3", description: "This is step 3" },
];
export const LinearHorizontal: Story = {
  argTypes: {
    direction: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
      <section>
        <Stepper
          steps={[
            { title: "Step 1", description: "This is step 1" },
            { title: "Step 2", description: "This is step 2" },
            { title: "Step 3", description: "This is step 3" },
          ]}
          activeStep={activeStep}
          direction="horizontal"
          type="editable"
        />

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="secondary"
            disabled={activeStep < 1}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            disabled={activeStep > steps.length - 1}
            onClick={() => setActiveStep(activeStep + 1)}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </section>
    );
  },
};
