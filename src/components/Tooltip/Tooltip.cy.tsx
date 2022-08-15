import { Avatar } from "components/Avatar";

import { Tooltip } from ".";

describe("Tooltip component", () => {
  it("renders without exploding", () => {
    const datatestid = "Tooltip-root";
    const rootElement = `[data-testid='${datatestid}']`;
    const labelText = "cypress example label";

    cy.mount(
      <Tooltip label={labelText} data-testid={datatestid}>
        <Avatar />
      </Tooltip>
    );

    cy.get(rootElement).should("contain.text", labelText);
  });

  // TODO: add tests for the six possible positions
  it("test", () => {
    cy.mount(
      <Tooltip label="test" data-testid="test">
        <Avatar />
      </Tooltip>
    );

    cy.get("div.neo-tooltip__content").should("not.be.visible");
    cy.get("figure.neo-avatar").realHover();
    cy.get("div.neo-tooltip__content").should("be.visible");
  });
});
