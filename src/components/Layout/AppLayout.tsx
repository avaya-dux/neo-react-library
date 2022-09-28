import Layout, { Composition } from "atomic-layout";
import { ReactNode, useEffect } from "react";

export interface AppLayoutProps {
  desktopAreas?: string;
  header?: ReactNode;
  leftPanel?: ReactNode;
  mainContent: ReactNode;
  mobileAreas?: string;
  rightPanel?: ReactNode;
}

export const AppLayout = ({
  desktopAreas,
  header,
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
      templateRows={"auto 1fr auto"}
      templateCols={"1fr auto"}
      templateColsMd={"auto 1fr auto"}
      gap={1}
    >
      {(Areas) => (
        <>
          <Areas.Topheader>{header}</Areas.Topheader>
          <Areas.Leftpanel area={"leftpanel"}>{leftPanel}</Areas.Leftpanel>
          <Areas.Main area={"main"}>{mainContent}</Areas.Main>
          <Areas.Rightpanel area={"rightpanel"}>{rightPanel}</Areas.Rightpanel>
          <Areas.Footer area={"footer"}>Footer goes here</Areas.Footer>
        </>
      )}
    </Composition>
  );
};
