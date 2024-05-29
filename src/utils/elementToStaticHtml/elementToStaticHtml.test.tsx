import { Avatar, Button } from "components";

import { elementToStaticHtml } from ".";

describe("elementToStaticHtml", () => {
	it("displays static HTML for basic JSX inputs", () => {
		const element = <div>hello world</div>;

		expect(elementToStaticHtml(element)).toMatchInlineSnapshot(`
      "<div>
        hello world
      </div>"
    `);
	});

	it("displays static HTML for JSX inputs with props", () => {
		const element = <div className="foo">hello world</div>;

		expect(elementToStaticHtml(element)).toMatchInlineSnapshot(`
      "<div class="foo">
        hello world
      </div>"
    `);
	});

	it("displays static HTML for our Avatar component", () => {
		const element = <Avatar size="md" label="Joey Joe Joe Jr." />;

		expect(elementToStaticHtml(element)).toMatchInlineSnapshot(`
      "<figure
        class="neo-avatar neo-avatar--generic"
        aria-label="Joey Joe Joe Jr."
      >
      </figure>"
    `);
	});

	it("displays static HTML for our Button component with a status", () => {
		const element = <Button status="success">Hello world</Button>;

		expect(elementToStaticHtml(element)).toMatchInlineSnapshot(`
      "<button
        class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--success"
        data-badge
      >
        Hello world
      </button>"
    `);
	});
});
