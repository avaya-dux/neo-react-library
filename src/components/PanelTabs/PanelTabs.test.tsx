import { render, screen } from "@testing-library/react";

import { PanelTabs } from "./PanelTabs";

describe("Panel Tabs", () => {
  const panel1Content = "email inbound";
  const panel2Content = "email outbound";
  const panel3Content = "add";

  describe("base visual tests", () => {
    const standardContent = (
      <>
        <PanelTabs.Panel>
          <PanelTabs.PanelContent active>
            <p>{panel1Content}</p>
          </PanelTabs.PanelContent>

          <PanelTabs.PanelContent active={false}>
            <p>{panel2Content}</p>
          </PanelTabs.PanelContent>

          <PanelTabs.PanelContent active={false}>
            <p>{panel3Content}</p>
          </PanelTabs.PanelContent>
        </PanelTabs.Panel>

        <PanelTabs.TabsContainer>
          <PanelTabs.TabItem
            active
            aria-label="Example One"
            icon="email-inbound"
          />

          <PanelTabs.TabItem
            active={false}
            aria-label="Example Two"
            icon="email-outbound"
          />

          <PanelTabs.TabItem
            active={false}
            aria-label="Example Three"
            icon="add"
            badge
          />
        </PanelTabs.TabsContainer>
      </>
    );

    it("shows only the active panel", () => {
      render(<PanelTabs>{standardContent}</PanelTabs>);

      expect(screen.getByText(panel1Content)).toBeVisible();
      expect(screen.queryByText(panel2Content)).not.toBeVisible();
      expect(screen.queryByText(panel3Content)).not.toBeVisible();
    });

    it("defaults to expanded", () => {
      const { container } = render(<PanelTabs>{standardContent}</PanelTabs>);

      const panelElement = container.querySelector(".neo-paneltabs__panel");
      expect(panelElement).not.toHaveClass("neo-paneltabs__panel--collapsed");
    });

    it("can default to collapsed", () => {
      const { container } = render(
        <PanelTabs defaultExpanded={false}>{standardContent}</PanelTabs>,
      );

      const panelElement = container.querySelector(".neo-paneltabs__panel");
      expect(panelElement).toHaveClass("neo-paneltabs__panel--collapsed");
    });
  });
});
