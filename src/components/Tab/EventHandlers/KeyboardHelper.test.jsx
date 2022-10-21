import { vi } from "vitest";

import {
  activatePreviousTab,
  getNextTabIndex,
  getPreviousTabIndex,
  isTabLink
} from "./KeyboardHelper";

describe("Tab -> EventHandlers -> Helper", () => {
  describe("activatePreviousTab", () => {
    it("when no previous tab found, return false", () => {
      const tabs = [{}];
      const activeTabIndex = 0;
      const setActiveTabIndex = vi.fn();
      const setActivePanelIndex = vi.fn();
      expect(
        activatePreviousTab(
          tabs,
          activeTabIndex,
          setActiveTabIndex,
          setActivePanelIndex
        )
      ).toBeFalsy();
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
    });
    it("when previous tab found, return true", () => {
      const tabs = [{}, {}];
      const activeTabIndex = 1;
      const setActiveTabIndex = vi.fn();
      const setActivePanelIndex = vi.fn();
      expect(
        activatePreviousTab(
          tabs,
          activeTabIndex,
          setActiveTabIndex,
          setActivePanelIndex
        )
      ).toBeTruthy();
      expect(setActiveTabIndex).toHaveBeenCalledWith(0);
      expect(setActivePanelIndex).toHaveBeenCalledWith(0);
    });
    it("when previous tab found and setActivePanelIndex is undefined, should return true and call setActiveTabIndex", () => {
      const tabs = [{}, {}];
      const activeTabIndex = 1;
      const setActiveTabIndex = vi.fn();
      const setActivePanelIndex = undefined;
      expect(
        activatePreviousTab(
          tabs,
          activeTabIndex,
          setActiveTabIndex,
          setActivePanelIndex
        )
      ).toBeTruthy();
      expect(setActiveTabIndex).toHaveBeenCalledWith(0);
    });
  });

  describe("getNextTabIndex", () => {
    it("when activeTabIndex === 0, tab at index 1 is disabled, should return 2", () => {
      const tabs = [{}, { disabled: true }, {}];
      const activeTabIndex = 0;
      expect(getNextTabIndex(tabs, activeTabIndex)).toBe(2);
    });
    it("when activeTabIndex is the last index, should return this same index", () => {
      const tabs = [{}, { disabled: true }, {}];
      const activeTabIndex = tabs.length - 1;
      expect(getNextTabIndex(tabs, activeTabIndex)).toBe(activeTabIndex);
    });
  });

  describe("getPreviousTabIndex", () => {
    it("when activeTabIndex === 2, tab at index 1 is disabled, should return 0", () => {
      const tabs = [{}, { disabled: true }, {}];
      const activeTabIndex = 2;
      expect(getPreviousTabIndex(tabs, activeTabIndex)).toBe(0);
    });
    it("when activeTabIndex is 0, should return 0", () => {
      const tabs = [{}, { disabled: true }, {}];
      const activeTabIndex = 0;
      expect(getPreviousTabIndex(tabs, activeTabIndex)).toBe(activeTabIndex);
    });
  });

  describe("isTabLink", () => {
    it("when href is defined, return true", () => {
      const tabs = [{}, { href: "http://faq.com" }, {}];
      const activeTabIndex = 1;
      expect(isTabLink(tabs, activeTabIndex)).toBe(true);
    });
    it("when href is not defined, return false", () => {
      const tabs = [{}, {}, {}];
      const activeTabIndex = 1;
      expect(isTabLink(tabs, activeTabIndex)).toBe(false);
    });
  });
});
