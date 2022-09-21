import { ReactNode, useEffect } from "react";
import Layout, { Composition } from "atomic-layout";


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

    useEffect(() => {
      Layout.configure({
        defaultBreakpointName: "desktop",
        breakpoints: {
          mobile: {
            maxWidth: 767,
          },
          tablet: {
            minWidth: 768,
            maxWidth: 1023,
          },
          desktop: {
            minWidth: 1024,
            maxWidth: 1439,
          },
          bigscreen: {
            minWidth: 1024,
            maxWidth: 1439,
          },
        },
      });
    }, []);

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
      templateRows={"60px 1fr 30px"}
      templateCols={"1fr auto"}
      templateColsMd={"250px 1fr auto"}
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
