import { render } from "@testing-library/react";

import { Stepper } from "./Stepper";

describe("Stepper", () => {
  it("should render", () => {
    const steps = ["Step 1", "Step 2", "Step 3"];
    const activeStep = 1;
    const setActiveStep = jest.fn();
    const wrapper = render(
      <Stepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
