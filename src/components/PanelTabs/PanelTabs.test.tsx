import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { PanelTabs } from "./PanelTabs";

describe("Panel Tabs", () => {
  const panel1Content = "email inbound";
  const panel2Content = "email outbound";
  const panel3Content = "add";

  const tab1AriaLabel = "Example One";
  const tab2AriaLabel = "Example Two";
  const tab3AriaLabel = "Example Three";

  describe("base visual tests", () => {
    const standardContent = (
      <>
        <PanelTabs.Panel>
          <PanelTabs.PanelContent>
            <p>{panel1Content}</p>
          </PanelTabs.PanelContent>

          <PanelTabs.PanelContent active>
            <p>{panel2Content}</p>
          </PanelTabs.PanelContent>

          <PanelTabs.PanelContent>
            <p>{panel3Content}</p>
          </PanelTabs.PanelContent>
        </PanelTabs.Panel>

        <PanelTabs.TabsContainer>
          <PanelTabs.TabItem aria-label={tab1AriaLabel} icon="email-inbound" />

          <PanelTabs.TabItem
            active
            aria-label={tab2AriaLabel}
            icon="email-outbound"
          />

          <PanelTabs.TabItem aria-label={tab3AriaLabel} icon="add" badge />
        </PanelTabs.TabsContainer>
      </>
    );

    it("shows only the active panel", () => {
      render(<PanelTabs>{standardContent}</PanelTabs>);

      expect(screen.getByText(panel1Content)).not.toBeVisible();
      expect(screen.queryByText(panel2Content)).toBeVisible();
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

  describe("functionality tests", () => {
    const user = userEvent.setup();

    const collapsedClassName = "neo-paneltabs__tabs-expand--invert";

    it("respects the `onClick` events", async () => {
      const mock = vi.fn();

      render(
        <PanelTabs defaultExpanded={false}>
          <PanelTabs.Panel>
            <PanelTabs.PanelContent>
              <p>{panel1Content}</p>
            </PanelTabs.PanelContent>

            <PanelTabs.PanelContent active>
              <p>{panel2Content}</p>
            </PanelTabs.PanelContent>

            <PanelTabs.PanelContent>
              <p>{panel3Content}</p>
            </PanelTabs.PanelContent>
          </PanelTabs.Panel>

          <PanelTabs.TabsContainer>
            <PanelTabs.TabItem
              aria-label={tab1AriaLabel}
              icon="email-inbound"
              onClick={() => mock(0)}
            />

            <PanelTabs.TabItem
              active
              aria-label={tab2AriaLabel}
              icon="email-outbound"
              onClick={() => mock(1)}
            />

            <PanelTabs.TabItem
              aria-label={tab3AriaLabel}
              icon="add"
              onClick={() => mock(2)}
            />
          </PanelTabs.TabsContainer>
        </PanelTabs>,
      );

      const tabOne = screen.getByLabelText(tab1AriaLabel);
      await user.click(tabOne);
      expect(mock).toHaveBeenCalledWith(0);

      const tabTwo = screen.getByLabelText(tab2AriaLabel);
      await user.click(tabTwo);
      expect(mock).toHaveBeenCalledWith(1);

      const tabThree = screen.getByLabelText(tab3AriaLabel);
      await user.click(tabThree);
      expect(mock).toHaveBeenCalledWith(2);
    });

    it("toggles between expanded and collapsed", async () => {
      const { container } = render(
        <PanelTabs>
          <PanelTabs.Panel>
            <PanelTabs.PanelContent active>
              <p>{panel1Content}</p>
            </PanelTabs.PanelContent>
          </PanelTabs.Panel>

          <PanelTabs.TabsContainer>
            <PanelTabs.TabItem
              aria-label={tab1AriaLabel}
              icon="email-inbound"
            />
          </PanelTabs.TabsContainer>
        </PanelTabs>,
      );

      const toggleButton = container.querySelector(
        ".neo-paneltabs__tabs-expand",
      );
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).not.toHaveClass(collapsedClassName);

      await user.click(toggleButton as Element);
      expect(toggleButton).toHaveClass(collapsedClassName);

      await user.click(toggleButton as Element);
      expect(toggleButton).not.toHaveClass(collapsedClassName);
    });

    it("expands on tab item click when collapsed", async () => {
      render(
        <PanelTabs defaultExpanded={false}>
          <PanelTabs.Panel>
            <PanelTabs.PanelContent active>
              <p>{panel1Content}</p>
            </PanelTabs.PanelContent>
          </PanelTabs.Panel>

          <PanelTabs.TabsContainer>
            <PanelTabs.TabItem
              active
              aria-label={tab1AriaLabel}
              icon="email-inbound"
            />
          </PanelTabs.TabsContainer>
        </PanelTabs>,
      );

      const panelOne = screen.getByText(panel1Content);
      expect(panelOne).not.toBeVisible();

      const tabOne = screen.getByLabelText(tab1AriaLabel);
      await user.click(tabOne);

      expect(panelOne).toBeVisible();
    });

    it("collapses on active tab item click when expanded", async () => {
      render(
        <PanelTabs>
          <PanelTabs.Panel>
            <PanelTabs.PanelContent active>
              <p>{panel1Content}</p>
            </PanelTabs.PanelContent>
          </PanelTabs.Panel>

          <PanelTabs.TabsContainer>
            <PanelTabs.TabItem
              active
              aria-label={tab1AriaLabel}
              icon="email-inbound"
            />
          </PanelTabs.TabsContainer>
        </PanelTabs>,
      );

      const panelOne = screen.getByText(panel1Content);
      expect(panelOne).toBeVisible();

      const tabOne = screen.getByLabelText(tab1AriaLabel);
      await user.click(tabOne);

      expect(panelOne).not.toBeVisible();
    });
  });
});
