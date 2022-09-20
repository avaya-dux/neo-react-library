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
  const areasDesktop = `
    topheader topheader
    leftpanel main
    leftpanel footer
    `;

  const areasMobile = `
    topheader
    main
    `;

  return (
    <Composition
      areas={mobileAreas || areasMobile}
      areasMd={desktopAreas || areasDesktop}
      templateRows={"60px 1fr 30px"}
      templateCols={"1fr auto"}
      templateColsMd={"250px 1fr"}
      h="700px"
      gap={1}
    >
      {(Areas) => (
        <>
          <Areas.Topheader>{header}</Areas.Topheader>
          <Areas.Leftpanel pl="2" area={"leftpanel"}>
            {leftPanel}
          </Areas.Leftpanel>
          <Areas.Main pl="2" w="80%" area={"main"}>
            {mainContent}
          </Areas.Main>
        </>
      )}
    </Composition>
  );
};
