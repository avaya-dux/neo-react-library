import { render, screen } from "@testing-library/react";

import { Stepper, Steps } from "./Stepper";

describe("Stepper", () => {
  const steps: Steps[] = [
    { title: "Step 1", description: "This is step 1" },
    { title: "Step 2", description: "This is step 2" },
    { title: "Step 3", description: "This is step 3" },
    { title: "Step 4", description: "This is step 4" },
    { title: "Step 5", description: "This is step 5" },
  ];

  it("fully renders without exploding", () => {
    const { container } = render(<Stepper steps={steps} activeStep={1} />);

    const rootElement = container.querySelector(".neo-stepper");
    const stepElements = container.querySelectorAll(".neo-stepper__item");

    expect(rootElement).toBeInTheDocument();
    expect(stepElements).toHaveLength(steps.length);
  });

  it("appropriately assigns active state", async () => {
    const wrapper = render(<Stepper steps={steps} activeStep={1} />);

    const firstStep = (await screen.findByText(steps[0].title)).parentElement;
    const secondStep = (await screen.findByText(steps[1].title)).parentElement;

    expect(firstStep).toHaveClass("neo-stepper__item");
    expect(firstStep).not.toHaveClass("neo-stepper__item--active");
    expect(firstStep).toHaveClass("neo-stepper__item--complete");

    expect(secondStep).toHaveClass("neo-stepper__item");
    expect(secondStep).toHaveClass("neo-stepper__item--active");
    expect(secondStep).not.toHaveClass("neo-stepper__item--complete");
  });

  // describe("linear stepper functionality", () => {});
  // describe("editable stepper functionality", () => {});
});
