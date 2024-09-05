import { composeStories } from "@storybook/testing-react";

import * as PaginationStories from "./Pagination.stories";
const { Basic } = composeStories(PaginationStories);

describe("Pagination component", () => {
	it("should update the page count based on how many items are shown per page", () => {
		cy.mount(<Basic />);

		// there should be 100 items in the list
		cy.get("input").should("have.value", "100");

		// show 5 items per page
		cy.get("select").select("5");

		// should have 7 pages
		cy.get("ul.neo-pagination__list").find("li").should("have.length", 7);

		// show 10 items per page
		cy.get("select").select("10");

		// should have 10 pages
		cy.get("ul.neo-pagination__list").find("li").should("have.length", 10);
	});

	it("should navigate between page via 'left'/'right' buttons", () => {
		cy.mount(<Basic />);

		const leftNavBtn = "button[aria-label='previous']";
		const rightNavBtn = "button[aria-label='next']";

		cy.get(leftNavBtn).should("be.disabled");
		cy.get(rightNavBtn).should("not.be.disabled");

		cy.get(rightNavBtn).click();

		cy.get(leftNavBtn).should("not.be.disabled");

		cy.get(leftNavBtn).click();

		cy.get(leftNavBtn).should("be.disabled");
	});

	it("should navigate between page via nav buttons", () => {
		cy.mount(<Basic />);

		const navItems = "ul.neo-pagination__list button";

		cy.get(navItems).last().click();

		cy.focused();

		cy.should("have.text", "20");

		cy.get(navItems);

		cy.first().click();

		cy.focused();

		cy.should("have.text", "1");
	});

	it("should navigate smoothly via tabbing", () => {
		cy.mount(<Basic />);

		cy.get("#templated-pagination");
		cy.click();
		cy.realPress("Tab"); // 1
		cy.realPress("Tab"); // 2
		cy.realPress("Tab"); // 3
		cy.realPress("Enter");
		cy.focused();
		cy.should("have.text", "3");

		cy.realPress(["Shift", "Tab"]); // 2
		cy.realPress(["Shift", "Tab"]); // 1
		cy.realPress("Enter");

		cy.focused();

		cy.should("have.text", "1");
	});
});
