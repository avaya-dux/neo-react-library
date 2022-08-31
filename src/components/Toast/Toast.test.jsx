import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { popupHookLogger, popupManagerLogger } from "components/PopupManager";

import { toastLogger } from "./Toast";
import * as ToastStories from "./Toast.stories";

popupManagerLogger.disableAll();
popupHookLogger.disableAll();
toastLogger.disableAll();

const { Default, InteractiveToasts, IconBottomCenter, TwoToasts } =
  composeStories(ToastStories);

describe("Toast", () => {
  describe("Storybook", () => {
    // NOTE: ignore react17 warnings (from storybook build). Should remove this line once storybook is updated to react18.
    vi.spyOn(console, "error").mockImplementation(() => null);

    describe("Default", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Default duration={100} />);
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

    describe("InteractiveToasts", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<InteractiveToasts />);
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

    describe("IconBottomCenter", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<IconBottomCenter />);
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

    describe("TwoToasts", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<TwoToasts />);
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
