import { render, cleanup, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { composeStories } from "@storybook/testing-react";
import * as RadioGroupStories from "./RadioGroup.stories";

import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

const { RadioGroupExample, InlineRadioGroupExample } =
  composeStories(RadioGroupStories);

describe("RadioGroup", () => {
  beforeEach(() => {
    render(
      <RadioGroup groupName={"radioGroup"}>
        <Radio value="Radio 1">Radio 1</Radio>
      </RadioGroup>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("radio group renders ok", () => {
    const rootElement = screen.getByRole("radiogroup");
    expect(rootElement).toBeTruthy();
  });

  it("radio renders ok & with correct class name", () => {
    const radioElement = screen.getByLabelText("Radio 1");
    expect(radioElement).toBeTruthy().toHaveAttribute("class", "neo-radio");
  });

  it("has an id value that matches the 'for' attribute on label", () => {
    const radio = screen.getByLabelText(`Radio 1`);
    const radioId = radio.getAttribute("id");
    const radioLabel = screen.getByText("Radio 1");
    expect(radioLabel).toHaveAttribute("for", radioId);
  });

  it("passes basic axe compliance", async () => {
    const results = await axe(screen.getByTestId("RadioGroup-root"));
    expect(results).toHaveNoViolations();
  });
});

describe("Storybook tests", () => {
  const user = userEvent.setup();

  describe("RadioGroupExample", () => {
    beforeEach(() => {
      render(<RadioGroupExample />);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render ok", () => {
      expect(screen.container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const results = await axe(screen.getByTestId("RadioGroup-root"));
      expect(results).toHaveNoViolations();
    });

    it("renders as disabled", () => {
      const disabledRadioButton = screen.getByLabelText(`Radio 2`);
      expect(disabledRadioButton).toHaveAttribute("disabled");
    });

    it("renders with a Tooltip in the correct position", () => {
      const radioGroup = screen.getByRole("radiogroup");

      expect(radioGroup.lastChild).toHaveAttribute(
        "class",
        "neo-tooltip neo-tooltip--right neo-tooltip--onhover"
      );
    });

    it("passes and responds to onChange handler correctly", async () => {
      const selectedButtonPrompt = screen.getByText(
        "Selected button is Radio 1"
      );

      const unselectedRadio = screen.getByLabelText("Radio 3");

      await user.click(unselectedRadio);

      expect(selectedButtonPrompt).toHaveTextContent(
        "Selected button is Radio 3"
      );
    });
  });

  describe("InlineRadioGroupExample", () => {
    beforeEach(() => {
      render(<InlineRadioGroupExample />);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render ok", () => {
      expect(screen.container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const results = await axe(screen.getByTestId("RadioGroup-root"));
      expect(results).toHaveNoViolations();
    });

    it("renders with the correct class name for inline styles", () => {
      const radioGroup = screen.getByRole("radiogroup");

      expect(radioGroup).toHaveAttribute("class", "neo-input-group--inline");
    });
  });
});
