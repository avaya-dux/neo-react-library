import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Form } from ".";

describe("Form", () => {
  const datatestid = "Form-root";

  it("fully renders without exploding", () => {
    const { getByTestId } = render(<Form data-testid={datatestid} />);

    const rootElement = getByTestId(datatestid);
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Form data-testid={datatestid} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("adds a class if `inline` is set to `true`", () => {
    const { getByTestId } = render(<Form data-testid={datatestid} inline />);
    const rootElement = getByTestId(datatestid);
    expect(rootElement.classList.length).toBe(2);
  });

  describe("extends <form> appropriately", () => {
    it("takes normal <form> attributes, like `style`", () => {
      const { getByTestId } = render(
        <Form data-testid={datatestid} style={{ color: "black" }} />
      );
      const rootElement = getByTestId(datatestid);
      expect(rootElement.style.color).toBeTruthy();
    });

    it("does not allow `className` to be overwritten, but it can be extended", () => {
      const { getByTestId } = render(
        <Form data-testid={datatestid} className="fakeclassname" />
      );
      const rootElement = getByTestId(datatestid);
      expect(rootElement.classList.length).toBe(2);
    });
  });
});
