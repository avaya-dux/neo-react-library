import { BasicSelects, Searchable } from "./Select.stories";

describe("Single Select Chevron tests", () => {
  it("Clicking on Chevron should make first menu item visible", () => {
    cy.mount(<BasicSelects />);

    cy.get("span button")
      .first()
      .then(($element) => {
        const width = $element.width();
        const height = $element.height();
        const chevronWidth = 14;
        if (width && height) {
          // click on chevron
          cy.get("span button")
            .first()
            .click(width + chevronWidth / 2, height / 2);
          cy.get("[role='listbox']")
            .first()
            .within(() => {
              cy.get("ul li").first().should("be.visible");
            });
        }
      });
  });
});

describe("Single Select Scrolling Tests", () => {
  it("Last fruit in the list becomes visible with arrow downs", () => {
    cy.mount(<BasicSelects />);

    cy.get("span button").first().click(); // click the first select one

    cy.get("[role='listbox']")
      .first()
      .within(() => {
        cy.get("ul li").last().should("not.be.visible");
      });

    cy.get("span button")
      .first()
      .type(
        "{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}",
      );
    cy.get("[role='listbox']")
      .first()
      .within(() => {
        cy.get("ul li").last().should("be.visible");
      });
  });
});

describe("Single Select Searchable Scrolling Tests", () => {
  it("Last fruit in the list becomes visible with arrow ups", () => {
    cy.mount(<Searchable />);

    cy.get("span").first().click();

    cy.get("[role='listbox']")
      .first()
      .within(() => {
        cy.get("ul li").last().should("not.be.visible");
      });

    cy.get("span")
      .first()
      .type(
        "{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}",
      );
    cy.get("[role='listbox']")
      .first()
      .within(() => {
        cy.get("ul li").last().should("be.visible");
      });
  });
});
