import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import "@testing-library/jest-dom/extend-expect";

expect.extend(toHaveNoViolations);
import { Icon } from ".";

describe("ExampleComponent", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(
      <Icon
        data-testid="neo-icon"
        icon="settings"
        aria-label="test"
        role="figure"
      />
    );

    const rootElement = getByTestId("neo-icon");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <Icon
        data-testid="neo-icon"
        icon="settings"
        aria-label="test"
        role="figure"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("test for className neo is in place", () => {
    const iconClassName = "neo-icon-save";
    const { getByTestId } = render(
      <Icon
        data-testid="neo-icon"
        icon="save"
        aria-label="test"
        role="figure"
      />
    );

    const rootElement = getByTestId("neo-icon");
    expect(rootElement).toBeTruthy();
    expect(rootElement).toHaveClass(iconClassName);
  });

  it("use a custom className ", () => {
    const customClassName = "ha-ha css-class-name-test";
    const { getByTestId } = render(
      <Icon
        data-testid="neo-icon"
        icon="save"
        aria-label="test"
        role="figure"
        className={customClassName}
      />
    );

    const rootElement = getByTestId("neo-icon");
    expect(rootElement).toBeTruthy();
    expect(rootElement).toHaveClass(customClassName);
  });
});
