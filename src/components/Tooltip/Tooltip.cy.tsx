import { Avatar } from "components/Avatar";

import { Tooltip } from ".";

describe("Tooltip component", () => {
  it("renders without exploding", () => {
    const labelText = "cypress example label";
    const tooltipContainer = "div.neo-tooltip";
    const tooltipElement = "div.neo-tooltip div.neo-tooltip__content";
    const avatarElement = "figure.neo-avatar";

    cy.mount(
      <Tooltip label={labelText}>
        <Avatar />
      </Tooltip>
    );

    cy.get(tooltipContainer).should("contain.text", labelText);
    cy.get(tooltipElement).should("not.be.visible");
    cy.get(avatarElement).realHover();
    cy.get(tooltipElement).should("be.visible");
  });
});
