import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { BasicModal } from "./BasicModal";
import * as BasicStory from "./BasicModal.stories";

const { BasicModalExample, BasicModalExampleWithDiffContent } =
  composeStories(BasicStory);

describe("BasicModal Component", () => {
  const titleText = "test";
  it("fully render without exploding", () => {
    render(
      <BasicModal title={titleText} open>
        <p>Testing content</p>
      </BasicModal>
    );
    const rootElement = screen.getByText(titleText);
    expect(rootElement).toBeInTheDocument();
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(<BasicModal title={titleText} open />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("storybook tests", () => {
    describe("BasicModalExample", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<BasicModalExample open />);
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

    describe("BasicModalExampleWithDiffContent", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<BasicModalExampleWithDiffContent open />);
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

    describe("BasicModalExampleWithDiffContent", () => {
      it("should not render when open is false", () => {
        render(<BasicModalExampleWithDiffContent open={false} />);
        const rootElement = screen.getByTestId("neo-button-show");
        expect(rootElement).toBeInTheDocument();
      });
    });
  });
});
