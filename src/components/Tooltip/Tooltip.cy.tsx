import { Avatar } from "components/Avatar";

import { Tooltip, TooltipPosition } from ".";
import { translatePositionToCSSName } from "./helpers";

import "./cypress-styles.css";

describe("Tooltip component", () => {
  const labelText = "cypress example label";
  const tooltipContainer = "div.neo-tooltip";
  const tooltipElement = "div.neo-tooltip div.neo-tooltip__content";
  const avatarElement = "figure.neo-avatar";

  it("renders without exploding", () => {
    cy.mount(
      <Tooltip label={labelText}>
        <Avatar />
      </Tooltip>,
    );

    cy.get(tooltipContainer).should("contain.text", labelText);
    cy.get(tooltipElement).should("not.be.visible");
    cy.get(avatarElement).realHover();
    cy.get(tooltipElement).should("be.visible");
  });

  describe("'auto' positions are shown appropriately", () => {
    const tooltipPositionClass = (position: Omit<TooltipPosition, "auto">) =>
      `neo-tooltip--${translatePositionToCSSName(position)}`;

    // NOTE: the below are in orer of precedence, as defined by `helper.tsx/getIdealTooltipPosition`

    it("should assign the `top` position to a tooltip that has enough space above and to each side of itself", () => {
      cy.mount(
        <section className="heigh-ten-rem center-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>,
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("top"),
      );
    });

    it("should assign the `top-left` position to a tooltip that does not have enough space centered above itself, but does have enough space above and to it's left", () => {
      cy.mount(
        <section className="heigh-ten-rem center-right-align-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>,
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("top-left"),
      );
    });

    it("should assign the `top-right` position to a tooltip that does not have enough space centered above itself, nor to it's top-left, but does have enough space above to it's top-right", () => {
      cy.mount(
        <section className="heigh-ten-rem center-left-align-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>,
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("top-right"),
      );
    });

    it("should assign the `bottom` position to a tooltip that has enough space below and to each side but not above of itself", () => {
      cy.mount(
        <section className="center-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>,
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("bottom"),
      );
    });

    it("should assign the `bottom-left` position to a tooltip that does not have enough space centered below itself, but does have enough space below and to it's left", () => {
      cy.mount(
        <section className="heigh-ten-rem right-align-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>,
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("bottom-left"),
      );
    });

    it("should assign the `bottom-right` position to a tooltip that does not have enough space centered below itself, nor it's bottom-left, but does have enough space below and to it's bottom-right", () => {
      cy.mount(
        <section className="heigh-ten-rem left-align-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>,
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("bottom-right"),
      );
    });

    it("should assign the `left` position to a tooltip that does not have enough space above or below itself, but does have space to the left of itself", () => {
      cy.viewport(500, 70);
      cy.mount(
        <section className="right-align-element">
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>,
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("left"),
      );
    });

    it("should assign the `right` position to a tooltip that does not have enough space above, below, or left of itself, but does have space to the right of itself", () => {
      cy.viewport(500, 70);
      cy.mount(
        <section>
          <Tooltip label={labelText}>
            <Avatar />
          </Tooltip>
        </section>,
      );

      cy.get(tooltipElement).should("not.be.visible");
      cy.get(avatarElement).realHover();
      cy.get(tooltipElement).should("be.visible");
      cy.get(tooltipContainer).should(
        "have.class",
        tooltipPositionClass("right"),
      );
    });
  });
});
