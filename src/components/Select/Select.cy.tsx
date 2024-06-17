import {
	BasicSelects,
	CollapsedMultiSelect,
	Searchable,
} from "./Select.stories";

describe("Single Select Chevron tests", () => {
	it("Clicking on Chevron should make first menu item visible", () => {
		cy.mount(<BasicSelects />);

		cy.get("span button")
			.first()	// open the select
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

		cy.get("span button").first().click(); // open the select

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

describe("Multi Select Scrolling Tests", () => {
	it("Select apple, broccoli, pear, banana and the chip should show +2 on it", () => {
		cy.mount(<CollapsedMultiSelect />);

		// open the select
		cy.get("span button").first().click();
		// select option apple
		cy.get("[role='listbox']").first().contains("li", "Apple").first().click();
		// select option broccoli
		cy.get("[role='listbox']")
			.first()
			.contains("li", "Broccoli")
			.first()
			.click();
		// select option pear
		cy.get("[role='listbox']").first().contains("li", "Pear").first().click();
		// select option banana
		cy.get("[role='listbox']").first().contains("li", "Banana").first().click();
		// select chips and assert there are 3 chips
		cy.get(".neo-chip.neo-chip--default").should("have.length", 3);
		// select the collapsed chip
		const collapsedChip = cy.get(".neo-chip.neo-chip--default").contains("+2");
		// assert collapsedChip is visible
		collapsedChip.should("be.visible");
		// assert collapsedChip has aria-describedby attribute with non-empty value
		collapsedChip.should("have.attr", "aria-describedby").and("not.be.empty");
	});
});
