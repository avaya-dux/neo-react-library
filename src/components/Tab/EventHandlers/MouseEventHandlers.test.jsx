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
  handleLeftCarouselMouseClickEvent,
  handleMouseClickEvent,
  handleRightCarouselMouseClickEvent,
} from "./MouseEventHandlers";

import {handleCloseElementMouseClickEvent} from "./MouseHelper"

vi.mock("./Helper");
vi.mock("./MouseHelper");

describe("Tab Mouse event handlers", () => {
  describe("handleMouseClickEvent", () => {
    let setActiveTabIndex;
    let setActivePanelIndex;
    let tabs;
    let tabIndex;
    let activeTabIndex;
    let onClose;
    beforeEach(() => {
      tabs = getTabProps();
      tabIndex=1;
      activeTabIndex=1;
      setActiveTabIndex = vi.fn();
      setActivePanelIndex = vi.fn();
      onClose = vi.fn();
    });
    it("should call setActiveTabIndex when tab is clicked.", () => {
      const currentTarget = { getAttribute: () => "tab1" };
      const target = { getAttribute: () => "tab1" };
      const e = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        target,
        currentTarget
      };

      handleMouseClickEvent(e, tabs, tabIndex, activeTabIndex, setActiveTabIndex, setActivePanelIndex, onClose);
      expect(e.stopPropagation).toBeCalled();
      expect(e.preventDefault).toBeCalled();
      expect(activateAnotherTabAndPanel).not.toBeCalled();
      expect(onClose).not.toBeCalled();
    });
    it("should do nothing when tab is disabled", () => {
      const currentTarget = { getAttribute: vi.fn().mockReturnValueOnce("tab1").mockReturnValueOnce("true") };
      const target = { getAttribute: () => "tab1" };
      const e = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        target,
        currentTarget
      };

      handleMouseClickEvent(e, tabs, tabIndex, activeTabIndex, setActiveTabIndex, setActivePanelIndex, onClose);
      expect(e.stopPropagation).toBeCalled();
      expect(e.preventDefault).toBeCalled();
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
      expect(activateAnotherTabAndPanel).not.toBeCalled();
      expect(onClose).not.toBeCalled();
    })
    it("should close tab when close icon is clicked", () => {
      const currentTarget = { getAttribute: () => "tab1" };
      const target = { getAttribute: () => "x" };
      const e = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        target,
        currentTarget,
      };
      handleMouseClickEvent(e, tabs, tabIndex, activeTabIndex, setActiveTabIndex, setActivePanelIndex, onClose);
      expect(e.stopPropagation).toBeCalled();
      expect(e.preventDefault).toBeCalled();
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
      expect(handleCloseElementMouseClickEvent).toBeCalled();
      expect(onClose).toBeCalled();
    });
  });


  describe("handleLeftCarouselMouseClickEvent", () => {
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

  describe("handleRightCarouselMouseClickEvent", () => {
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
