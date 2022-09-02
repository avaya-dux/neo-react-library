import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { UserEventKeys } from "utils";

import { internalTabLogger } from "./InternalTab";
import {
  ClosableTab,
  Tab,
  TabLink,
  TabList,
  TabPanel,
  TabPanels,
} from "./TabComponents";
import { Tabs } from "./Tabs";

vi.spyOn(console, "log").mockImplementation(() => null);

internalTabLogger.disableAll();

describe("Tabs", () => {
  const user = userEvent.setup();

  const tab1Title = "Tab 1";
  const tab2Title = "Tab 2";
  const tab3Title = "Tab 3";
  const tab1Content = "Tab 1 Content";
  const tab2Content = "Tab 2 Content";
  const tab3Content = "Tab 3 Content";

  describe("`TabLink` component tests", () => {
    const tabLinkTabExample = (
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab id="tab1">{tab1Title}</Tab>

          <TabLink href="https://kagi.com/faq">Kagi Search Engine</TabLink>

          <Tab id="tab3">{tab2Title}</Tab>
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
      user.click(link);

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

  describe("Closable Tab", () => {
    const closableTabSpy = vi.fn();

    beforeEach(() => {
      vi.resetAllMocks();
      render(
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab id="tab1">{tab1Title}</Tab>

            <ClosableTab id="tab2" onClose={closableTabSpy}>
              {tab2Title}
            </ClosableTab>

            <Tab id="tab3">{tab3Title}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>{tab1Content}</TabPanel>

            <TabPanel>{tab2Content}</TabPanel>

            <TabPanel>{tab3Content}</TabPanel>
          </TabPanels>
        </Tabs>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should call the `onClose` method when 'close' btn is focused and user hits 'space'", async () => {
      expect(closableTabSpy).not.toHaveBeenCalled();

      screen.getByRole("button").focus();
      await user.keyboard(UserEventKeys.SPACE);
      expect(closableTabSpy).toHaveBeenCalled();
    });

    it("should call the `onClose` method when 'close' btn is focused and user hits 'enter'", async () => {
      expect(closableTabSpy).not.toHaveBeenCalled();

      screen.getByRole("button").focus();
      await user.keyboard(UserEventKeys.ENTER);
      expect(closableTabSpy).toHaveBeenCalled();
    });

    it("should call the `onClose` method when 'close' btn is clicked via mouse", async () => {
      expect(closableTabSpy).not.toHaveBeenCalled();

      await user.click(screen.getByRole("button"));
      expect(closableTabSpy).toHaveBeenCalled();
    });

    it("should _not_ call the `onClose` method when 'close' btn is focused and user hits 'tab'", async () => {
      expect(closableTabSpy).not.toHaveBeenCalled();

      screen.getByRole("button").focus();
      await user.tab();
      expect(closableTabSpy).not.toHaveBeenCalled();
    });
  });
});
