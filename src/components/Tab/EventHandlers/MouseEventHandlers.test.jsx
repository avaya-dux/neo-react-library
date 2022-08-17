import { vi } from "vitest";

import {
  activateAnotherTabAndPanel,
  enableLeftButton,
  enableRightButton,
  extractProperties,
  moveNextTabToLeftAmount,
  movePreviousTabToRightAmount,
} from "./Helper";
import {
  handleCloseElementMouseClickEvent,
  handleLeftCarouselMouseClickEvent,
  handleMouseClickEvent,
  handleRightCarouselMouseClickEvent,
} from "./MouseEventHandlers";

vi.mock("./Helper");
describe("Tab Mouse event handlers", () => {
  describe(handleMouseClickEvent, () => {
    let setActiveTabIndex;
    let setActivePanelIndex;
    let tabs;
    beforeEach(() => {
      tabs = getTabProps();
      setActiveTabIndex = vi.fn();
      setActivePanelIndex = vi.fn();
    });
    it("should call setActiveTabIndex when tab is clicked.", () => {
      const target = { getAttribute: () => "tab1" };
      const e = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        target,
      };

      handleMouseClickEvent(e, tabs, setActiveTabIndex, setActivePanelIndex);
      expect(e.stopPropagation).toBeCalled();
      expect(e.preventDefault).toBeCalled();
      expect(activateAnotherTabAndPanel).not.toBeCalled();
    });
    it("should not call setActiveTabIndex if id is null", () => {
      const target = { getAttribute: () => null };
      const e = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        target,
      };
      handleMouseClickEvent(e, tabs, setActiveTabIndex, setActivePanelIndex);
      expect(e.stopPropagation).toBeCalled();
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
      expect(e.preventDefault).toBeCalled();
      expect(activateAnotherTabAndPanel).not.toBeCalled();
    });
  });
  describe(handleCloseElementMouseClickEvent, () => {
    let setActiveTabIndex;
    let setActivePanelIndex;
    let tabs;
    beforeEach(() => {
      tabs = getTabProps();
      setActiveTabIndex = vi.fn();
      setActivePanelIndex = vi.fn();
    });
    it("do nothing when tabIndex > activeTabIndex", () => {
      const target = { getAttribute: () => "tab1" };
      const e = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        target,
      };
      const activeTabIndex = 1;
      const tabIndex = activeTabIndex + 1;
      handleCloseElementMouseClickEvent(
        e,
        tabs,
        tabIndex,
        activeTabIndex,
        setActiveTabIndex,
        setActivePanelIndex
      );
      expect(e.stopPropagation).toBeCalled();
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
      expect(e.preventDefault).toBeCalled();
      expect(activateAnotherTabAndPanel).not.toBeCalled();
    });
    it("should set activeTabIndex to activeTabIndex -1 when tabIndex < activeTabIndex", () => {
      const target = { getAttribute: () => null };
      const e = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        target,
      };
      const tabIndex = 0;
      const activeTabIndex = 1;

      handleCloseElementMouseClickEvent(
        e,
        tabs,
        tabIndex,
        activeTabIndex,
        setActiveTabIndex,
        setActivePanelIndex
      );
      expect(e.stopPropagation).toBeCalled();
      expect(setActiveTabIndex).toBeCalledWith(0);
      expect(setActivePanelIndex).toBeCalledWith(0);
      expect(e.preventDefault).toBeCalled();
      expect(activateAnotherTabAndPanel).not.toBeCalled();
    });
    it("should call activateAnotherTabAndPanel when tabIndex === activeTabIndex", () => {
      const target = { getAttribute: () => "tab1" };
      const e = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        target,
      };
      const activeTabIndex = 1;
      const tabIndex = activeTabIndex;
      handleCloseElementMouseClickEvent(
        e,
        tabs,
        tabIndex,
        activeTabIndex,
        setActiveTabIndex,
        setActivePanelIndex
      );
      expect(e.stopPropagation).toBeCalled();
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
      expect(e.preventDefault).toBeCalled();
      expect(activateAnotherTabAndPanel).toBeCalled();
    });
  });
  describe(handleLeftCarouselMouseClickEvent, () => {
    let setLeftCarouselButtonEnabled;
    let setRightCarouselButtonEnabled;
    let scrollRef;
    let tabRefs;
    let e;
    beforeEach(() => {
      extractProperties.mockReturnValue([1, 2, 3, []]);
      setLeftCarouselButtonEnabled = vi.fn();
      setRightCarouselButtonEnabled = vi.fn();
      scrollRef = { current: { scrollBy: vi.fn() } };
      tabRefs = [];
      e = {
        stopPropagation: vi.fn(),
      };
    });
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("do nothing when tabs can not be scrolled", () => {
      movePreviousTabToRightAmount.mockReturnValue(0);
      handleLeftCarouselMouseClickEvent(
        e,
        scrollRef,
        tabRefs,
        setLeftCarouselButtonEnabled,
        setRightCarouselButtonEnabled
      );
      expect(scrollRef.current.scrollBy).not.toBeCalled();
      expect(e.stopPropagation).toBeCalled();
      expect(extractProperties).toBeCalled();
    });
    it("scroll tabs to right when tabs can be scrolled right", () => {
      const moveAmount = 100;
      movePreviousTabToRightAmount.mockReturnValue(moveAmount);
      handleLeftCarouselMouseClickEvent(
        e,
        scrollRef,
        tabRefs,
        setLeftCarouselButtonEnabled,
        setRightCarouselButtonEnabled
      );
      expect(scrollRef.current.scrollBy).toBeCalledWith({ left: -moveAmount });
      expect(e.stopPropagation).toBeCalled();
      expect(setLeftCarouselButtonEnabled).toBeCalled();
      expect(setRightCarouselButtonEnabled).toBeCalled();
      expect(movePreviousTabToRightAmount).toBeCalled();
      expect(enableLeftButton).toBeCalled();
      expect(enableRightButton).toBeCalled();
    });
  });
  describe(handleRightCarouselMouseClickEvent, () => {
    let setLeftCarouselButtonEnabled;
    let setRightCarouselButtonEnabled;
    let scrollRef;
    let tabRefs;
    let e;
    beforeEach(() => {
      extractProperties.mockReturnValue([1, 2, 3, []]);
      setLeftCarouselButtonEnabled = vi.fn();
      setRightCarouselButtonEnabled = vi.fn();
      scrollRef = { current: { scrollBy: vi.fn() } };
      tabRefs = [];
      e = {
        stopPropagation: vi.fn(),
      };
    });
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("do nothing when tabs can be scrolled left", () => {
      moveNextTabToLeftAmount.mockReturnValue(0);
      handleRightCarouselMouseClickEvent(
        e,
        scrollRef,
        tabRefs,
        setLeftCarouselButtonEnabled,
        setRightCarouselButtonEnabled
      );
      expect(scrollRef.current.scrollBy).not.toBeCalled();
      expect(e.stopPropagation).toBeCalled();
      expect(extractProperties).toBeCalled();
      expect(moveNextTabToLeftAmount).toBeCalled();
    });
    it("scroll tabs left when tabs can be scrolled left", () => {
      const moveAmount = 100;
      moveNextTabToLeftAmount.mockReturnValue(moveAmount);
      handleRightCarouselMouseClickEvent(
        e,
        scrollRef,
        tabRefs,
        setLeftCarouselButtonEnabled,
        setRightCarouselButtonEnabled
      );
      expect(scrollRef.current.scrollBy).toBeCalledWith({ left: moveAmount });
      expect(e.stopPropagation).toBeCalled();
      expect(setLeftCarouselButtonEnabled).toBeCalled();
      expect(setRightCarouselButtonEnabled).toBeCalled();
      expect(extractProperties).toBeCalled();
      expect(moveNextTabToLeftAmount).toBeCalled();
      expect(enableLeftButton).toBeCalled();
      expect(enableRightButton).toBeCalled();
    });
  });
});

function getTabProps() {
  return [
    {
      content: <h2>content1</h2>,
      disabled: false,
      id: "tab1",
      name: "tab1",
    },
    {
      content: "content 2",
      disabled: false,
      id: "tab2",
      name: "tab2",
    },
    {
      content: "content 3",
      disabled: false,
      id: "tab3",
      name: "tab3",
    },
  ];
}
