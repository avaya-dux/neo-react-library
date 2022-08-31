import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { popupManagerLogger } from "components/PopupManager";

import * as EventStories from "./EventNotification.stories";
import * as NonEventStories from "./NonEventNotification.stories";
import { createAction, notificationLogger } from "./Notification";
import * as ToggleEventStories from "./ToggleNotification.stories";

notificationLogger.disableAll();
popupManagerLogger.disableAll();

const {
  Success,
  Warning,
  Alert,
  AlertCloseAlert,
  AlertCounter,
  AlertButtons,
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
          "Click this button will close this notification"
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

    describe("AlertButtons", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<AlertButtons />);
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

  describe("createAction", () => {
    describe("return ClosableAction", () => {
      it("when action is undefined", () => {
        const result = createAction(undefined, "success");
        expect(result).toMatchInlineSnapshot(`
          <ClosableAction
            onClick={[Function]}
          />
        `);
      });

      it("when action is ClosableActionProps", async () => {
        const onClick = vi.fn();
        const setClosed = vi.fn();
        const result = createAction({ onClick }, "success", setClosed);
        expect(result).toMatchInlineSnapshot(`
              <ClosableAction
                onClick={[Function]}
              />
            `);
        const { container } = render(result);
        expect(container).toBeDefined();
        expect(container).toMatchInlineSnapshot(`
          <div>
            <button
              aria-label="close notification"
              class="neo-icon-end"
            />
          </div>
        `);
        const button = screen.getByRole("button");
        await user.click(button);
        expect(setClosed).toBeCalled();
        expect(onClick).toBeCalled();
      });

      it("when action is string", () => {
        const result = createAction("something", "success");
        expect(result).toMatchInlineSnapshot(`
          <ClosableAction
            onClick={[Function]}
          />
        `);
      });

      it("when action is an array", () => {
        const result = createAction([], "success");
        expect(result).toMatchInlineSnapshot(`
          <ClosableAction
            onClick={[Function]}
          />
        `);
      });

      it("when action is an empyt object", () => {
        const result = createAction({}, "success");
        expect(result).toMatchInlineSnapshot(`
          <ClosableAction
            onClick={[Function]}
          />
        `);
      });
    });

    it("when action is CounterActionProps, return CounterAction", () => {
      const result = createAction({ count: "00:00" }, "success");
      expect(result).toMatchInlineSnapshot(`
        <CounterAction
          count="00:00"
        />
      `);
    });

    describe("return ButtonAction", () => {
      it("when action is ButtonActionProps and type is success", () => {
        const result = createAction(
          { buttons: [{ value: "button1" }, { value: "button2" }] },
          "success"
        );
        const { container } = render(result);
        expect(container).toBeDefined();
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toEqual(2);
        expect(buttons[0]).toHaveClass("neo-btn-secondary--success");
        expect(buttons[1]).toHaveClass("neo-btn-secondary--success");
      });

      it("when action is ButtonActionProps and type is event", () => {
        const result = createAction(
          { buttons: [{ value: "button1" }, { value: "button2" }] },
          "event"
        );
        const { container } = render(result);
        expect(container).toBeDefined();
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toEqual(2);
        expect(buttons[0]).toHaveClass("neo-btn-secondary--default");
        expect(buttons[1]).toHaveClass("neo-btn-secondary--default");
      });
    });

    it("returns a ReactElement", () => {
      const result = createAction(<div>test</div>, "success");
      expect(result).toMatchInlineSnapshot(`
        <div>
          test
        </div>
      `);
    });
  });
});
