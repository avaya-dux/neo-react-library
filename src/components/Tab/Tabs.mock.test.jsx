import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import {
  handleLeftCarouselMouseClickEvent,
  handleRightCarouselMouseClickEvent,
} from "./EventHandlers";
import { enableLeftButton, enableRightButton } from "./EventHandlers/Helper";

import * as CarouselTabStories from "./Tabs.carousel.stories";
const { ManyTabsCarousel } = composeStories(CarouselTabStories);

vi.mock("./EventHandlers");
vi.mock("./EventHandlers/Helper");

describe("Tabs", () => {
  describe("Storybook tests", () => {
    describe(ManyTabsCarousel.storyName, () => {
      beforeEach(() => {
        enableLeftButton.mockReturnValue(true);
        enableRightButton.mockReturnValue(true);
        render(<ManyTabsCarousel />);
        vi.resetAllMocks();
      });

      it("When left carousel button is clicked, left button event handler is called", async () => {
        const buttons = screen.getAllByRole("button");
        // carousel left, right, menu button
        expect(buttons.length).toBe(3);

        const leftButton = buttons[0];
        await userEvent.click(leftButton);
        expect(handleLeftCarouselMouseClickEvent).toBeCalled();
      });

      it("When right carousel button is clicked, right button event handler is called", async () => {
        const buttons = screen.getAllByRole("button");
        // carousel left, right, menu button
        expect(buttons.length).toBe(3);

        const rightButton = buttons[1];
        await userEvent.click(rightButton);
        expect(handleRightCarouselMouseClickEvent).toBeCalled();
      });
    });
  });
});
