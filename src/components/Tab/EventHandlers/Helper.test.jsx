import { vi } from "vitest";

import {
  activateAnotherTabAndPanel,
  moveNextTabToLeftAmount,
  movePreviousTabToRightAmount,
  noop,
} from "./Helper";
import { activatePreviousTab, getNextTabIndex } from "./KeyboardHelper";
import {
  calculateLeftMoveAmount,
  calculateRightMoveAmount,
  canMoveNextTabToLeft,
  canMovePreviousTabToRight,
  getNextTabToMoveLeft,
  getPreviousTabToMoveRight,
} from "./ScrollHelper";

vi.mock("./ScrollHelper");

vi.mock("./KeyboardHelper");

describe("Tab -> EventHandlers -> Helper", () => {
  describe("activateAnotherTabAndPanel", () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("when previous tab is activated, do nothing", () => {
      const tabs = [{}, {}];
      const activeTabIndex = 1;
      const setActiveTabIndex = vi.fn();
      const setActivePanelIndex = vi.fn();
      activatePreviousTab.mockReturnValue(true);
      activateAnotherTabAndPanel(
        tabs,
        activeTabIndex,
        setActiveTabIndex,
        setActivePanelIndex
      );
      expect(activatePreviousTab).toHaveBeenCalled();
    });
    it("when no previous tab is to activate, should activate next tab", () => {
      const tabs = [{}, {}];
      const activeTabIndex = 0;
      const setActiveTabIndex = vi.fn();
      const setActivePanelIndex = vi.fn();
      const nextTabIndex = 1;
      activatePreviousTab.mockReturnValue(false);
      getNextTabIndex.mockImplementation(() => nextTabIndex);
      activateAnotherTabAndPanel(
        tabs,
        activeTabIndex,
        setActiveTabIndex,
        setActivePanelIndex
      );
      expect(activatePreviousTab).toHaveBeenCalled();
      expect(getNextTabIndex).toHaveBeenCalled();
      expect(setActiveTabIndex).toBeCalledWith(nextTabIndex - 1);
      expect(setActivePanelIndex).toBeCalledWith(nextTabIndex - 1);
    });
    it("when tab can be found to activate, do nothing", () => {
      const tabs = [{}, {}];
      const activeTabIndex = 0;
      const setActiveTabIndex = vi.fn();
      const setActivePanelIndex = vi.fn();
      const nextTabIndex = 0;
      activatePreviousTab.mockReturnValue(false);
      getNextTabIndex.mockImplementation(() => nextTabIndex);
      activateAnotherTabAndPanel(
        tabs,
        activeTabIndex,
        setActiveTabIndex,
        setActivePanelIndex
      );
      expect(activatePreviousTab).toHaveBeenCalled();
      expect(getNextTabIndex).toHaveBeenCalled();
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
    });
  });

  describe("movePreviousTabToRightAmount", () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("when canMovePreviousTabToRight is false, should return 0", () => {
      canMovePreviousTabToRight.mockImplementation(() => false);
      expect(movePreviousTabToRightAmount(100, 200, 50, [])).toEqual(0);
      expect(canMovePreviousTabToRight).toBeCalledWith(100, 200, 50);
    });
    it("when canMovePreviousTabToRight is true, should call getPreviousTabToMoveRight and calculateRightMoveAmount correctly", () => {
      const leftOffset = 100;
      const containerWidth = 200;
      const viewPortWidth = 500;
      const retOfGetPreviousTabToMoveRight = [0, 100];
      const retOfCalculateRightMoveAmount = 100;
      const tabWidths = [];
      canMovePreviousTabToRight.mockReturnValue(true);
      getPreviousTabToMoveRight.mockReturnValue(retOfGetPreviousTabToMoveRight);
      calculateRightMoveAmount.mockReturnValue(retOfCalculateRightMoveAmount);
      expect(
        movePreviousTabToRightAmount(
          leftOffset,
          containerWidth,
          viewPortWidth,
          []
        )
      ).toBe(retOfCalculateRightMoveAmount);
      expect(getPreviousTabToMoveRight).toBeCalledWith(leftOffset, tabWidths);
      expect(calculateRightMoveAmount).toBeCalledWith(
        ...retOfGetPreviousTabToMoveRight,
        tabWidths
      );
    });
  });

  describe("moveNextTabToLeftAmount", () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("when canMoveNextTabToLeft is false, should return 0", () => {
      canMoveNextTabToLeft.mockReturnValue(false);
      expect(moveNextTabToLeftAmount(100, 200, 50, [])).toEqual(0);
      expect(canMoveNextTabToLeft).toBeCalledWith(100, 200, 50);
    });
    it("when canMoveNextTabToLeft is true, should call getNextTabToMoveLeft and calculateLeftMoveAmount correctly", () => {
      const leftOffset = 100;
      const containerWidth = 200;
      const viewPortWidth = 500;
      const retOfgetNextTabToMoveLeft = [0, 100];
      const retOfcalculateLeftMoveAmount = 100;
      const tabWidths = [];
      canMoveNextTabToLeft.mockReturnValue(true);
      getNextTabToMoveLeft.mockReturnValue(retOfgetNextTabToMoveLeft);
      calculateLeftMoveAmount.mockReturnValue(retOfcalculateLeftMoveAmount);
      expect(
        moveNextTabToLeftAmount(leftOffset, containerWidth, viewPortWidth, [])
      ).toBe(retOfcalculateLeftMoveAmount);
      expect(getNextTabToMoveLeft).toBeCalledWith(
        leftOffset,
        viewPortWidth,
        tabWidths
      );
      expect(calculateLeftMoveAmount).toBeCalledWith(
        ...retOfgetNextTabToMoveLeft,
        tabWidths
      );
    });
    it("When container width === sum of tabWidths, should return 0", () => {
      const leftOffset = 300;
      const viewPortWidth = 100;
      const containerWidth = leftOffset + viewPortWidth;
      expect(
        moveNextTabToLeftAmount(
          leftOffset,
          containerWidth,
          viewPortWidth,
          [100, 100, 100, 100]
        )
      ).toBe(0);
    });
  });

  describe("noop", () => {
    it("should not blow up", () => {
      noop();
    });
  });
});
