import Layout, { Composition } from "atomic-layout";
import { ReactNode, useEffect } from "react";

export interface AppLayoutProps {
  desktopAreas?: string;
  header?: ReactNode;
  height?: string;
  leftPanel?: ReactNode;
  mainContent: ReactNode;
  mobileAreas?: string;
  rightPanel?: ReactNode;
}

export const AppLayout = ({
  desktopAreas,
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
          <Areas.Footer area={"footer"}>Footer goes here</Areas.Footer>
        </>
      )}
    </Composition>
  );
};
