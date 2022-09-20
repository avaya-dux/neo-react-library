import { ReactNode } from "react";
import { Composition } from "atomic-layout";

export interface AppLayoutProps {
  desktopAreas?: string;
  leftPanel: ReactNode;
  mobileAreas?: string;
  mainContent: ReactNode;
  header: ReactNode;
}

export const AppLayout = ({
  desktopAreas,
  leftPanel,
  mainContent,
  mobileAreas,
  header,
}: AppLayoutProps) => {
  const defaultDesktopAreas = `
    topheader topheader topheader
    leftpanel main  rightpanel
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
      templateRows={"60px 1fr 30px"}
      templateCols={"1fr auto"}
      templateColsMd={"250px 1fr auto"}
      gap={1}
    >
      {(Areas) => (
        <>
          11:56
          <Areas.Topheader>{header}</Areas.Topheader>
          <Areas.Leftpanel area={"leftpanel"}>{leftPanel}</Areas.Leftpanel>
          <Areas.Main area={"main"}>{mainContent}</Areas.Main>
          <Areas.Rightpanel area={"rightpanel"}>
            Right Panel goes here
          </Areas.Rightpanel>
          <Areas.Footer area={"footer"}>
            Footer goes here
          </Areas.Footer>
        </>
      )}
    </Composition>
  );
};
