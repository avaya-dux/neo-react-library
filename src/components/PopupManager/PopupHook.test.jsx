import { renderHook } from "@testing-library/react-hooks";
import { vi } from "vitest";

import { Notification } from "components/Notification";

import {
  containerId,
  createContainer,
  createDivWithId,
  getReady,
  notifyInit,
  popupHookLogger,
  removeAllInit,
  removeInit,
  removePopupManagerContainer,
  repeatCheck,
  toastInit,
  usePopup,
} from "./PopupHook";
import { popupManagerLogger } from "./PopupManager";

popupManagerLogger.disableAll();
popupHookLogger.disableAll();
describe("PopupHook", () => {
  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });
  it("createContainer creates container", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    createContainer(callback);
    expect(callback).toBeCalledTimes(1);
    callback.mockClear();
    createContainer(callback);
    vi.runAllTimers();
    expect(callback).toBeCalledTimes(1);
    expect(getReady()).toBeTruthy();
  });

  it("createDivWithId creation successful", () => {
    const id = "id";
    createDivWithId(id);
    expect(document.getElementById(id)).toBeTruthy();
  });

  it("usePopup creates container", async () => {
    expect(document.getElementById(containerId)).toBeNull();
    const { result } = renderHook(() => usePopup());
    expect(result.current.mounted).toBeTruthy();
    expect(document.getElementById(containerId)).toBeInTheDocument();
  });
  it("notify ok", async () => {
    const { result } = renderHook(() => usePopup());
    expect(result.current.notify).toBeTruthy();
    const notification = (
      <Notification
        type="event"
        icon="copy"
        header="Event"
        description="This is an event."
        action={{ count: "00:00" }}
      />
    );
    const { id, position } = result.current.notify({ node: notification });
    expect(position).toEqual("top");
    expect(id).toBe(1);
  });
  it("toastInit ok", () => {
    const mock = vi.fn();
    vi.spyOn(popupHookLogger, "error").mockImplementation(mock);
    const { id, position } = toastInit();
    expect(mock).toBeCalled();
    expect(id).toEqual(-1);
    expect(position).toEqual("top");
  });
  it("notifyInit ok", () => {
    const mock = vi.fn();
    vi.spyOn(popupHookLogger, "error").mockImplementation(mock);
    const { id, position } = notifyInit();
    expect(mock).toBeCalled();
    expect(id).toEqual(-1);
    expect(position).toEqual("top");
  });
  it("removeInit ok", () => {
    const mock = vi.fn();
    vi.spyOn(popupHookLogger, "error").mockImplementation(mock);
    removeInit();
    expect(mock).toBeCalled();
  });
  it("removeAllInit ok", () => {
    const mock = vi.fn();
    vi.spyOn(popupHookLogger, "error").mockImplementation(mock);
    removeAllInit();
    expect(mock).toBeCalled();
  });
  it("removePopupManagerContainer works when container does not exists.", () => {
    expect(document.getElementById(containerId)).toBeNull();
    removePopupManagerContainer();
  });
  it("repeatCheck", () => {
    vi.useFakeTimers();
    const getter = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const callback = vi.fn();
    repeatCheck(getter, callback);
    vi.runAllTimers();
    expect(getter).toBeCalledTimes(2);
    expect(callback).toBeCalled();
  });
});
