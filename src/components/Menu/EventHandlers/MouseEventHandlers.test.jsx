import log from "loglevel";
import { vi } from "vitest";

import {
  handleMenuButtonClickEvent,
  handleMenuItemClick,
  handleMouseMoveEvent,
} from "./MouseEventHandlers";

log.disableAll();

describe("MENU Mouse event handlers", () => {
  describe(handleMenuButtonClickEvent, () => {
    let setOpen;
    beforeEach(() => {
      setOpen = vi.fn();
    });

    it("should close menu if menu is open.", () => {
      const e = { stopPropagation: vi.fn() };
      handleMenuButtonClickEvent(e, true, setOpen);
      expect(e.stopPropagation).toBeCalled();
      expect(setOpen).toBeCalledWith(false);
    });

    it("should open menu if menu is closed.", () => {
      const e = { stopPropagation: vi.fn() };
      handleMenuButtonClickEvent(e, false, setOpen);
      expect(e.stopPropagation).toBeCalled();
      expect(setOpen).toBeCalledWith(true);
    });
  });

  describe(handleMouseMoveEvent, () => {
    let setCursor, setCursorAction, setEnterCounter;
    beforeEach(() => {
      setCursor = vi.fn();
      setCursorAction = vi.fn();
      setEnterCounter = vi.fn();
    });
    it("should do nothing when mouse is over element without id", () => {
      const target = { getAttribute: () => null };
      const e = { target };
      const menuIndexes = [];
      const cursor = 0;
      const enterCounter = 0;
      handleMouseMoveEvent(
        e,
        menuIndexes,
        cursor,
        setCursor,
        "",
        setCursorAction,
        enterCounter,
        setEnterCounter
      );
      expect(setCursor).not.toBeCalled();
      expect(setCursorAction).not.toBeCalled();
      expect(setEnterCounter).not.toBeCalled();
    });
    it("should do nothing when mouse is over neither menu item nor sub menu", () => {
      const target = { getAttribute: () => "not a menu" };
      const e = { target };
      const menuIndexes = [{ id: "menuitem1", index: 0 }];
      const cursor = 0;
      const enterCounter = 0;
      handleMouseMoveEvent(
        e,
        menuIndexes,
        cursor,
        setCursor,
        "",
        setCursorAction,
        enterCounter,
        setEnterCounter
      );
      expect(setCursor).not.toBeCalled();
      expect(setCursorAction).not.toBeCalled();
      expect(setEnterCounter).not.toBeCalled();
    });
    it("should update cursor and increment eneterCounter when mouse is over the same menu item", () => {
      const target = { getAttribute: () => "menuitem1" };
      const e = { target };
      const menuIndexes = [{ id: "menuitem1", index: 2 }];
      const cursor = 0;
      const enterCounter = 10;
      handleMouseMoveEvent(
        e,
        menuIndexes,
        cursor,
        setCursor,
        "",
        setCursorAction,
        enterCounter,
        setEnterCounter
      );
      expect(setCursor).toBeCalledWith(0);
      expect(setCursorAction).not.toBeCalled();
      expect(setEnterCounter).toBeCalledWith(11);
    });
    it("should update cursor and set eneterCounter to 1 when mouse is over menu item the first time.", () => {
      const target = { getAttribute: () => "menuitem1" };
      const e = { target };
      const menuIndexes = [{ id: "menuitem1", index: 2 }];
      const cursor = 2;
      const enterCounter = 10;
      handleMouseMoveEvent(
        e,
        menuIndexes,
        cursor,
        setCursor,
        "",
        setCursorAction,
        enterCounter,
        setEnterCounter
      );
      expect(setCursor).toBeCalledWith(0);
      expect(setCursorAction).not.toBeCalled();
      expect(setEnterCounter).toBeCalledWith(1);
    });
    it("should update cursor and set eneterCounter to 1 when mouse is over sub menu the first time.", () => {
      const target = {
        getAttribute: vi.fn().mockImplementation(() => "menuitem1"),
      };
      const e = { target };
      const menuIndexes = [{ id: "menuitem1", index: 2, length: 2 }];
      const cursor = 0;
      const enterCounter = 10;
      handleMouseMoveEvent(
        e,
        menuIndexes,
        cursor,
        setCursor,
        "",
        setCursorAction,
        enterCounter,
        setEnterCounter
      );
      expect(target.getAttribute).toBeCalledTimes(1);
      expect(setCursor).toBeCalledWith(0);
      expect(setCursorAction).toBeCalledWith("ENTER_SUB_MENU");
      expect(setEnterCounter).toBeCalledWith(1);
    });
    it("should update cursor and increment eneterCounter when mouse is over the same sub menu", () => {
      const target = { getAttribute: () => "menuitem1" };
      const e = { target };
      const menuIndexes = [{ id: "menuitem1", index: 2, length: 2 }];
      const cursor = 0;
      const enterCounter = 10;
      handleMouseMoveEvent(
        e,
        menuIndexes,
        cursor,
        setCursor,
        "ENTER_SUB_MENU",
        setCursorAction,
        enterCounter,
        setEnterCounter
      );
      expect(setCursor).toBeCalledWith(0);
      expect(setCursorAction).not.toBeCalled();
      expect(setEnterCounter).toBeCalledWith(11);
    });
  });

  describe("handleMenuItemClick", () => {
    it("should close menu if `closeOnSelect` is `true`", () => {
      const setOpen = vi.fn();
      handleMenuItemClick(true, setOpen);

      expect(setOpen).toBeCalledWith(false);
    });

    it("should not affect menu if `closeOnSelect` is `false`", () => {
      const setOpen = vi.fn();
      handleMenuItemClick(false, setOpen);

      expect(setOpen).not.toHaveBeenCalled();
    });
  });
});
