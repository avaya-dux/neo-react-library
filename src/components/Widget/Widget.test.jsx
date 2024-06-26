import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Action } from "./Action";
import { Content } from "./Content";
import { Header } from "./Header";
import { normalize } from "./Widget";
import * as WidgetStories from "./Widget.stories";

const {
	BasicWidget,
	UsageExample,
	EmptyWidget,
	DisabledWidget,
	InteractiveWidget,
	LoadingEmptyWidget,
	ScrollableWidget,
} = composeStories(WidgetStories);

describe("Widget", () => {
	// TODO: add tests back in when I can figure out why they're blowing up the build
	describe("normalize", () => {
		it("Should do nothing with all required children", () => {
			const children = [
				<Header key="header" />,
				<Action key="action" />,
				<Content key="content" />,
			];
			const result = normalize(children);
			expect(result).toStrictEqual(children);
		});

		it("should append Content when only Header and Action are passed in", () => {
			const children = [<Header key="header" />, <Action key="action" />];
			const result = normalize(children);
			expect(result[2].type).toStrictEqual(Content);
		});

		it("should insert Action when only Header and Content are passed in", () => {
			const children = [<Header key="header" />, <Content key="content" />];
			const result = normalize(children);
			expect(result[1].type).toStrictEqual(Action);
			expect(result[2].type).toStrictEqual(Content);
		});

		it("should append Action and contetn when only Header is passed in", () => {
			const children = [<Header key="header" />];
			const result = normalize(children);
			expect(result[1].type).toStrictEqual(Action);
			expect(result[2].type).toStrictEqual(Content);
		});
	});

	describe("Storybook", () => {
		describe("BasicWidget", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<BasicWidget />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("UsageExample", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<UsageExample />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("EmptyWidget", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<EmptyWidget />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("DisabledWidget", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<DisabledWidget />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("InteractiveWidget", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<InteractiveWidget />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("LoadingEmptyWidget", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<LoadingEmptyWidget />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("ScrollableWidget", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<ScrollableWidget />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});
	});
});
