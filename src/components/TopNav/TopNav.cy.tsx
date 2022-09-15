import { Image } from "components/Image";
import { TextInput } from "components/TextInput";

import fpo from "./logo-fpo.png";
import { SearchExample } from "./TopNav.stories";

const logo = <Image src={fpo} isDecorativeOrBranding />;

const search = (
  <TextInput
    clearable={true}
    disabled={false}
    placeholder="Search"
    startIcon="search"
    aria-label="search"
  />
);

describe("Skip Navigation component", () => {
  it("should be always present in DOM", () => {
    cy.mount(<SearchExample logo={logo} search={search} />);

    cy.get("a").contains("Skip").should("have.class", "neo-skipnav");
  });
});
