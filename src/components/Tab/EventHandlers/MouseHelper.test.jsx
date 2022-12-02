import { vi } from "vitest";

import { activateAnotherTabAndPanel } from "./Helper";
import { handleCloseElementMouseClickEvent } from "./MouseHelper";

vi.mock("./Helper");

describe("handleCloseElementMouseClickEvent", () => {
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
