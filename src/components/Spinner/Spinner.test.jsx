import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Spinner, getSizeClass } from "./Spinner";

describe("Spinner", () => {
  it("fully renders without exploding", () => {
    const datatestid = "Spinner-root";
    const { getByTestId } = render(<Spinner data-testid={datatestid} />);

    const rootElement = getByTestId(datatestid);
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("extends div appropriately", () => {
    it("takes normal <div> attributes, like `style`", () => {
      const datatestid = "Spinner-root";
      const { getByTestId } = render(
        <Spinner data-testid={datatestid} style={{ color: "black" }} />
      );
      const rootElement = getByTestId(datatestid);
      expect(rootElement.style.color).toBeTruthy();
    });

    it("does not allow `className` to be overwritten, but it can be extended", () => {
      const datatestid = "Spinner-root";
      const { getByTestId } = render(
        <Spinner data-testid={datatestid} className="fakeclassname" />
      );
      const rootElement = getByTestId(datatestid);
      expect(rootElement.classList.length).toBe(2);
    });
  });

  describe("getSizeClass", () => {
    it("appropriately returns a specificly neo class based on the selected size", () => {
      const largeClassName = getSizeClass("lg");
      expect(largeClassName.length).toBeTruthy();

      const xlargeClassName = getSizeClass("xl");
      expect(xlargeClassName.length).toBeTruthy();

      expect(largeClassName).not.toBe(xlargeClassName);
      expect(largeClassName.length).not.toBe(xlargeClassName.length);
    });

    it("retuns `undefined` if neo does not have a class for that specific size", () => {
      expect(getSizeClass("xs")).toBe(undefined);
      expect(getSizeClass("sm")).toBe(undefined);
      expect(getSizeClass("md")).toBe(undefined);
    });

    it("returns `undefined` and throws a warning if the passed size is not recognized", () => {
      const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
      expect(getSizeClass("aa")).toBe(undefined);
      expect(spy.mock.calls.length).toBe(1);
    });
  });
});
