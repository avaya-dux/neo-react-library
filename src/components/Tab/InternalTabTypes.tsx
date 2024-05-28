import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { IconNamesType } from "utils";

import type { TabPanelProps } from "./TabTypes";

export interface InternalTabProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
	id: string;
	name: ReactNode;
	disabled: boolean;
	content: TabPanelProps;
	href?: string;
	icon?: IconNamesType;
	closable?: boolean;
	closableId?: string;
	onClose?: (index: number) => void;
}

export interface InteractiveTabProps {
	tabIndex: number;
	vertical: boolean;
	active: boolean;
	focus: boolean;
	tabs: InternalTabProps[];
	activeTabIndex: number;
	setActiveTabIndex: Dispatch<SetStateAction<number>>;
	setActivePanelIndex: Dispatch<SetStateAction<number>>;
	setFocus: Dispatch<SetStateAction<boolean>>;
}
