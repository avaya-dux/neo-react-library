import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { SelectContext } from "../utils/SelectContext";
import { OptionWithCheckbox } from "./OptionWithCheckbox";
import * as OptionStories from "./OptionWithCheckbox.stories";

const wrapper = ({ children }) => (
	<SelectContext.Provider
		value={{
			downshiftProps: { getItemProps: vi.fn() },
			optionProps: { selectedItemsValues: [] },
			selectProps: { filteredOptions: [] },
		}}
	>
		{children}
	</SelectContext.Provider>
);

const { Default, Templated } = composeStories(OptionStories);

describe(OptionWithCheckbox.name, () => {
	describe("stories", () => {
		describe(Default.name, () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<Default />, { wrapper });
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});
		describe(Templated.name, () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<Templated />, { wrapper });
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});
	});
});
