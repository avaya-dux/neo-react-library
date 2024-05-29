import log from "loglevel";
import { vi } from "vitest";

import { Keys } from "utils";

import {
	handleBlurEvent,
	handleButtonKeyDownEvent,
	handleKeyDownEvent,
} from "./KeyboardEventHandlers";

log.disableAll();

describe("MENU Keyboard event handlers", () => {
	describe("handleKeyDownEvent", () => {
		let setCursorAction;
		let setCursor;
		let setEnterCounter;
		let setOpen;

		beforeEach(() => {
			setCursorAction = vi.fn();
			setCursor = vi.fn();
			setEnterCounter = vi.fn();
			setOpen = vi.fn();
		});

		it("should do nothing when menuIndexes is empty", () => {
			const e = { key: Keys.DOWN };
			const menuIndexes = [];
			handleKeyDownEvent(
				e,
				menuIndexes,
				"",
				setCursorAction,
				0,
				setCursor,
				0,
				setEnterCounter,
				setOpen,
				"label",
			);
			expect(setCursorAction).not.toBeCalled();
			expect(setCursor).not.toBeCalled();
			expect(setEnterCounter).not.toBeCalled();
			expect(setOpen).not.toBeCalled();
		});

		describe(Keys.DOWN, () => {
			it("should increment cursor if it is not the biggest index currently.", () => {
				const e = {
					key: Keys.DOWN,
					preventDefault: vi.fn(),
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					0,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("");
				expect(setCursor).toHaveBeenCalledWith(1);
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).not.toBeCalled();
				expect(e.preventDefault).toHaveBeenCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
			it("should set cursor to 0 if it is already the biggest index", () => {
				const e = {
					key: Keys.DOWN,
					preventDefault: vi.fn(),
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					1,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("");
				expect(setCursor).toHaveBeenCalledWith(0);
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).not.toBeCalled();
				expect(e.preventDefault).toHaveBeenCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
		});
		describe(Keys.UP, () => {
			it("should decrement cursor if it is greater than 0.", () => {
				const e = {
					key: Keys.UP,
					preventDefault: vi.fn(),
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					1,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("");
				expect(setCursor).toHaveBeenCalledWith(0);
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).not.toBeCalled();
				expect(e.preventDefault).toHaveBeenCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
			it("should set cursor to largest index if it is 0.", () => {
				const e = {
					key: Keys.UP,
					preventDefault: vi.fn(),
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					0,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("");
				expect(setCursor).toHaveBeenCalledWith(1);
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).not.toBeCalled();
				expect(e.preventDefault).toHaveBeenCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
		});
		describe(Keys.ENTER, () => {
			it("should set cursorAction on MenuItem", () => {
				const e = {
					key: Keys.ENTER,
					stopPropagation: vi.fn(),
					preventDefault: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					0,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					false,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("ACTIVATE_MENU_ITEM");
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
				expect(e.preventDefault).toHaveBeenCalled();
			});
			it("should set cursorAction on SubMenu", () => {
				const e = {
					key: Keys.ENTER,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					0,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("ENTER_SUB_MENU");
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).toHaveBeenCalledWith(1);
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
			it("should increment enter count if cursor action is alreay ENTER_SUB_MENU", () => {
				const e = {
					key: Keys.ENTER,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				const enterCoutner = 10;
				handleKeyDownEvent(
					e,
					menuIndexes,
					"ENTER_SUB_MENU",
					setCursorAction,
					0,
					setCursor,
					enterCoutner,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).not.toBeCalled();
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).toHaveBeenCalledWith(enterCoutner + 1);
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
		});
		describe(Keys.SPACE, () => {
			it("should set cursorAction on MenuItem", () => {
				const e = {
					key: Keys.SPACE,
					stopPropagation: vi.fn(),
					preventDefault: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					0,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					false,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("ACTIVATE_MENU_ITEM");
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
				expect(e.preventDefault).toHaveBeenCalled();
			});
			it("should set cursorAction on SubMenu", () => {
				const e = {
					key: Keys.SPACE,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					0,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("ENTER_SUB_MENU");
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).toHaveBeenCalledWith(1);
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
			it("should increment enter count if cursor action is alreay ENTER_SUB_MENU", () => {
				const e = {
					key: Keys.SPACE,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				const enterCoutner = 10;
				handleKeyDownEvent(
					e,
					menuIndexes,
					"ENTER_SUB_MENU",
					setCursorAction,
					0,
					setCursor,
					enterCoutner,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).not.toBeCalled();
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).toHaveBeenCalledWith(enterCoutner + 1);
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
		});
		describe(Keys.RIGHT, () => {
			it("should do nothing on MenuItem", () => {
				const e = {
					key: Keys.RIGHT,
					stopPropagation: vi.fn(),
					preventDefault: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					0,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).not.toBeCalled();
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
			it("should set cursorAction on SubMenu", () => {
				const e = {
					key: Keys.RIGHT,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				handleKeyDownEvent(
					e,
					menuIndexes,
					"",
					setCursorAction,
					0,
					setCursor,
					0,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("ENTER_SUB_MENU");
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).toHaveBeenCalledWith(1);
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
			it("should increment enter count if cursor action is alreay ENTER_SUB_MENU", () => {
				const e = {
					key: Keys.RIGHT,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				const enterCoutner = 10;
				handleKeyDownEvent(
					e,
					menuIndexes,
					"ENTER_SUB_MENU",
					setCursorAction,
					0,
					setCursor,
					enterCoutner,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).not.toBeCalled();
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).toHaveBeenCalledWith(enterCoutner + 1);
				expect(setOpen).not.toBeCalled();
				expect(e.stopPropagation).toHaveBeenCalled();
			});
		});
		describe(Keys.LEFT, () => {
			it("should close menu", () => {
				const e = {
					key: Keys.LEFT,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				const enterCoutner = 10;
				handleKeyDownEvent(
					e,
					menuIndexes,
					"ENTER_SUB_MENU",
					setCursorAction,
					0,
					setCursor,
					enterCoutner,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("");
				expect(setCursor).toHaveBeenCalledWith(0);
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).toHaveBeenCalledWith(false);
				expect(e.stopPropagation).toHaveBeenCalled();
			});
		});
		describe(Keys.ESC, () => {
			it("should close menu", () => {
				const e = {
					key: Keys.ESC,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				const enterCoutner = 10;
				handleKeyDownEvent(
					e,
					menuIndexes,
					"ENTER_SUB_MENU",
					setCursorAction,
					0,
					setCursor,
					enterCoutner,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("");
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).toHaveBeenCalledWith(false);
				expect(e.stopPropagation).not.toBeCalled();
			});
		});
		describe(Keys.TAB, () => {
			it("should close menu", () => {
				const e = {
					key: Keys.TAB,
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0, length: 2 }, { index: 1 }];
				const enterCoutner = 10;
				handleKeyDownEvent(
					e,
					menuIndexes,
					"ENTER_SUB_MENU",
					setCursorAction,
					0,
					setCursor,
					enterCoutner,
					setEnterCounter,
					setOpen,
					"label",
				);
				expect(setCursorAction).toHaveBeenCalledWith("");
				expect(setCursor).not.toBeCalled();
				expect(setEnterCounter).not.toBeCalled();
				expect(setOpen).toHaveBeenCalledWith(false);
				expect(e.stopPropagation).not.toBeCalled();
			});
		});
	});

	describe("handleBlurEvent", () => {
		let setOpen;
		beforeEach(() => {
			setOpen = vi.fn();
		});

		it("should close menu when menu loses focus and `closeOnBlur` is true", () => {
			const e = { relatedTarget: null };
			handleBlurEvent(e, true, setOpen);
			expect(setOpen).toBeCalledWith(false);
		});

		it("should do nothing when menu loses focus and `closeOnBlur` is false", () => {
			const e = { relatedTarget: null };
			handleBlurEvent(e, false, setOpen);
			expect(setOpen).not.toHaveBeenCalled();
		});

		it("should do nothing when menu still has focus, independant of `closeOnBlur` prop", () => {
			const e = { relatedTarget: {} };
			handleBlurEvent(e, true, setOpen);
			handleBlurEvent(e, false, setOpen);
			expect(setOpen).not.toHaveBeenCalled();
		});
	});

	describe("handleButtonKeyDownEvent", () => {
		let setCursor;
		let setOpen;
		beforeEach(() => {
			setCursor = vi.fn();
			setOpen = vi.fn();
		});
		function testOpenMenu(key) {
			const e = {
				key,
				preventDefault: vi.fn(),
				stopPropagation: vi.fn(),
			};
			const menuIndexes = [];
			handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);
			expect(e.stopPropagation).toBeCalled();
			expect(e.preventDefault).toBeCalled();
			expect(setCursor).not.toBeCalled();
		}
		function testOpenMenuAndSetCursorToZero(key) {
			const e = {
				key,
				preventDefault: vi.fn(),
				stopPropagation: vi.fn(),
			};
			const menuIndexes = [{ index: 0 }];
			handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);
			expect(e.stopPropagation).toBeCalled();
			expect(e.preventDefault).toBeCalled();
			expect(setCursor).toBeCalledWith(0);
		}
		describe(Keys.ENTER, () => {
			it("should open menu ", () => {
				testOpenMenu(Keys.ENTER);
			});
			it("should open menu and set cursor to 0 if cursor 0 is available.", () => {
				testOpenMenuAndSetCursorToZero(Keys.ENTER);
			});
		});
		describe(Keys.SPACE, () => {
			it("should open menu ", () => {
				testOpenMenu(Keys.SPACE);
			});
			it("should open menu and set cursor to 0 if cursor 0 is available.", () => {
				testOpenMenuAndSetCursorToZero(Keys.SPACE);
			});
		});
		describe(Keys.DOWN, () => {
			it("should open menu ", () => {
				testOpenMenu(Keys.DOWN);
			});
			it("should open menu and set cursor to 0 if cursor 0 is available.", () => {
				testOpenMenuAndSetCursorToZero(Keys.DOWN);
			});
		});
		describe(Keys.UP, () => {
			it("should open menu", () => {
				const e = {
					key: Keys.UP,
					preventDefault: vi.fn(),
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [];
				handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);
				expect(e.stopPropagation).toBeCalled();
				expect(e.preventDefault).toBeCalled();
				expect(setCursor).not.toBeCalled();
			});
			it("should open menu and set cursor to 1", () => {
				const e = {
					key: Keys.UP,
					preventDefault: vi.fn(),
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);
				expect(e.stopPropagation).toBeCalled();
				expect(e.preventDefault).toBeCalled();
				expect(setCursor).toBeCalledWith(1);
			});
		});
		describe(Keys.ESC, () => {
			it("should close menu", () => {
				const e = {
					key: Keys.ESC,
					preventDefault: vi.fn(),
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);
				expect(e.stopPropagation).toBeCalled();
				expect(e.preventDefault).not.toBeCalled();
				expect(setCursor).not.toBeCalled();
			});
		});
		describe(Keys.TAB, () => {
			it("should close menu", () => {
				const e = {
					key: Keys.TAB,
					preventDefault: vi.fn(),
					stopPropagation: vi.fn(),
				};
				const menuIndexes = [{ index: 0 }, { index: 1 }];
				handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);
				expect(e.stopPropagation).not.toBeCalled();
				expect(e.preventDefault).not.toBeCalled();
				expect(setCursor).not.toBeCalled();
			});
		});
	});
});
