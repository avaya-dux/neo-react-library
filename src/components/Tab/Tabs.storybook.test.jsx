import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import {
  handleLeftCarouselMouseClickEvent,
  handleRightCarouselMouseClickEvent,
} from "./EventHandlers";
import { enableLeftButton, enableRightButton } from "./EventHandlers/Helper";
import * as CarouselTabStories from "./Tabs.carousel.stories";
import * as IconTabStories from "./Tabs.icon.stories";
import * as ScrollableTabStories from "./Tabs.scrollable.stories";
import * as TabStories from "./Tabs.stories";

const { ManyTabsCarousel, TwoTabsCarousel } =
  composeStories(CarouselTabStories);

const { ControlledActiveTabStory, UncontrolledActiveTabStory } =
  composeStories(TabStories);

const { IconTabs } = composeStories(IconTabStories);

const { ScrollableVerticalTabs } = composeStories(ScrollableTabStories);

vi.mock("./EventHandlers");
vi.mock("./EventHandlers/Helper");

describe("Tabs", () => {
  describe("Storybook tests", () => {
    describe(ManyTabsCarousel.storyName, () => {
      let renderResult;
      beforeEach(() => {
        enableLeftButton.mockReturnValue(true);
        enableRightButton.mockReturnValue(true);
        renderResult = render(<ManyTabsCarousel />);
        vi.resetAllMocks();
      });

      it("When left carousel button is clicked, left button event handler is called", async () => {
        const buttons = screen.getAllByRole("button");
        // carousel left, right, menu button
        expect(buttons.length).toBe(3);

        const leftButton = buttons[0];
        await userEvent.click(leftButton);
        expect(handleLeftCarouselMouseClickEvent).toBeCalled();
      });

      it("When right carousel button is clicked, right button event handler is called", async () => {
        const buttons = screen.getAllByRole("button");
        // carousel left, right, menu button
        expect(buttons.length).toBe(3);

        const rightButton = buttons[1];
        await userEvent.click(rightButton);
        expect(handleRightCarouselMouseClickEvent).toBeCalled();
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

    describe(TwoTabsCarousel.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<TwoTabsCarousel />);
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

    describe(ControlledActiveTabStory.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ControlledActiveTabStory />);
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

      it.skip("click on tab3 should make tab3 active", async () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        expect(tabs.length).toBe(3);
        const tab3 = tabs[2];
        await userEvent.click(tab3);
        const newTab3 = getAllByRole("tab")[2];
        expect(newTab3).toHaveAttribute("tabindex", "0");
        expect(newTab3).toHaveAttribute("aria-selected", "true");
      });
    });

    describe(UncontrolledActiveTabStory.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<UncontrolledActiveTabStory />);
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

      it.skip("Close Tab2 using space should work", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        const originalTabLength = tabs.length;
        expect(tabs.length).toBe(originalTabLength);
        userEvent.tab();
        const closeButton = getAllByRole("button")[0];
        expect(closeButton).toHaveFocus();
        userEvent.keyboard("{space}");
        expect(getAllByRole("tab").length).toBe(originalTabLength - 1);
      });

      it.skip("Close Tab2 using enter should work", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        const originalTabLength = tabs.length;
        expect(tabs.length).toBe(originalTabLength);
        userEvent.tab();
        const closeButton = getAllByRole("button")[0];
        expect(closeButton).toHaveFocus();
        userEvent.keyboard("{enter}");
        expect(getAllByRole("tab").length).toBe(originalTabLength - 1);
      });

      it.skip("Tab on Tab2 Close button should not close tab2", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        const originalTabLength = tabs.length;
        expect(tabs.length).toBe(originalTabLength);
        userEvent.tab();
        const closeButton = getAllByRole("button")[0];
        expect(closeButton).toHaveFocus();
        userEvent.tab();
        expect(getAllByRole("tab").length).toBe(originalTabLength);
      });

      it.skip("Close Tab2 using mouse click should work", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        const originalTabLength = tabs.length;
        expect(tabs.length).toBe(originalTabLength);
        userEvent.tab();
        const closeButton = getAllByRole("button")[0];
        expect(closeButton).toHaveFocus();
        userEvent.click(closeButton);
        expect(getAllByRole("tab").length).toBe(originalTabLength - 1);
      });
    });

    describe(IconTabs.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<IconTabs />);
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

    describe(ScrollableVerticalTabs.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ScrollableVerticalTabs />);
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
