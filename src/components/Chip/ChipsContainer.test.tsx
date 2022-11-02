import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Chip, ChipsContainer } from ".";

describe("ChipsContainer", () => {
  const allVariants = (
    <ChipsContainer>
      <Chip variant="default">Default</Chip>
      <Chip variant="alert">Alert</Chip>
      <Chip variant="info">Info</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
    </ChipsContainer>
  );

  it("fully renders without exploding", () => {
    render(allVariants);

    const element = screen.getByText("Default");
    expect(element).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(allVariants);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
