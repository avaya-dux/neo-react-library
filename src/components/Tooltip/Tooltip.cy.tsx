import { Avatar } from "components/Avatar";

import { Tooltip, TooltipPosition } from ".";
import { translatePositionToCSSName } from "./helpers";

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
    const tooltipPositionClass = (position: Omit<TooltipPosition, "auto">) =>
      `neo-tooltip--${translatePositionToCSSName(position)}`;

    it("should assign the `top` position to a tooltip that has enough space above and to each side of itself", () => {
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
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("top")
      );
    });

    it("should assign the `bottom` position to a tooltip that has enough space below and to each side but not above of itself", () => {
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
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("bottom")
      );
    });
  });
});
