import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { LinkLogo, Logo } from "./Logo";

const logoImageSrc =
  "http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png";

describe("Logo", () => {
  it("renders without exploding", () => {
    const { container } = render(<Logo src={logoImageSrc} />);
    expect(container).not.toBe(null);
  });

  it("does not render anchor element when link prop not passed", () => {
    const { getByRole } = render(<Logo src={logoImageSrc} />);
    expect(() => getByRole("link")).toThrow();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Logo src={logoImageSrc} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("Behaviour when acting as link", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(
        <LinkLogo src={logoImageSrc} link="#" alt="Avaya link" />
      );
    });

    it("does render anchor element when link prop passed", () => {
      const { getByRole } = renderResult;
      const linkElement = getByRole("link");
      expect(linkElement).toBeTruthy();
    });
  });
});
