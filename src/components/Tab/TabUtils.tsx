import clsx from "clsx";
import log from "loglevel";
import type { Dispatch, ReactElement, RefObject, SetStateAction } from "react";
import { genId } from "utils";

import { InternalTab } from "./InternalTab";
import type { InternalTabProps } from "./InternalTabTypes";
import { ClosableTab, Tab, TabLink, TabPanel } from "./TabComponents";
import type { TabListProps, TabsProps } from "./TabTypes";

const logger = log.getLogger("tab-utils-logger");
logger.disableAll();

export function debugTabs(
	// biome-ignore lint/suspicious/noExplicitAny: HACK: TODO: remove these
	logger: any,
	tabs: { id: string; disabled: boolean }[],
) {
	if (logger.getLevel() < log.levels.INFO) {
		tabs.forEach((tab) => {
			logger.debug(`${tab.id} disabled= ${tab.disabled}`);
		});
	}
}
export function getAllTabIdsInString(tabProps: InternalTabProps[]): string {
	return tabProps.map((tab) => tab.id).join(" ");
}

export function isValidPanelElement(element: ReactElement) {
	return element.type === TabPanel;
}
export function isValidTabElement(element: ReactElement) {
	logger.debug(element.type as string, ClosableTab as unknown as string);
	logger.debug(element.type.toString());

	// Comparing functions by reference here: should be fast.
	return (
		isClosableTab(element) || element.type === Tab || element.type === TabLink
	);
}
export function isClosableTab(element: ReactElement) {
	return element.type === ClosableTab;
}
function toArray(children: ReactElement[]) {
	return Array.isArray(children) ? children : [children];
}
export const buildTabProps = (
	children: TabsProps["children"],
): InternalTabProps[] => {
	// biome-ignore lint/suspicious/noExplicitAny: HACK: TODO: remove these
	const panelList = (children as any)[1];
	const panels = toArray(panelList.props.children).filter(isValidPanelElement);

	// biome-ignore lint/suspicious/noExplicitAny: HACK: TODO: remove these
	const tablist = (children as any)[0];
	const tabs = toArray(tablist.props.children)
		.filter(isValidTabElement)
		.map((tab) => {
			if (tab.props?.href) {
				return buildSingleTabPropsWithNoPanel(tab);
			}

			return buildSingleTabPropsHasAssociatedPanel(tab, panels.shift());
		});

	return tabs;
};

export const buildTabPropsNoPanel = (
	children: TabsProps["children"],
): InternalTabProps[] => {
	const tablist = children as ReactElement<TabListProps>;
	const tabs = toArray(tablist.props.children)
		.filter(isValidTabElement)
		.map(buildSingleTabPropsWithNoPanel);

	return tabs;
};

// biome-ignore lint/suspicious/noExplicitAny: HACK: TODO: remove these
const buildSingleTabPropsWithNoPanel = (tab: any): InternalTabProps => {
	const props = tab.props;
	const { id, children, ...rest } = props;
	const disabled = !!props?.disabled;
	logger.debug(`${id} disabled = ${disabled}`);
	const icon = "icon" in props ? props?.icon : undefined;
	const closable = isClosableTab(tab);
	const onClose = "onClose" in props ? props?.onClose : undefined;

	return {
		...rest,
		disabled,
		closable,
		...(closable ? { closableId: genId() } : {}),
		onClose,
		id: id || genId(),
		name: children,
		...(icon ? { icon } : {}),
	};
};

const buildSingleTabPropsHasAssociatedPanel = (
	// biome-ignore lint/suspicious/noExplicitAny: HACK: TODO: remove these
	tab: any,
	// biome-ignore lint/suspicious/noExplicitAny: HACK: TODO: remove these
	panel: any,
): InternalTabProps => {
	const props = tab.props;
	const { id, children, ...rest } = props;
	const disabled = !!props?.disabled;
	logger.debug(`${id} disabled = ${disabled}`);
	const icon = "icon" in props ? props?.icon : undefined;
	const closable = isClosableTab(tab);
	const onClose = "onClose" in props ? props?.onClose : undefined;

	const content = {
		...panel.props,
		id: panel.props?.id || genId(),
	};

	return {
		...rest,
		disabled,
		closable,
		...(closable ? { closableId: genId() } : {}),
		onClose,
		id: id || genId(),
		name: children,
		content,
		...(icon ? { icon } : {}),
	};
};

export const createTab = (
	ref: RefObject<HTMLDivElement>,
	index: number,
	tabProps: InternalTabProps,
	tabs: InternalTabProps[],
	isVertical: boolean,
	activeTabIndex: number,
	setActiveTabIndex: Dispatch<SetStateAction<number>>,
	setActivePanelIndex: Dispatch<SetStateAction<number>>,
	focus: boolean,
	setFocus: Dispatch<SetStateAction<boolean>>,
) => {
	const tabId = tabProps.id;
	const active = index === activeTabIndex;

	const { className, id, name, disabled, closable, dir, onClose, ...rest } =
		tabProps;

	logger.debug(`${tabId} disabled is ${tabProps.disabled}`);

	return (
		<div
			ref={ref}
			key={index}
			className={clsx(
				getTabItemClasses({
					active,
					disabled: tabProps.disabled,
					vertical: isVertical,
				}),
				className,
			)}
			dir={closable ? "ltr" : dir}
		>
			<InternalTab
				{...rest}
				id={id}
				name={name}
				active={active}
				activeTabIndex={activeTabIndex}
				aria-disabled={disabled}
				closable={closable}
				disabled={disabled}
				onClose={onClose}
				setActivePanelIndex={setActivePanelIndex}
				setActiveTabIndex={setActiveTabIndex}
				tabIndex={index}
				tabs={tabs}
				vertical={isVertical}
				focus={focus}
				setFocus={setFocus}
			/>
		</div>
	);
};

export const createPanel = (
	key: number,
	tabProps: InternalTabProps,
	activePanelIndex: number,
) => {
	const active = key === activePanelIndex;
	const { id, children, className, ...rest } = tabProps.content;
	return (
		<div
			id={id}
			aria-labelledby={tabProps.id}
			role="tabpanel"
			key={key}
			className={getContentClasses(active, className)}
			{...rest}
		>
			{children}
		</div>
	);
};

export const getContentClasses = (active: boolean, className?: string) => {
	const classes = className ? [className] : [];
	classes.push(active ? "neo-tabs__container--active" : "neo-tabs__container");
	return classes.join(" ");
};

export const getTabItemClasses = ({
	active,
	disabled,
	vertical,
}: {
	active: boolean;
	disabled: boolean;
	vertical: boolean;
}) => {
	const classes = ["neo-tabs__item"];
	if (active && disabled) {
		if (vertical) {
			classes.push("neo-tabs__item--vertical--active-disabled");
		} else {
			classes.push("neo-tabs__item--active-disabled");
		}
	} else if (active) {
		if (vertical) {
			classes.push("neo-tabs__item--vertical");
			classes.push("neo-tabs__item--vertical--active");
		} else {
			classes.push("neo-tabs__item--active");
		}
	} else if (disabled) {
		// same whether vertical or not for disabled and not active
		classes.push("neo-tabs__item--disabled");
	}
	return classes.join(" ");
};
