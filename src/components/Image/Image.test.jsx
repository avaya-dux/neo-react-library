import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import cat from "./200by300image.jpeg";
import { Image } from "./Image";
import * as ImageStories from "./Image.stories";

const { DefaultImage, FallBackAsJSX, FallBackAsUrl, Thumbnail } =
  composeStories(ImageStories);

describe("Image", () => {
  it("fully renders without exploding", async () => {
    const fallbackText = "fallback placeholder";
    const { getByRole, getByText } = render(
      <Image alt="test image" src={cat} fallback={<div>{fallbackText}</div>} />
    );

    // HACK: should be `"img"`, but the image doesn't seem to be loading, thus the tag is registred as a `presentation` role
    const image = getByRole("presentation", { hidden: true });
    const fallback = getByText(fallbackText);

    // expect image to be hidden on initial render and `fallback` to be shown
    expect(image).toBeInTheDocument();
    expect(image).not.toBeVisible();
    expect(fallback).toBeInTheDocument();

    // the `img` tag does not automatically trigger it's own load/error events,
    // so we need to manually trigger them
    fireEvent.load(image);

    // expect image to be visible after load event, and fallback to have been removed
    expect(image).toBeVisible();
    expect(fallback).not.toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Image alt="test image" src={cat} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("logs a console warning if the user does not pass `alt` text", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => null);

    expect(() => render(<Image src={cat} />)).toThrow();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("does not log a console warning if the user does not pass `alt` text _and_ marks it as decorative", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => null);

    render(<Image src={cat} isDecorativeOrBranding />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("calls passed `onError` method if passed and an error was thrown", async () => {
    const onErrorSpy = vi.fn();

    const { getByRole } = render(
      <Image alt="test image" src="brokenimage.png" onError={onErrorSpy} />
    );

    // HACK: should be `"img"`, but the image doesn't seem to be loading, thus the tag is registred as a `presentation` role
    fireEvent.error(getByRole("presentation", { hidden: true }));

    expect(onErrorSpy).toHaveBeenCalledTimes(1);
  });

  it("does _not_ explode if an error was thrown and no method was passed", async () => {
    const { getByRole } = render(
      <Image alt="test image" src="brokenimage.png" />
    );

    // HACK: should be `"img"`, but the image doesn't seem to be loading, thus the tag is registred as a `presentation` role
    const image = getByRole("presentation", { hidden: true });
    fireEvent.error(image);

    expect(image).toBeInTheDocument();
  });

  it("calls passed `onLoad` method if passed and load is called", async () => {
    const onLoadSpy = vi.fn();

    const { getByRole } = render(
      <Image alt="test image" src={cat} onLoad={onLoadSpy} />
    );

    // HACK: should be `"img"`, but the image doesn't seem to be loading, thus the tag is registred as a `presentation` role
    fireEvent.load(getByRole("presentation", { hidden: true }));

    expect(onLoadSpy).toHaveBeenCalledTimes(1);
  });

  describe("storybook tests", () => {
    describe("DefaultImage", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<DefaultImage />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("FallBackAsJSX", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<FallBackAsJSX />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("FallBackAsUrl", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<FallBackAsUrl />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("Thumbnail", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Thumbnail />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
