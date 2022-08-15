import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { InfoModal } from ".";

import * as InfoModalStories from "./InfoModal.stories";

describe("InfoModal: ", () => {
  describe("Render InfoModal: Portal example", () => {
    const { PortalInfoModalExample } = composeStories(InfoModalStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<PortalInfoModalExample />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("should match snapshots", () => {
      const { container } = renderResult;
      expect(container).toMatchInlineSnapshot(`
        <div>
          <div>
            <button
              class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--default"
              data-badge=""
              data-testid="neo-button-show"
              dir="ltr"
              id="btn-show"
            >
              Show
            </button>
          </div>
        </div>
      `);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render InfoModal: Title with Icon", () => {
    const { InfoModalWithCompositeTitle } = composeStories(InfoModalStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<InfoModalWithCompositeTitle />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("should match snapshots", () => {
      const { container } = renderResult;
      expect(container).toMatchInlineSnapshot(`
        <div>
          <div>
            <button
              class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--default"
              data-badge=""
              data-testid="neo-button-show"
              dir="ltr"
              id="btn-show"
            >
              Show
            </button>
          </div>
        </div>
      `);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render InfoModal: Composite content", () => {
    const { InfoModalWithCompositeContent } = composeStories(InfoModalStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<InfoModalWithCompositeContent />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("should match snapshots", () => {
      const { container } = renderResult;
      expect(container).toMatchInlineSnapshot(`
        <div>
          <div>
            <button
              class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--default"
              data-badge=""
              data-testid="neo-button-show"
              dir="ltr"
              id="btn-show"
            >
              Show
            </button>
          </div>
        </div>
      `);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("InfoModal open prop tests", () => {
    it("Renders when open is true", () => {
      const datatestid = "InfoModal-root";

      const { getByTestId } = render(
        <InfoModal id={datatestid} onClose={() => {}} open={true}>
          This is some content
        </InfoModal>
      );
      const rootElement = getByTestId(datatestid);
      expect(rootElement).toBeTruthy();
    });

    it("Does not Render when open is false", () => {
      const datatestid = "InfoModal-root";
      const { queryAllByTestId } = render(
        <InfoModal id={datatestid} onClose={() => {}} open={false}>
          This is some content
        </InfoModal>
      );
      const rootElement = queryAllByTestId(datatestid);
      expect(rootElement).toHaveLength(0);
    });
  });
});

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
