import { ExampleComponent } from ".";

describe("ExampleComponent component", () => {
  describe("a basic test suite", () => {
    it("renders without exploding", () => {
      const exampleText = "test";
      cy.mount(<ExampleComponent text={exampleText} />);
      cy.contains(exampleText);
    });
  });
});
