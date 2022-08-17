import { TwoMenus } from "./Menu.stories";

describe("Menu component", () => {
  const leftNavBtn = "Menu One";
  const rightNavBtn = "Menu Two";
  it("Only one menu is open when closeOnBlur is true", () => {
    cy.mount(
      <TwoMenus
        closeOnBlur={true}
        onLeftMenuClose={() => null}
        onRightMenuClose={() => null}
      />
    );
    twoGroups();
    cy.contains(leftNavBtn).click();
    numberOfMenus(1);
    leftMenuHasThreeMenuItems();

    cy.contains(rightNavBtn).click();
    numberOfMenus(1);
    rightMenuHasTwoMenuItems();
  });
  it("Two menu could be open when closeOnBlur is false", () => {
    cy.mount(
      <TwoMenus
        closeOnBlur={false}
        onLeftMenuClose={() => null}
        onRightMenuClose={() => null}
      />
    );
    twoGroups();

    cy.contains(leftNavBtn).click();

    numberOfMenus(1);
    leftMenuHasThreeMenuItems();

    cy.contains(rightNavBtn).click();

    numberOfMenus(2);
    leftMenuHasThreeMenuItems();
    rightMenuHasTwoMenuItems();
  });
});

function leftMenuHasThreeMenuItems() {
  cy.get(".neo-dropdown--right").within(() => {
    cy.get("[role='menuitem']").should("have.length", 3);
  });
}

function rightMenuHasTwoMenuItems() {
  cy.get(".neo-dropdown--left").within(() => {
    cy.get("[role='menuitem']").should("have.length", 2);
  });
}

function numberOfMenus(count: number) {
  cy.get("[role='menu']").should("have.length", count);
}

function twoGroups() {
  cy.get("[role='group']").should("have.length", 2);
}
