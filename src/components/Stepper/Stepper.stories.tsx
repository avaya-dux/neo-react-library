import type { Meta, StoryObj } from "@storybook/react";

import { Stepper, Steps } from "./Stepper";
import { useState } from "react";
import { Button } from "components/Button";

const steps: Steps[] = [
  { title: "Step 1", description: "This is step 1" },
  { title: "Step 2", description: "This is step 2" },
  { title: "Step 3", description: "This is step 3" },
  { title: "Step 4", description: "This is step 4" },
  { title: "Step 5", description: "This is step 5" },
];

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  title: "Components/Stepper",
  args: {
    steps: steps,
    activeStep: 1,
    direction: "horizontal",
    type: "linear",
    onStepClick: () => {},
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
    onStepClick: { table: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;
export const Template: Story = {};

export const LinearHorizontal: Story = {
  argTypes: {
    direction: { control: false },
    type: { control: false },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeStep, setActiveStep] = useState(0);

    return (
      <section>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          direction="horizontal"
          type="linear"
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

export const EditableHorizontal: Story = {
  argTypes: {
    direction: { control: false },
    type: { control: false },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeStep, setActiveStep] = useState(0);

    return (
      <section>
        <Stepper
          activeStep={activeStep}
          direction="horizontal"
          onStepClick={(index) => setActiveStep(index)}
          steps={steps}
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
