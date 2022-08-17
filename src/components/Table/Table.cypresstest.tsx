import { mount } from "@cypress/react";

import { Table, TableProps } from ".";
import { FilledFields, IDataTableMockData } from "./helpers";

describe("Table component", () => {
  const headerCheckbox = "table thead th input[type='checkbox']";
  const headerCheckboxLabel = "table thead th label";
  const tableBodyCheckboxes = "table tbody td input[type='checkbox']";
  const tableBodyCheckboxLabels = "table tbody td label";
  const tableprops: TableProps<IDataTableMockData> = {
    ...FilledFields,
    caption: "",
    itemsPerPageOptions: [100],
    selectableRows: "multiple",
    summary: "",
  };

  it("if `selectableRows: 'multiple'`, always shows header checkbox, but only shows body checkboxes on hover or when checked", () => {
    mount(<Table {...tableprops} />);

    // visible th checkbox label
    cy.get(headerCheckboxLabel).should("be.visible");

    // NONE of the body checkboxes or their labels are visible
    cy.get(tableBodyCheckboxes).should("not.be.visible");
    cy.get(tableBodyCheckboxLabels).should("not.be.visible");

    // td label (checkbox) is visible on row hover
    cy.get("table tbody tr")
      .first()
      .realHover()
      .find("td label")
      .first()
      .should("be.visible");

    /**
     * need to "force" the click as our checkboxes are only visible on hover,
     * and that's a tricky to do with cypress, so just "force" it and it all
     * works happy honky-dory
     */
    cy.get(tableBodyCheckboxLabels).first().click({ force: true });

    // visible th checkbox label
    cy.get(headerCheckbox).should("have.class", "neo-check");
    cy.get(headerCheckboxLabel).should("be.visible");

    // visible td checkbox label
    cy.get("table tbody tr").first().should("be.visible");
  });
});
