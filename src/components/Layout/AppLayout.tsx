import Layout, { Composition } from "atomic-layout";
import { ReactNode, useEffect } from "react";

export interface AppLayoutProps {
  desktopAreas?: string;
  footer?: ReactNode;
  header?: ReactNode;
  height?: string;
  leftPanel?: ReactNode;
  mainContent: ReactNode;
  mobileAreas?: string;
  rightPanel?: ReactNode;
}

/**
 * This component is used to create a Layout that a typical web application uses
 *
 * @example
 * <AppLayout
 *   header={TopNavBar}
 *   leftPanel={leftNav}
 *   mainContent={mainPanel}
 *   rightPanel={emptyWidget}
 *   footer={emptyWidget}
 *  />
 *
 * Only the mainContent prop is required.
 */

export const AppLayout = ({
  desktopAreas,
  footer,
  header,
  height = "100vh",
  leftPanel,
  mainContent,
  mobileAreas,
  rightPanel,
}: AppLayoutProps) => {
  const defaultDesktopAreas = `
    topheader topheader
    leftpanel main
    footer footer
    `;

  const defaultBigscreenAreas = `
    topheader topheader topheader
    leftpanel main rightpanel
    footer footer footer
    `;

  const defaultMobileAreas = `
    topheader
    main
    footer
    `;

  return (
    <Composition
      areas={mobileAreas || defaultMobileAreas}
      areasMd={desktopAreas || defaultDesktopAreas}
      areasLg={desktopAreas || defaultBigscreenAreas}
      height={height}
      templateRows={"auto 1fr auto"}
      templateCols={"1fr auto"}
      templateColsMd={"auto 1fr auto"}
      gap={1}
    >
      {(Areas) => (
        <>
          {header && <Areas.Topheader>{header}</Areas.Topheader>}
          {leftPanel && <Areas.Leftpanel area={"leftpanel"}>{leftPanel}</Areas.Leftpanel>}
          <Areas.Main area={"main"}>{mainContent}</Areas.Main>
          {rightPanel && <Areas.Rightpanel area={"rightpanel"}>{rightPanel}</Areas.Rightpanel>}
          {footer && <Areas.Footer area={"footer"}>{footer}</Areas.Footer>}
        </>
      )}
    </Composition>
  );
};
