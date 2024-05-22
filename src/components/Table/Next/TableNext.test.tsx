import { render, screen } from "@testing-library/react";

import { TableNext } from "./";

describe("Table (Next)", () => {
  describe("base visual tests", () => {
    it("renders a basic example without exploding", () => {
      render(<TableNext />);

      expect(screen.getByRole("table")).toBeVisible();
    });
  });
});
