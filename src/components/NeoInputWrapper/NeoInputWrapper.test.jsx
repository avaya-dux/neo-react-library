import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import {
	NeoInputWrapper,
	getInputGroupProps,
	getNeoInputWrapperProps,
} from ".";

describe("NeoInputWrapper", () => {
	const datatestid = "NeoInputWrapper-root";
	const groupdatatestid = "NeoInputWrapper-group-root";

	it("fully renders without exploding", () => {
		const { getByTestId } = render(<NeoInputWrapper />);

		const rootElement = getByTestId(datatestid);
		const groupElement = getByTestId(groupdatatestid);
		expect(rootElement).toBeTruthy();
		expect(groupElement).toBeTruthy();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<NeoInputWrapper />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("has default 'control' and 'group' classes", () => {
		const { getByTestId } = render(<NeoInputWrapper />);
		const rootElement = getByTestId(datatestid);
		const groupElement = getByTestId(groupdatatestid);

		expect(rootElement.classList.length).toBe(1);
		expect(groupElement.classList.length).toBe(1);
	});

	it("adds all of the proper 'control' and 'group' classes when the appropriate props are set", () => {
		const { getByTestId } = render(
			<NeoInputWrapper
				error
				groupingClassName="example-class-name"
				inline
				required
				wrapperClassName="example-class-name"
			/>,
		);
		const rootElement = getByTestId(datatestid);
		const groupElement = getByTestId(groupdatatestid);

		expect(rootElement.classList.length).toBe(4);
		expect(groupElement.classList.length).toBe(3);
	});

	describe("getNeoInputWrapperProps", () => {
		it("returns expected props", () => {
			expect(getNeoInputWrapperProps()).toMatchInlineSnapshot(`
        {
          "className": "neo-form-control",
        }
      `);

			expect(
				getNeoInputWrapperProps({
					error: true,
					required: true,
					disabled: true,
				}),
			).toMatchInlineSnapshot(`
        {
          "className": "neo-form-control neo-form-control--disabled neo-form-control--error neo-form-control--required",
        }
      `);

			expect(
				getNeoInputWrapperProps({
					error: true,
					required: false,
					disabled: false,
				}),
			).toMatchInlineSnapshot(`
        {
          "className": "neo-form-control neo-form-control--error",
        }
      `);
		});

		it("allows extending of `className` via prop: `wrapperClassName`", () => {
			expect(
				getNeoInputWrapperProps({ wrapperClassName: "example-class-name" }),
			).toMatchInlineSnapshot(`
        {
          "className": "neo-form-control example-class-name",
        }
      `);
		});
	});

	describe("getInputGroupProps", () => {
		it("returns expected props", () => {
			expect(getInputGroupProps()).toMatchInlineSnapshot(`
        {
          "className": "neo-input-group",
        }
      `);

			expect(getInputGroupProps({ inline: true })).toMatchInlineSnapshot(`
        {
          "className": "neo-input-group neo-input-group--inline",
        }
      `);
		});

		it("allows extending of `className` via prop: `groupingClassName`", () => {
			expect(
				getInputGroupProps({ groupingClassName: "example-class-name" }),
			).toMatchInlineSnapshot(`
          {
            "className": "neo-input-group example-class-name",
          }
        `);
		});
	});
});
