import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { composeStories } from "@storybook/testing-react";
import * as RadioGroupStories from "./RadioGroup.stories";

import { RadioGroup, Radio } from ".";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

const { RadioGroupExample, InlineRadioGroupExample } =
  composeStories(RadioGroupStories);

describe("RadioGroup", () => {
  let renderResult;

  beforeEach(() => {
    renderResult = render(
      <RadioGroup groupName={"radioGroup"}>
        <Radio value="Radio 1">Radio 1</Radio>
      </RadioGroup>
    );
  });

  it("radio group renders ok", () => {
    const { getByRole } = renderResult;
    const rootElement = getByRole("radiogroup");
    expect(rootElement).toBeTruthy();
  });

  it("radio renders ok & with correct class name", () => {
    const { getByLabelText } = renderResult;
    const radioElement = getByLabelText("Radio 1");
    expect(radioElement).toBeTruthy().toHaveAttribute("class", "neo-radio");
  });

  it("has an id value that matches the 'for' attribute on label", () => {
    const { getByLabelText, getByText } = renderResult;

    const radio = getByLabelText(`Radio 1`);
    const radioId = radio.getAttribute("id");
    const radioLabel = getByText("Radio 1");
    expect(radioLabel).toHaveAttribute("for", radioId);
  });

  it("passes basic axe compliance", async () => {
    await axeTest(renderResult);
  });
});

describe("Storybook tests", () => {
  const user = userEvent.setup();

  describe("RadioGroupExample", () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(<RadioGroupExample />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("renders as disabled", () => {
      const { getByLabelText } = renderResult;

      const disabledRadioButton = getByLabelText(`Radio 2`);
      expect(disabledRadioButton).toHaveAttribute("disabled");
    });

    it("renders with a Tooltip in the correct position", () => {
      const { getByRole } = renderResult;

      const radioGroup = getByRole("radiogroup");

      expect(radioGroup.lastChild).toHaveAttribute(
        "class",
        "neo-tooltip neo-tooltip--right neo-tooltip--onhover"
      );
    });

    it("passes and responds to onChange handler correctly", async () => {
      const { getByText, getByLabelText } = renderResult;

      const selectedButtonPrompt = getByText("Selected button is Radio 1");

      const unselectedRadio = getByLabelText("Radio 3");

      await user.click(unselectedRadio);

      expect(selectedButtonPrompt).toHaveTextContent(
        "Selected button is Radio 3"
      );
    });
  });

  describe("InlineRadioGroupExample", () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(<InlineRadioGroupExample />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("renders with the correct class name for inline styles", () => {
      const { getByRole } = renderResult;

      const radioGroup = getByRole("radiogroup");

      expect(radioGroup).toHaveAttribute("class", "neo-input-group--inline");
    });
  });
});
