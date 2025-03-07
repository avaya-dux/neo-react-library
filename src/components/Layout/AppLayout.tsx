import { Composition } from "atomic-layout";
import type { ReactNode } from "react";
import { StyleSheetManager } from "styled-components";

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

export const propsNotToForwardToDOM = [
	"templateRows",
	"area",
	"areas",
	"areasMd",
	"areasLg",
	"templateCols",
	"templateColsMd",
	"gap",
	"height",
];

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
		<StyleSheetManager
			shouldForwardProp={(prop) => !propsNotToForwardToDOM.includes(prop)}
		>
			<Composition
				areas={mobileAreas || defaultMobileAreas}
				areasMd={desktopAreas || defaultDesktopAreas}
				areasLg={desktopAreas || defaultBigscreenAreas}
				height={height}
				templateRows="auto 1fr auto"
				templateCols="1fr auto"
				templateColsMd="auto 1fr auto"
				gap={1}
				data-testid="applayout-test-id"
			>
				{(Areas) => (
					<>
						{header && (
							<Areas.Topheader data-testid="applayout-header-test-id">
								{header}
							</Areas.Topheader>
						)}
						{leftPanel && (
							<Areas.Leftpanel
								data-testid="applayout-leftpanel-test-id"
								area={"leftpanel"}
							>
								{leftPanel}
							</Areas.Leftpanel>
						)}
						<Areas.Main area={"main"} data-testid="applayout-main-test-id">
							{mainContent}
						</Areas.Main>
						{rightPanel && (
							<Areas.Rightpanel
								data-testid="applayout-rightpanel-test-id"
								area={"rightpanel"}
							>
								{rightPanel}
							</Areas.Rightpanel>
						)}
						{footer && (
							<Areas.Footer
								data-testid="applayout-footer-test-id"
								area={"footer"}
							>
								{footer}
							</Areas.Footer>
						)}
					</>
				)}
			</Composition>
		</StyleSheetManager>
	);
};

AppLayout.displayName = "AppLayout";
