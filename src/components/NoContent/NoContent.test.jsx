import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { NoContent } from ".";

describe("NoContent", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(<NoContent text="test" />);

    const rootElement = getByTestId("NoContent-root");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<NoContent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has default text of 'No Content' if no params are passed", () => {
    const { findByText } = render(<NoContent />);
    const defaultText = "No Content";

    const hasDefaultText = findByText(defaultText);
    expect(hasDefaultText).toBeTruthy();
  });

  it("allows any text to be passed", () => {
    const passedText = "this is a buncha text";
    const { findByText } = render(<NoContent text={passedText} />);

    const hasPassedText = findByText(passedText);
    expect(hasPassedText).toBeTruthy();
  });

  it("allows NEO icons to be used", () => {
    const icon = "agents";
    const iconClassName = `neo-icon-${icon}`;
    const { getByTestId } = render(<NoContent icon={icon} />);

    const rootElement = getByTestId("NoContent-root");
    expect(rootElement.firstChild.classList.contains(iconClassName)).toBe(true);
  });
});
