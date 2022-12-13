import log from "loglevel";
import {
  createRef,
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "components/Button";
import useControlled from "utils/useControlled";

import {
  handleLeftCarouselMouseClickEvent,
  handleRightCarouselMouseClickEvent,
} from "./EventHandlers";
import { enableLeftButton, enableRightButton } from "./EventHandlers/Helper";
import { TabsProps } from "./TabTypes";
import {
  buildTabProps,
  buildTabPropsNoPanel,
  createPanel,
  createTab,
  debugTabs,
  getAllTabIdsInString,
} from "./TabUtils";

const logger = log.getLogger("tabs-logger");
logger.disableAll();

export const Tabs = ({
  defaultIndex = 0,
  index,
  initialFocus = false,
  children,
  onTabChange,
  onTabPanelChange,
  orientation = "horizontal",
  ...rest
}: TabsProps) => {
  const tabs = useMemo(() => {
    return Array.isArray(children)
      ? buildTabProps(children)
      : buildTabPropsNoPanel(children);
  }, [children]);

  debugTabs(logger, tabs);

  const isVertical = orientation === "vertical";
  const isScrollable = "scrollable" in rest ? rest.scrollable : false;
  const hasCarousel = "hasCarousel" in rest ? rest.hasCarousel : false;
  const dropDown =
    hasCarousel && "carouselDropdown" in rest ? rest.carouselDropdown : null;
  const leftCarouselButtonAriaLabel =
    "leftCarouselButtonAriaLabel" in rest
      ? rest.leftCarouselButtonAriaLabel
      : "move to previous tab";

  const rightCarouselButtonAriaLabel =
    "rightCarouselButtonAriaLabel" in rest
      ? rest.rightCarouselButtonAriaLabel
      : "move to next tab";
  logger.debug(`Is tab vertical? ${isVertical} scrollable? ${isScrollable}`);

  const [activeTabIndex, setUncontrolledActiveTabIndex] = useControlled({
    controlled: index,
    default: defaultIndex,
    name: "activeTabIndex",
  });

  const [focus, setFocus] = useState(initialFocus);

  // HACK: TODO: add proper type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setActiveTabIndex = (newActiveTabIndex: any) => {
    setUncontrolledActiveTabIndex(newActiveTabIndex);
    setFocus(true);
    onTabChange?.(newActiveTabIndex);
  };

  const [activePanelIndex, setActivePanelIndex] = useState(defaultIndex);

  useEffect(() => {
    onTabPanelChange?.(activePanelIndex);
  }, [activePanelIndex, onTabPanelChange]);

  const verticalStyle: CSSProperties = isVertical ? { display: "flex" } : {};
  const refs: RefObject<HTMLDivElement>[] = [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselLeftButtonClickEventHandler: MouseEventHandler = (
    e: MouseEvent
  ) => {
    return handleLeftCarouselMouseClickEvent(
      e,
      scrollRef,
      refs,
      setLeftCarouselButtonEnabled,
      setRightCarouselButtonEnabled
    );
  };
  const carouselRightButtonClickEventHandler: MouseEventHandler = (
    e: MouseEvent
  ) => {
    return handleRightCarouselMouseClickEvent(
      e,
      scrollRef,
      refs,
      setLeftCarouselButtonEnabled,
      setRightCarouselButtonEnabled
    );
  };
  const tabsNav = (
    <div
      className={
        isVertical ? "neo-tabs__nav neo-tabs__nav--vertical" : "neo-tabs__nav"
      }
      role="tablist"
      aria-owns={getAllTabIdsInString(tabs)}
      aria-orientation={orientation}
    >
      {tabs.map((tab, index) => {
        logger.debug(`calling createTab with tabItem ${tab.disabled}`);
        const ref = createRef<HTMLDivElement>();
        refs.push(ref);
        return createTab(
          ref,
          index,
          tab,
          tabs,
          isVertical,
          activeTabIndex,
          setActiveTabIndex,
          setActivePanelIndex,
          focus,
          setFocus
        );
      })}
    </div>
  );
  const [leftCarouselButtonEnabled, setLeftCarouselButtonEnabled] =
    useState(false);
  const [rightCarouselButtonEnabled, setRightCarouselButtonEnabled] =
    useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateCarouselButtonStatus = () => {
    logger.debug("updating carousel buttons status");
    setLeftCarouselButtonEnabled(enableLeftButton(scrollRef, refs));
    setRightCarouselButtonEnabled(enableRightButton(scrollRef, refs));
  };

  useEffect(() => {
    logger.debug(
      `useLayoutEffect: update carousel buttons disabled state on activeTab change ${activeTabIndex}`
    );
    updateCarouselButtonStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIndex]);

  useEffect(() => {
    window.addEventListener("resize", updateCarouselButtonStatus);
    logger.debug(
      `updateCarouselButtonStatus: update carousel buttons disabled status on window resize`
    );
    // updateCarouselButtonStatus();
    return () =>
      window.removeEventListener("resize", updateCarouselButtonStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef]);

  logger.debug({ leftCarouselButtonEnabled, rightCarouselButtonEnabled });
  const tabsCarousel = (
    <div className={hasCarousel ? "neo-tabs__carousel" : "neo-tabs"}>
      {hasCarousel ? (
        <>
          <Button
            className="neo-tabs__carousel--button"
            aria-label={leftCarouselButtonAriaLabel}
            variant="tertiary"
            icon="chevron-left"
            disabled={!leftCarouselButtonEnabled}
            onClick={carouselLeftButtonClickEventHandler}
          ></Button>
          <div className="neo-tabs__carousel--scroll" ref={scrollRef}>
            {tabsNav}
          </div>
          <Button
            className="neo-tabs__carousel--button"
            aria-label={rightCarouselButtonAriaLabel}
            variant="tertiary"
            icon="chevron-right"
            disabled={!rightCarouselButtonEnabled}
            onClick={carouselRightButtonClickEventHandler}
          ></Button>
          <div className="neo-tabs__carousel--more">{dropDown}</div>
        </>
      ) : (
        <>{tabsNav}</>
      )}
    </div>
  );
  const panels = (
    <>
      {tabs.map((tabItem, index) => {
        return tabItem.content
          ? createPanel(index, tabItem, activePanelIndex)
          : null;
      })}
    </>
  );
  const content = (
    <div style={verticalStyle}>
      {tabsCarousel}
      {panels}
    </div>
  );
  return isScrollable ? (
    <div className="neo-tabs--wrapper">{content}</div>
  ) : (
    <>{content}</>
  );
};
