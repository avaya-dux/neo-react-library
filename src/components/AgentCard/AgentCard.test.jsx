import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { AgentCard } from "./AgentCard";
import * as AgentCardStories from "./AgentCard.stories";

const { AgentCardStory, TemplatedAgentCard } = composeStories(AgentCardStories);

describe("AgentCard Component", () => {
  const AgentCardName = "Joan Barnett";

  it("render without errors", () => {
    const { getByText } = render(
      <AgentCard agentName={AgentCardName} agentStatus="ready" />
    );
    const AgentCardElement = getByText(AgentCardName);
    expect(AgentCardElement).toBeInTheDocument();
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(
      <AgentCard agentName={AgentCardName} agentStatus="connected" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it("render css classes according to the status", () => {
    const { container } = render(
      <AgentCard agentName={AgentCardName} agentStatus="connected" />
    );
    const AgentCardElement = container.querySelector(
      ".neo-nav-status--connected"
    );
    expect(AgentCardElement).toBeInTheDocument();
  });

  describe("storybook tests", () => {
    describe("AgentCard", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<AgentCardStory />);
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
    describe("Templated AgentCard Component", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<TemplatedAgentCard />);
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
