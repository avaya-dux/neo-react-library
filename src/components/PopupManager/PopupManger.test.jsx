import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { notificationLogger } from "components/Notification";
import { toastLogger } from "components/Toast";

import { popupHookLogger, popupManagerLogger } from ".";
import * as NotificationStories from "./PopupManager.notification.stories";
import * as ToastStories from "./PopupManager.toast.stories";

popupManagerLogger.disableAll();
popupHookLogger.disableAll();
notificationLogger.disableAll();
toastLogger.disableAll();
import { vi } from "vitest";

const { ToastMessageOnly, ToastWithIcon, DefaultToast, ToastsPositioning } =
	composeStories(ToastStories);

const { PopClosableEvent, PopCounterEvent } =
	composeStories(NotificationStories);

describe("PopupManager", () => {
	const user = userEvent.setup();

	describe("Storybook", () => {
		describe("ToastMessageOnly", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<ToastMessageOnly />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("ToastsPositioning", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<ToastsPositioning />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("ToastWithIcon", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<ToastWithIcon />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("DefaultToast", () => {
			// NOTE: ignore react17 warnings (from storybook build). Should remove this line once storybook is updated to react18.
			vi.spyOn(console, "error").mockImplementation(() => null);

			let renderResult;
			beforeEach(() => {
				renderResult = render(<DefaultToast />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});

		describe("PopCounterEvent", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<PopCounterEvent />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});

			it("toggle notification works", async () => {
				const { getByRole } = renderResult;
				const toggle = screen.getAllByRole("button")[0];
				await user.click(toggle);
				const notification = await screen.findByRole("alert");
				expect(notification).toBeDefined();
				await user.click(toggle);
				await new Promise((resolve) => setTimeout(resolve, 0));
				expect(() => getByRole("alert")).toThrow();
			});

			it("removeAll notifications works", async () => {
				const { getByRole } = renderResult;
				const [toggle, removeAll] = screen.getAllByRole("button");
				await user.click(toggle);
				const notification = await screen.findByRole("alert");
				expect(notification).toBeDefined();
				await user.click(removeAll);
				await new Promise((resolve) => setTimeout(resolve, 0));
				expect(() => getByRole("alert")).toThrow();
			});

			it("setZIndex works", async () => {
				const alert = window.alert;
				window.alert = vi.fn();
				const [, , setZIndex] = screen.getAllByRole("button");
				await user.click(setZIndex);
				const topContainer = document.getElementById("neo-popup-manager-top");
				const style = window.getComputedStyle(topContainer);
				expect(style.zIndex).toBe("2000");
				expect(window.alert).toBeCalled();
				window.alert = alert;
			});
		});

		describe("PopClosableEvent", () => {
			let renderResult;
			beforeEach(() => {
				renderResult = render(<PopClosableEvent />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).toBeDefined();
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});
	});
});
