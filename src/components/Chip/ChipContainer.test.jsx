import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { createChip } from "./ChipContainer";
import * as ChipContainerStories from "./ChipContainer.stories";

jest.spyOn(console, "warn").mockImplementation(() => {});

const { BasicChips, IconChips, ClosableChips, MixedChips } =
  composeStories(ChipContainerStories);

describe("Container", () => {
  describe("of BasicChips:", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<BasicChips />);
    });
    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    it("tooltip is rendered", async () => {
      const { getByRole } = renderResult;
      const tooltip = await getByRole("tooltip");
      expect(tooltip).toHaveTextContent(/basic/i);
    });
  });
  describe("of IconChips:", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<IconChips />);
    });
    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe("of ClosableChips:", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ClosableChips />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("should render two buttons", () => {
      const { getAllByRole } = renderResult;
      const buttons = getAllByRole("button");
      expect(buttons.length).toBe(2);
    });

    it("click on disabled button should not remove it", async () => {
      const chipOne = screen.getByText(/.*one/i);
      userEvent.click(chipOne);
      const buttons = await screen.findAllByRole("button");
      expect(buttons.length).toBe(2);
    });

    it("click on enabled button should remove it", async () => {
      const chipTwo = screen.getByText(/.*two/i);
      userEvent.click(chipTwo);
      const buttons = await screen.findAllByRole("button");
      expect(buttons.length).toBe(1);
      // Two is gone. One is left.
      expect(buttons[0]).toHaveTextContent("One");
    });

    it("press Delete on disabled button should not remove it", async () => {
      const buttonsBeforeDeletion = await screen.findAllByRole("button");
      expect(buttonsBeforeDeletion.length).toBe(2);
      expect(document.body).toHaveFocus();
      userEvent.tab();
      const chipOne = screen.getByText(/.*one/i);
      expect(chipOne).toHaveFocus();
      userEvent.keyboard("{del}");
      const buttons = await screen.findAllByRole("button");
      expect(buttons.length).toBe(2);
    });

    it("press Delete on enabled button should remove it", async () => {
      const buttonsBeforeDeletion = await screen.findAllByRole("button");
      expect(buttonsBeforeDeletion.length).toBe(2);
      expect(document.body).toHaveFocus();
      userEvent.tab();
      const chipOne = screen.getByText(/.*one/i);
      expect(chipOne).toHaveFocus();
      userEvent.tab();
      const chipTwo = screen.getByText(/.*two/i);
      expect(chipTwo).toHaveFocus();
      userEvent.keyboard("{del}");
      const buttons = await screen.findAllByRole("button");
      expect(buttons.length).toBe(1);
    });

    it("press Space on enabled button should not remove it", async () => {
      const buttonsBeforeDeletion = await screen.findAllByRole("button");
      expect(buttonsBeforeDeletion.length).toBe(2);
      expect(document.body).toHaveFocus();
      userEvent.tab();
      const chipOne = screen.getByText(/.*one/i);
      expect(chipOne).toHaveFocus();
      userEvent.tab();
      const chipTwo = screen.getByText(/.*two/i);
      expect(chipTwo).toHaveFocus();
      userEvent.keyboard("{space}");
      const buttons = await screen.findAllByRole("button");
      expect(buttons.length).toBe(2);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    it("should render tooltip", async () => {
      const { getByRole } = renderResult;
      const tooltip = await getByRole("tooltip");
      expect(tooltip).toHaveTextContent(/tooltip/i);
    });
  });
  describe("of Mixed Chips:", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<MixedChips />);
    });
    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    it("two tooltips are rendered", async () => {
      const { getAllByRole } = renderResult;
      const tooltips = await getAllByRole("tooltip");
      expect(tooltips).toHaveLength(3);
    });
  });
  describe("createChip: ", () => {
    it("bad chiptype should fail", () => {
      const chipProps = { chiptype: "bad" };
      expect(() => {
        createChip(chipProps);
      }).toThrow(/bad/i);
    });
  });
});
