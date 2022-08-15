import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { RadioGroup } from ".";

import "@testing-library/jest-dom";

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

const DefaultRadioArray = [
  {
    label: "Radio 1",
    value: "Radio 1",
  },
  {
    label: "Radio 2",
    value: "Radio 2",
  },
  {
    label: "Radio 3",
    value: "Radio 3",
  },
  {
    label: "Radio 4",
    value: "Radio 4",
    disabled: true,
  },
  {
    label: "Radio 5",
    value: "Radio 5",
    disabled: true,
    tooltip: "Tooltip for Radio",
    position: "down",
  },
];

const DefaultProps = {
  radios: DefaultRadioArray,
  groupName: "Radio Group",
  checked: "Radio 1",
};

describe("RadioGroup", () => {
  let renderResult;

  beforeEach(() => {
    // ignore tooltip position warning
    jest.spyOn(console, "warn").mockImplementation(() => {});

    renderResult = render(<RadioGroup {...DefaultProps} />);
  });

  it("radio group renders ok", () => {
    const { getByTestId } = renderResult;
    const rootElement = getByTestId("RadioGroup-root");
    expect(rootElement).toBeTruthy();
  });

  it("radio renders ok", () => {
    const { getByTestId } = renderResult;
    const rootElement = getByTestId("Radio-root-Radio 1");
    expect(rootElement).toBeTruthy();
  });

  it("radio renders with correct class name", () => {
    const { getByTestId } = renderResult;
    const rootElement = getByTestId("Radio-root-Radio 1");
    expect(rootElement).toHaveAttribute("class", "neo-radio");
  });

  it("has a value that matches the label", () => {
    const { getByTestId } = renderResult;
    DefaultRadioArray.forEach((radioObject) => {
      const radio = getByTestId(`Radio-root-${radioObject.label}`);
      expect(radio).toHaveAttribute("value", radioObject.label);
    });
  });

  it("has an id that matches the label", () => {
    const { getByTestId } = renderResult;
    DefaultRadioArray.forEach((radioObject) => {
      const radio = getByTestId(`Radio-root-${radioObject.label}`);
      expect(radio).toHaveAttribute(
        "id",
        `radio-id-${DefaultProps.groupName}-${radioObject.label}`
      );
    });
  });

  it("has an id value that matches the for attribute on label", () => {
    const { getByTestId } = renderResult;
    DefaultRadioArray.forEach((radioObject) => {
      const radio = getByTestId(`Radio-root-${radioObject.label}`);
      const radioLabel = getByTestId(`Radio-label-root-${radioObject.label}`);
      expect(radio).toHaveAttribute(
        "id",
        `radio-id-${DefaultProps.groupName}-${radioObject.label}`
      );
      expect(radioLabel).toHaveAttribute(
        "for",
        `radio-id-${DefaultProps.groupName}-${radioObject.label}`
      );
    });
  });

  it("renders as disabled", () => {
    const { getByTestId } = renderResult;
    DefaultRadioArray.forEach((radio) => {
      if (radio.disabled) {
        const radioButton = getByTestId(`Radio-root-${radio.label}`);
        expect(radioButton).toHaveAttribute("disabled");
      } else {
        const radioButton = getByTestId(`Radio-root-${radio.label}`);
        expect(radioButton).not.toHaveAttribute("disabled");
      }
    });
  });

  it("renders with a Tooltip in the correct position", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    const { getByLabelText } = renderResult;
    DefaultRadioArray.forEach((radio) => {
      if (radio.tootip) {
        const radioTooltip = getByLabelText(radio.tooltip);
        expect(radioTooltip).toHaveAttribute(
          "class",
          `neo-tooltip--${radio.position}`
        );
      }
    });
  });

  it("passes basic axe compliance", async () => {
    await axeTest(renderResult);
  });
});
