import { BasicSelects, Searchable } from "./Select.stories";

describe("Single Select Scrolling Tests", () => {
  it("Last fruit in the list becomes visible with arow downs", () => {
    cy.mount(<BasicSelects />);

    cy.get("span button").first().click(); // click the first select one

    cy.get("[role='listbox']")
      .first()
      .within(() => {
        cy.get("ul li").last().should("not.be.visible");
        cy.get("ul li")
          .first()
          .type(
            "{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}"
          );
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
        cy.get("ul li").first().type("{upArrow}{upArrow}");
        cy.get("ul li").last().should("be.visible");
      });
  });
});
