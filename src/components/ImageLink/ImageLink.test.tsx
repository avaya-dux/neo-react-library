import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { ImageLink } from "./";

const logoImageSrc =
  "http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png";

describe("ImageLink", () => {
  it("renders without exploding", () => {
    render(
      <ImageLink src={logoImageSrc} href={logoImageSrc} alt="Avaya Logo" />
    );

    expect(screen.getByRole("img")).toBeDefined();
    expect(screen.getByRole("link")).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <ImageLink src={logoImageSrc} href={logoImageSrc} alt="Avaya Logo" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
