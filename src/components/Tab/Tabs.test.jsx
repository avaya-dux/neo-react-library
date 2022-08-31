import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { internalTabLogger } from "./InternalTab";
import { Tab, TabLink, TabList, TabPanel, TabPanels } from "./TabComponents";
import { Tabs } from "./Tabs";

vi.spyOn(console, "log").mockImplementation(() => null);

internalTabLogger.disableAll();

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
});
