import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { internalTabLogger } from "./InternalTab";
import { Tab, TabLink, TabList, TabPanel, TabPanels } from "./TabComponents";
import { Tabs } from "./Tabs";
import * as CarouselTabStories from "./Tabs.carousel.stories";
import * as IconTabStories from "./Tabs.icon.stories";
import * as ScrollableTabStories from "./Tabs.scrollable.stories";
import * as TabStories from "./Tabs.stories";

vi.spyOn(console, "log").mockImplementation(() => null);

internalTabLogger.disableAll();

const { ControlledActiveTabStory, UncontrolledActiveTabStory } =
  composeStories(TabStories);

const { IconTabs } = composeStories(IconTabStories);

const { ScrollableVerticalTabs } = composeStories(ScrollableTabStories);
const { ManyTabsCarousel, TwoTabsCarousel } =
  composeStories(CarouselTabStories);

describe("Tabs", () => {
  describe("`TabLink` component tests", () => {
    const tab1Content = "Tab 1 Content";
    const tab2Content = "Tab 2 Content";
    const tabLinkTabExample = (
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab id="tab1">Tab 1</Tab>

          <TabLink href="https://kagi.com/faq">Kagi Search Engine</TabLink>

          <Tab id="tab3">Tab 3</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{tab1Content}</TabPanel>

          <TabPanel>{tab2Content}</TabPanel>
        </TabPanels>
      </Tabs>
    );

    it("should render `TabLink` in the appropriate spot when in the middle", () => {
      const { container } = render(tabLinkTabExample);

      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(2);

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(1);

      const anchorTags = container.querySelectorAll("a");
      expect(anchorTags).toHaveLength(3);
      expect(anchorTags[0]).toHaveAttribute("role", "tab");
      expect(anchorTags[1]).toHaveAttribute("role", "link");
      expect(anchorTags[2]).toHaveAttribute("role", "tab");
    });

    it("should not change the selected tab when `TabLink` is clicked", () => {
      render(tabLinkTabExample);

      expect(screen.getAllByRole("tab")[0]).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getAllByRole("tab")[1]).toHaveAttribute(
        "aria-selected",
        "false"
      );

      const link = screen.getByRole("link");
      userEvent.click(link);

      expect(screen.getAllByRole("tab")[0]).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getAllByRole("tab")[1]).toHaveAttribute(
        "aria-selected",
        "false"
      );
    });
  });

  describe("Storybook tests", () => {
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

      it("click on tab3 should make tab3 active", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        expect(tabs.length).toBe(3);
        const tab3 = tabs[2];
        userEvent.click(tab3);
        expect(tab3).toHaveAttribute("tabindex", "0");
        expect(tab3).toHaveAttribute("aria-selected", "true");
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
      it("Close Tab2 using space should work", () => {
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
      it("Close Tab2 using enter should work", () => {
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
      it("Tab on Tab2 Close button should not close tab2", () => {
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
      it("Close Tab2 using mouse click should work", () => {
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
    describe(ManyTabsCarousel.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ManyTabsCarousel />);
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

      it("should render custom aria-labels", () => {
        const { getAllByRole } = renderResult;
        const buttons = getAllByRole("button");
        expect(buttons.length).toBe(2);
        expect(buttons[0]).toHaveAttribute("aria-label", "previous tab");
        expect(buttons[1]).toHaveAttribute("aria-label", "next tab");
      });
    });
  });
});
