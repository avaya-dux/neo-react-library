import { Avatar } from "components/Avatar";

import { Tooltip } from ".";

import "./cypress-styles.css";

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

  describe("'auto' positions are shown appropriately", () => {
    const labelText = "cypress example label";
    const tooltipContainer = "div.neo-tooltip";
    const tooltipElement = "div.neo-tooltip div.neo-tooltip__content";
    const avatarElement = "figure.neo-avatar";

    it("should place the tooltip directly above the wrapped element if there is enough space", () => {
      cy.mount(
        <section className="heigh-ten-rem center-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should("have.class", "neo-tooltip--up");
    });

    it("should place the tooltip directly below the wrapped element if there is enough space below but not above", () => {
      cy.mount(
        <section className="center-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should("have.class", "neo-tooltip--down");
    });
  });
});
