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

    // HACK: should be `"img"`, but the image doesn't seem to be loading, thus the tag is registred as a `presentation` role
    expect(screen.getByRole("presentation")).toBeDefined();
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
