import { composeStories } from "@storybook/testing-react";
import { fireEvent, getByRole, getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { popupManagerLogger } from "components/PopupManager";

import { ButtonAction, ClosableAction, ClosableActionProps, CounterAction } from "./Actions";
import * as EventStories from "./EventNotification.stories";
import * as NonEventStories from "./NonEventNotification.stories";
import { createActions, notificationLogger } from "./Notification";
import * as ToggleEventStories from "./ToggleNotification.stories";

notificationLogger.disableAll();
popupManagerLogger.disableAll();

const {
  Success,
  Warning,
  Alert,
  AlertCloseAlert,
  AlertCounter,
  AlertButtonsCounter,
  AlertButtonsCounterClosable,
  Info,
} = composeStories(NonEventStories);

const { AlertShow, AlertShowContainer } = composeStories(ToggleEventStories);
const { Event, EventCloseAlert, EventButtons, EventCounter } =
  composeStories(EventStories);

describe("Notification", () => {
  const user = userEvent.setup();

  describe("Storybook stories", () => {
    describe("Success", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Success />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--success");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Warning", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Warning />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--warning");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Alert", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Alert />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--alert");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("AlertCloseAlert", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<AlertCloseAlert />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--alert");
        const closeButton = screen.getByRole("button");
        expect(closeButton).toHaveAttribute(
          "aria-label",
          "Click this button will close this notification",
        );
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("AlertCounter", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<AlertCounter />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--alert");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("AlertButtonsCounter", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<AlertButtonsCounter />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--alert");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("AlertButtonsCounterClosable", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<AlertButtonsCounterClosable />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--alert");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("AlertShow", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<AlertShow />);
      });

      it("should render ok", async () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const showButton = screen.getByRole("button");
        await user.click(showButton);
        const alertRole = screen.queryByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--alert");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("AlertShowContainer", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<AlertShowContainer />);
      });

      it("should render ok", async () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const showButton = screen.getByRole("button");
        await user.click(showButton);
        const alertRole = screen.queryByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--alert");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Info", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Info />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--info");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Event", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Event />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--event");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it("close button works as expected", async () => {
        const { getByRole } = renderResult;
        const closeButton = getByRole("button");
        await user.click(closeButton);
        const alert = screen.queryAllByRole("alert");
        expect(alert.length).toBe(0);
      });
    });

    describe("EventCloseAlert", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<EventCloseAlert />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--event");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("EventCounter", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<EventCounter />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--event");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("EventButtons", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<EventButtons />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        const alertRole = screen.getByRole("alert");
        expect(alertRole).toHaveClass("neo-notification--event");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe("createActions", () => {
    describe("return ClosableAction", () => {
      it("when action is undefined", () => {
        const result = createActions(undefined, "success");
        expect(result).toStrictEqual({
          buttonAction: null,
          closableAction: null,
          counterAction: null,
        });
      });

      it("when action is ClosableActionProps", async () => {
        const onClick = vi.fn();
        const setClosed = vi.fn();
        const closable = { onClick };
        const result = createActions({ closable }, "success", setClosed);
        const { container } = render(result.closableAction);

        const buttonComponent = getByRole(container, "button");
        fireEvent.click(buttonComponent);

        expect(onClick).toHaveBeenCalled();
      });

      it("when action is string", () => {
        const result = createActions("something", "success");
        expect(result).toStrictEqual({
          buttonAction: null,
          closableAction: null,
          counterAction: null,
        });
      });

      it("when action is an array", () => {
        const result = createActions([], "success");
        expect(result).toStrictEqual({
          buttonAction: null,
          closableAction: null,
          counterAction: null,
        });
      });

      it("when action is an empty object", () => {
        const result = createActions({}, "success");
        expect(result).toStrictEqual({
          buttonAction: null,
          closableAction: null,
          counterAction: null,
        });
      });
    });

    it("when action is CounterActionProps, return CounterAction", () => {
      const result = createActions({ count: "00:00" }, "success");
      const { container } = render(result.counterAction);
      expect(container).toBeDefined();
    });

    describe("return ButtonAction", () => {
      it("when action is ButtonActionProps and type is success", () => {
        const result = createActions(
          {
            actionButtons: {
              buttons: [{ value: "button1" }, { value: "button2" }],
            },
          },
          "success",
        );
        const { container } = render(result.buttonAction);
        expect(container).toBeDefined();
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toEqual(2);
        expect(buttons[0]).toHaveClass("neo-btn-secondary--success");
        expect(buttons[1]).toHaveClass("neo-btn-secondary--success");
      });

      it("when action is ButtonActionProps and type is event", () => {
        const result = createActions(
          {
            actionButtons: {
              buttons: [{ value: "button1" }, { value: "button2" }],
            },
          },
          "event",
        );
        const { container } = render(result.buttonAction);
        expect(container).toBeDefined();
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toEqual(2);
        expect(buttons[0]).toHaveClass("neo-btn-secondary--event");
        expect(buttons[1]).toHaveClass("neo-btn-secondary--event");
      });
    });
  });
});
