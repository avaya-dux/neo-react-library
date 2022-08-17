import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Badge } from ".";

describe("Badge", () => {
  const props = {
    data: "99",
    "aria-label": `Badge representing 99`,
  };
  it("renders correctly", () => {
    const { getByRole } = render(<Badge {...props} />);

    const rootElement = getByRole("status");

    expect(rootElement).toBeTruthy();
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(<Badge {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it("matches it's previous snapshot", () => {
    const { container } = render(<Badge {...props} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          aria-label="Badge representing 99"
          class="neo-badge"
          data-badge="99"
          role="status"
        />
      </div>
    `);
  });
  it("shows correct character when data prop is empty", () => {
    const emptyBadgeProps = {
      data: "",
      "aria-label": `Badge with no data`,
    };
    const { getByRole } = render(<Badge {...emptyBadgeProps} />);
    const rootElement = getByRole("status");
    expect(rootElement).toHaveAttribute("data-badge", "●");
  });
  it("cuts off 'badge' text at 12 characters", () => {
    const longBadgeProps = {
      data: "12345678901234567",
      "aria-label": `Badge with extra long data`,
    };
    const { getByRole } = render(<Badge {...longBadgeProps} />);
    const rootElement = getByRole("status");

    expect(longBadgeProps.data.length).toBe(17);
    expect(rootElement).toHaveAttribute(
      "data-badge",
      longBadgeProps.data.slice(0, 12)
    );
  });
});
